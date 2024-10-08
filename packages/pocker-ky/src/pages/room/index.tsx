import { useEffect, useMemo, useState } from 'react';
import PockerDesktop from './components/desktop';
import RoomReadingMask from './components/reading';
import useSocket, { EventListenerEnum, EventPushEnum } from '@/libs/hooks/use-socket';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '@/libs/storage';
import { ApiResponse } from '@/api/interface';
import { ApiCode } from '@/api/constant';
import { message } from 'antd';
import {
    PlayerGameStatusEnum,
    PlayerRoomStatusEnum,
    RoomInfoResponse,
    RoomPlayerResponse,
    RoomResponse,
    RoomStateEnum
} from './interface';
import RoomContext from './context';

const Home: React.FC = () => {
    const { socket } = useSocket();
    const { roomNo } = useParams();
    const useInfo = getUserInfo();
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState<RoomInfoResponse>();
    const [players, setPlayers] = useState<RoomPlayerResponse[]>([]);
    const [showLoading, setShowLoading] = useState(false);

    const onStatusChange = (status: string) => {
        if (status === '退出') {
            onLeaveRoom();
            return;
        }
        if (status === '开始游戏') {
            onStartGame();
        }
    };

    /** 开始游戏 */
    const onStartGame = () => {
        if (roomInfo?.roomState === RoomStateEnum.GAMEING) {
            message.error('当前房间已经是游戏中！');
            return;
        }
        if (players?.every((pItem) => pItem.playerGames.roomStatus !== PlayerRoomStatusEnum.READING)) {
            const notReadPlatersStr = players
                .filter((pItem) => pItem.playerGames.roomStatus !== PlayerRoomStatusEnum.READING)
                .map((pItem) => pItem.player.username)
                .join('，');
            message.error(`${notReadPlatersStr} 不是准备状态！`);
            return;
        }
        socket.emit(EventPushEnum.ON_START_GAME, { roomNo: roomNo }, (res: ApiResponse<unknown>) => {
            console.log('开始游戏：', res);
            if (res.code === ApiCode.SUCCESS) {
                fetchRoomPlayers();
            }
        });
    };

    /** 通知服务端推送 - 玩家信息 */
    const fetchRoomPlayers = () => {
        console.log('通知了！！！');
        socket.emit(EventPushEnum.ON_GAME_ROOM_PLAYERS, { roomNo: roomNo }, (res: ApiResponse<unknown>) => {
            if (res.code !== ApiCode.SUCCESS) {
                message.error(res.msg);
            }
        });
    };

    /** 退出房间 */
    const onLeaveRoom = () => {
        socket.emit(
            EventPushEnum.ON_LEAVE_ROOM,
            { roomNo: roomNo, userId: useInfo.userId },
            (res: ApiResponse<unknown>) => {
                if (res.code === ApiCode.SUCCESS) {
                    message.success('退出成功！');
                    navigate('/');
                    return;
                }
                message.error(res.msg);
            }
        );
    };

    const speaker = (speakerType: string, speakerPlayer: RoomPlayerResponse, params?: Record<string, any>) => {
        if (speakerType === '跟') {
            if (!params?.ante) {
                message.error('请选择押注数量！');
                return;
            }
            socket.emit(EventPushEnum.ON_CALL, { ante: params.ante }, (res: ApiResponse<unknown>) => {
                if (res.code === ApiCode.SUCCESS) {
                    socket.emit(EventPushEnum.ON_FINISH_SPEAK, (res: ApiResponse<unknown>) => {
                        console.log('结束发言-res', res);
                    });
                }
            });
        }
        if (speakerType === '看牌') {
            socket.emit(EventPushEnum.ON_LOOK_CARDS, (res: ApiResponse<unknown>) => {
                console.log('看牌-res', res);
            });
            return;
        }
        if (speakerType === '弃牌') {
            socket.emit(EventPushEnum.ON_FOLD, (res: ApiResponse<unknown>) => {
                console.log('弃牌-res', res);
                if (res.code === ApiCode.SUCCESS) {
                    socket.emit(EventPushEnum.ON_FINISH_SPEAK, (res: ApiResponse<unknown>) => {
                        console.log('结束发言-res', res);
                        if (res.code === ApiCode.SUCCESS) {
                        } else {
                            message.error(res.msg);
                        }
                    });
                } else {
                    message.error(res.msg);
                }
            });
            return;
        }
        if (speakerType === '比牌') {
            socket.emit(EventPushEnum.ON_COMPARE_CARDS, { ...params }, (res: ApiResponse<unknown>) => {
                console.log('比牌 - res', res);
                if (res.code === ApiCode.SUCCESS) {
                    socket.emit(EventPushEnum.ON_FINISH_SPEAK, (res: ApiResponse<unknown>) => {
                        console.log('结束发言-res', res);
                        if (res.code === ApiCode.SUCCESS) {
                        } else {
                            message.error(res.msg);
                        }
                    });
                } else {
                    message.error(res.msg);
                }
            });
            return;
        }
        if (speakerType === '结束发言') {
            socket.emit(EventPushEnum.ON_FINISH_SPEAK, (res: ApiResponse<unknown>) => {
                if (res.code === ApiCode.SUCCESS) {
                } else {
                    message.error(res.msg);
                }
            });
            return;
        }
    };

    /** 获取房间信息 */
    const fetchRoomInfo = async () => {
        socket.emit(EventPushEnum.ON_GAME_ROOM_INFO, {
            roomNo: roomNo,
            userId: useInfo.userId
        });
    };

    useEffect(() => {
        console.log('showLoading', showLoading);
        if (showLoading) {
            fetchRoomInfo();
        } else {
            fetchRoomPlayers();
        }
        /** 服务端推送房间信息 - 回调 */
        function updateRoomInfo(res: ApiResponse<RoomResponse>) {
            console.log('服务端推送 - 房间信息', res);
            if (res.code === ApiCode.SUCCESS) {
                setRoomInfo(res.data.gameRoom);
                setPlayers(res.data.players);
                return;
            }
            message.error(res.msg);
        }
        /** 服务端推送玩家信息 - 回调 */
        function updateRoomPlayers(res: ApiResponse<RoomResponse>) {
            console.log('服务端推送 - 玩家信息', res);
            if (res.code === ApiCode.SUCCESS) {
                setRoomInfo(res.data.gameRoom);
                setPlayers(res.data.players);
                return;
            }
            message.error(res.msg);
        }
        // 服务端推送过来的房间列表
        socket.on(EventListenerEnum.PUSH_ROOM_INFO, updateRoomInfo);
        socket.on(EventListenerEnum.PUSH_ROOM_PLAYER, updateRoomPlayers);
        return () => {
            socket.off(EventListenerEnum.PUSH_ROOM_INFO, updateRoomInfo);
            socket.off(EventListenerEnum.PUSH_ROOM_PLAYER, updateRoomPlayers);
        };
    }, [showLoading]);

    /** 显示全屏loading - 房间状态为等待加入中 并且所有玩家的状态都不是游戏中的状态 */
    useEffect(() => {
        let loading =
            roomInfo?.roomState == RoomStateEnum.WAIT_JOIN &&
            players?.every((p) => p?.playerGames?.roomStatus !== PlayerRoomStatusEnum.GAMEING);
        setShowLoading(loading);
        return () => {
            setShowLoading(false);
        };
    }, [roomInfo, players]);

    useEffect(() => {
        if (roomInfo) {
            const status = roomInfo.roomState === RoomStateEnum.WAIT_JOIN ? '等待玩家加入...' : '游戏中';
            document.title = roomInfo.name + ' - ' + status;
        }
    }, [roomInfo]);

    return (
        <RoomContext.Provider
            value={{
                roomNo,
                roomInfo,
                players,
                onStatusChange,
                onStartGame,
                onLeaveRoom,
                fetchRoomInfo,
                fetchRoomPlayers,
                speaker
            }}
        >
            <div className="h-full ">
                {roomInfo && !!players?.length && <PockerDesktop />}
                {/* 未开始游戏，准备中状态展示以下蒙层 */}
                {showLoading && roomInfo && <RoomReadingMask />}
            </div>
        </RoomContext.Provider>
    );
};
export default Home;

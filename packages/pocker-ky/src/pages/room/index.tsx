import { useEffect, useState } from 'react';
import PockerDesktop from './components/desktop';
import RoomReadingMask from './components/reading';
import useSocket, { EventListenerEnum, EventPushEnum } from '@/libs/hooks/use-socket';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '@/libs/storage';
import { ApiResponse } from '@/api/interface';
import { ApiCode } from '@/api/constant';
import { message } from 'antd';

const Home: React.FC = () => {
    const { socket } = useSocket();
    const { roomNo } = useParams();
    const useInfo = getUserInfo();
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState<any>();
    const [currentRoomPlayers, setCurrentRoomPlayers] = useState([]);

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
        // TODO: 各种校验
        console.log('roomInfo', roomInfo);
        socket.emit(EventPushEnum.ON_START_GAME, { roomNo: roomNo }, (res: ApiResponse<unknown>) => {
            console.log('开始游戏：', res);
            if (res.code === ApiCode.SUCCESS) {
                fetchRoomPlayers();
            }
        });
    };

    /** 通知服务端推送 - 玩家信息 */
    const fetchRoomPlayers = () => {
        socket.emit(EventPushEnum.ON_GAME_ROOM_PLAYERS, { roomNo: roomNo }, (res: ApiResponse<unknown>) => {});
    };

    /** 退出房间 */
    const onLeaveRoom = () => {
        socket.emit(EventPushEnum.ON_LEAVE_ROOM, { roomNo: roomNo, userId: useInfo.userId }, (res: ApiResponse<unknown>) => {
            if (res.code === ApiCode.SUCCESS) {
                message.success('退出成功！');
                navigate('/');
                return;
            }
            message.error(res.msg);
        });
    };

    /** 获取房间信息 */
    const fetchRoomInfo = async () => {
        socket.emit(EventPushEnum.ON_GAME_ROOM_INFO, { roomNo: roomNo, userId: useInfo.userId });
    };

    useEffect(() => {
        fetchRoomInfo();

        /** 服务端推送房间信息 - 回调 */
        function updateRoomInfo(res: ApiResponse<unknown>) {
            console.log('服务端推送 - 房间信息', res);
            if (res.code === ApiCode.SUCCESS) {
                setRoomInfo(res.data);
                return;
            }
            message.error(res.msg);
        }

        /** 服务端推送玩家信息 - 回调 */
        function updateRoomPlayers(res: ApiResponse<unknown>) {
            console.log('服务端推送 - 玩家信息', res);
            if (res.code === ApiCode.SUCCESS) {
            }
        }

        // 服务端推送过来的房间列表
        socket.on(EventListenerEnum.PUSH_ROOM_INFO, updateRoomInfo);
        socket.on(EventListenerEnum.PUSH_ROOM_PLAYER, updateRoomPlayers);
        return () => {
            socket.off(EventListenerEnum.PUSH_ROOM_INFO, updateRoomInfo);
            socket.off(EventListenerEnum.PUSH_ROOM_PLAYER, updateRoomPlayers);
        };
    }, []);

    return (
        <div className="h-full ">
            <PockerDesktop />
            {/* 未开始游戏，准备中状态展示以下蒙层 */}
            {!!roomInfo?.players?.length && <RoomReadingMask roomInfo={roomInfo} onStatusChange={onStatusChange} />}
        </div>
    );
};
export default Home;

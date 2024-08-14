import { Player } from '@/api/modules/user/interface';
import DesktopMine from './mine';
import DesktopOtherPlayerItem from './other-player-item';
import { PockerEnum } from '@/constants/pocker';
import { useContext, useEffect, useMemo, useState } from 'react';
import RoomContext from '../../context';
import { getUserInfo } from '@/libs/storage';
import logo from '@/assets/images/pocker-logo.webp';
import { useCountDown } from 'ahooks';
import { Button, Input, message } from 'antd';

interface PockerDesktopProps {}

const PockerDesktop: React.FC<PockerDesktopProps> = () => {
    const [timer, setTimer] = useState<number>();
    const { roomInfo, players, speaker } = useContext(RoomContext);
    const userInfo = getUserInfo();

    const [countdown] = useCountDown({
        leftTime: timer,
        onEnd: () => {
            // 倒计时解释视为弃牌
            if (isMineSpeaker) {
                speaker?.('弃牌');
            }
        }
    });

    /** 其他玩家 */
    const otherPlayers = useMemo(() => {
        return players?.filter((pItem) => pItem.player.userId != userInfo.userId);
    }, [players]);

    /** 自己 */
    const mineInfo = useMemo(() => {
        return players?.find((pItem) => pItem.player.userId == userInfo.userId);
    }, [players]);

    /** 是否是自己说话 */
    const isMineSpeaker = useMemo(() => {
        return roomInfo?.speaker === userInfo.userId;
    }, [roomInfo]);

    /** 当前说话的玩家 */
    const speakerPlayer = useMemo(() => {
        return players?.find((pItem) => pItem.player.userId === roomInfo?.speaker);
    }, [players, roomInfo]);

    useEffect(() => {
        setTimer(60 * 1000);
    }, [roomInfo?.speaker]);

    useEffect(() => {
        if (isMineSpeaker && Math.round(countdown / 1000) === 10) {
            message.warning('倒计时结束将视为弃牌');
        }
    }, [countdown, isMineSpeaker]);

    return (
        <div className="h-full flex flex-col bg-gray-100 overflow-hidden">
            <div className="flex justify-around">
                {otherPlayers?.map((otherPlayerItem) => {
                    return <DesktopOtherPlayerItem key={otherPlayerItem.player.userId} item={otherPlayerItem} />;
                })}
            </div>
            <div className="flex-1 border-2 border-zjf-darker-cyan flex items-center">
                <div style={{ width: 320 }} className="h-full border-r-2 border-zjf-darker-cyan p-5 flex flex-col ">
                    <h4 className="mx-auto text-center">
                        <span>{speakerPlayer?.player.username}</span> 说话倒计时中:
                        <span className=" text-zjf-red font-semibold"> {Math.round(countdown / 1000)}</span>
                    </h4>
                </div>
                <div className="pocker-table h-full flex-1 flex items-center justify-center">
                    <img className="w-20 h-20" src={logo} />
                </div>
                <div
                    style={{ width: 320 }}
                    className="pocker-room-chat h-full border-l-2 border-zjf-darker-cyan p-5 flex flex-col "
                >
                    <h4>聊天窗口 - TOTO</h4>
                    <div className="flex-1">...</div>
                    <div className=" w-full flex items-center h-7">
                        <Input className="h-full"></Input>
                        <Button type="primary" className=" h-full ml-3">
                            发送
                        </Button>
                    </div>
                </div>
            </div>
            <div className=" mx-auto" style={{ width: 800 }}>
                <DesktopMine item={mineInfo!} isMineSpeaker={isMineSpeaker} />
            </div>
        </div>
    );
};
export default PockerDesktop;

import { Player } from '@/api/modules/user/interface';
import DesktopMine from './mine';
import DesktopOtherPlayerItem from './other-player-item';
import { PockerEnum } from '@/constants/pocker';
import { useContext, useMemo } from 'react';
import RoomContext from '../../context';
import { getUserInfo } from '@/libs/storage';
import logo from '@/assets/images/pocker-logo.webp';

interface PockerDesktopProps {}

const PockerDesktop: React.FC<PockerDesktopProps> = () => {
    const { roomInfo, players } = useContext(RoomContext);
    const userInfo = getUserInfo();

    /** 其他玩家 */
    const otherPlayers = useMemo(() => {
        return players?.filter((pItem) => pItem.player.userId != userInfo.userId);
    }, [players]);

    /** 自己 */
    const mineInfo = useMemo(() => {
        return players?.find((pItem) => pItem.player.userId == userInfo.userId);
    }, [players]);

    const isMineSpeaker = useMemo(() => {
        return roomInfo?.speaker === userInfo.userId;
    }, [roomInfo]);

    return (
        <div className="h-full flex flex-col bg-gray-100 overflow-hidden">
            <div className="flex justify-around">
                {otherPlayers?.map((otherPlayerItem) => {
                    return <DesktopOtherPlayerItem key={otherPlayerItem.player.userId} item={otherPlayerItem} />;
                })}
            </div>
            <div className="flex-1 border-2 border-zjf-darker-cyan">
                <div className="w-full h-full flex items-center justify-center">
                    <img className=" w-20 h-20" src={logo} />
                </div>
            </div>
            <div className=" mx-auto" style={{ width: 800 }}>
                <DesktopMine item={mineInfo!} isMineSpeaker={isMineSpeaker} />
            </div>
        </div>
    );
};
export default PockerDesktop;

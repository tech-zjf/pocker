import { BasicComponentProps } from '@/components/interface';
import PockerCard from './pocker-card';
import { Player } from '@/api/modules/user/interface';
import { playerGameStatusMap, RoomPlayerResponse } from '../../interface';
import { SoundOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import RoomContext from '../../context';

interface OtherPlayerItemProps extends BasicComponentProps {
    item: RoomPlayerResponse;
}

const DesktopOtherPlayerItem: React.FC<OtherPlayerItemProps> = (props) => {
    const { item } = props;
    const { roomInfo } = useContext(RoomContext);

    return (
        <div className=" bg-white custom-shadow px-10 py-5 flex flex-col relative ">
            <h2 className=" text-center">{item.player.username}</h2>
            <div className="flex items-center justify-center mt-6">
                <p className=" text-zjf-new-cyan">{playerGameStatusMap.get(item.playerGames.gameStatus) || ``}</p>
            </div>
            <div className=" flex-1 flex items-end justify-center mt-6">
                <PockerCard items={item.playerGames.cards} isMine={false} status={item.playerGames.gameStatus} />
            </div>
            {roomInfo?.speaker == item.player.userId && (
                <SoundOutlined className=" absolute right-2 top-2 text-zjf-green" />
            )}
        </div>
    );
};

export default DesktopOtherPlayerItem;

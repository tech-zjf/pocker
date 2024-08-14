import { BasicComponentProps } from '@/components/interface';
import { Button, Space } from 'antd';
import PockerCard from './pocker-card';
import { Player } from '@/api/modules/user/interface';
import { PlayerGameStatusEnum, playerGameStatusMap, RoomPlayerResponse } from '../../interface';
import { useContext } from 'react';
import RoomContext from '../../context';
import { SoundOutlined } from '@ant-design/icons';

interface DesktopMineProps extends BasicComponentProps {
    item: RoomPlayerResponse;
}

const DesktopMine: React.FC<DesktopMineProps> = (props) => {
    const { item } = props;
    const { onStatusChange, roomInfo } = useContext(RoomContext);
    return (
        <div className="h-full p-5 custom-shadow flex  flex-col bg-white relative">
            <div className="desktop-mine-head relative">
                {item.playerGames.gameStatus !== PlayerGameStatusEnum.DELETE_POCKER && (
                    <div className=" flex items-center justify-center">
                        <Space size={50}>
                            <Button
                                onClick={() => {
                                    onStatusChange?.('退出');
                                }}
                            >
                                退出房间
                            </Button>
                            <Button type="primary">跟</Button>
                            <Button type="primary">看牌</Button>
                            <Button type="primary">弃牌</Button>
                            <Button type="primary">开牌</Button>
                        </Space>
                    </div>
                )}
            </div>
            <div className=" flex items-center justify-center mt-6">
                <p className=" text-zjf-new-cyan">
                    {playerGameStatusMap.get(item.playerGames.gameStatus) || `未知 - ${item.playerGames.gameStatus}`}
                </p>
            </div>
            <div className="flex-1 flex items-end justify-center mt-6">
                <PockerCard items={item.playerGames.cards} isMine={true} status={item.playerGames.gameStatus} />
            </div>
            {roomInfo?.speaker == item.player.userId && (
                <SoundOutlined className=" absolute right-2 top-2 text-zjf-green" />
            )}
        </div>
    );
};
export default DesktopMine;

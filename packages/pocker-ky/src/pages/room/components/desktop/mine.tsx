import { BasicComponentProps } from '@/components/interface';
import { Button, Popconfirm, Space } from 'antd';
import PockerCard from './pocker-card';
import { Player } from '@/api/modules/user/interface';
import { PlayerGameStatusEnum, playerGameStatusMap, RoomPlayerResponse } from '../../interface';
import { useContext } from 'react';
import RoomContext from '../../context';
import { SoundOutlined } from '@ant-design/icons';

interface DesktopMineProps extends BasicComponentProps {
    item: RoomPlayerResponse;
    isMineSpeaker: boolean;
}

const DesktopMine: React.FC<DesktopMineProps> = (props) => {
    const { item, isMineSpeaker } = props;
    const { onStatusChange, roomInfo, speaker } = useContext(RoomContext);

    const onSpeaker = (type: string, params?: Record<string, any>) => {
        speaker?.(type, params);
    };

    return (
        <div className="h-full p-5 custom-shadow flex  flex-col bg-white relative">
            <div className="desktop-mine-head relative">
                <div className=" flex items-center justify-center">
                    <Space size={50}>
                        <Popconfirm
                            title="退出房间"
                            description="游戏中退出房间则视为弃牌，确定退出吗？"
                            onConfirm={() => {
                                onSpeaker('弃牌');
                                onStatusChange?.('退出');
                            }}
                            onOpenChange={() => console.log('open change')}
                        >
                            <Button>退出房间</Button>
                        </Popconfirm>
                        <Button
                            type="primary"
                            disabled={!isMineSpeaker}
                            onClick={() => {
                                onSpeaker('跟');
                            }}
                        >
                            跟
                        </Button>
                        <Button
                            type="primary"
                            disabled={!isMineSpeaker}
                            onClick={() => {
                                onSpeaker('看牌');
                            }}
                        >
                            看牌
                        </Button>
                        <Button
                            type="primary"
                            disabled={!isMineSpeaker}
                            onClick={() => {
                                onSpeaker('弃牌');
                            }}
                        >
                            弃牌
                        </Button>
                        <Button
                            type="primary"
                            disabled={!isMineSpeaker}
                            onClick={() => {
                                onSpeaker('比牌');
                            }}
                        >
                            比牌
                        </Button>
                        <Button
                            type="primary"
                            disabled={!isMineSpeaker}
                            onClick={() => {
                                onSpeaker('结束发言');
                            }}
                        >
                            结束发言
                        </Button>
                    </Space>
                </div>
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

import { BasicComponentProps } from '@/components/interface';
import { Button, Popconfirm, Popover, Space } from 'antd';
import PockerCard from './pocker-card';
import { PlayerGameStatusEnum, playerGameStatusMap, RoomPlayerResponse } from '../../interface';
import { useCallback, useContext } from 'react';
import RoomContext from '../../context';
import { SoundOutlined } from '@ant-design/icons';
import { pick } from 'lodash';

interface DesktopMineProps extends BasicComponentProps {
    item: RoomPlayerResponse;
    isMineSpeaker: boolean;
}

const DesktopMine: React.FC<DesktopMineProps> = (props) => {
    const { item, isMineSpeaker } = props;
    const { onStatusChange, roomInfo, players, speaker } = useContext(RoomContext);

    const onSpeaker = (type: string, params?: Record<string, any>) => {
        speaker?.(type, item, params);
    };

    /**
     * 跟牌
     */
    const CallBtn = useCallback(() => {
        let callAnteList = [1, 2];
        const isLookPocker = item.playerGames.gameStatus == PlayerGameStatusEnum.LOOK_POCKER;
        const maxRaise = roomInfo?.maxRaise;

        if (maxRaise === 1) {
            callAnteList = isLookPocker ? [2] : [1, 2];
        } else if (maxRaise === 2) {
            callAnteList = isLookPocker ? [5] : [2];
        }

        return (
            <Popover
                content={
                    <>
                        {callAnteList.map((callAnte) => {
                            return (
                                <p
                                    key={callAnte}
                                    className=" flex items-center justify-center px-3 py-2 cursor-pointer text-zjf-bright-blue border border-gray-600 font-semibold rounded mb-4"
                                    onClick={() => {
                                        onSpeaker('跟', { ante: callAnte });
                                    }}
                                >
                                    <span>{callAnte}</span>
                                </p>
                            );
                        })}
                    </>
                }
                title="押注大小"
                trigger="click"
            >
                <Button type="primary" key="call-btn" disabled={!isMineSpeaker}>
                    押注<span className="ml-2">{isLookPocker ? '看' : '闷'}</span>
                </Button>
            </Popover>
        );
    }, [roomInfo?.maxRaise, item.playerGames.gameStatus, isMineSpeaker]);

    const CompareBtn = useCallback(() => {
        const comparePlayers = players
            ?.filter((playerItem) => {
                return (
                    playerItem.player.userId != item.player.userId &&
                    playerItem.playerGames.gameStatus != PlayerGameStatusEnum.DELETE_POCKER
                );
            })
            .map((playerItem) => pick(playerItem.player, ['userId', 'username']));

        return (
            <Popover
                content={
                    <>
                        {comparePlayers?.map((pItem, index) => {
                            return (
                                <p
                                    key={index}
                                    className=" w-32 flex items-center justify-center px-3 py-2 cursor-pointer text-zjf-bright-blue border border-gray-600 font-semibold rounded mb-4"
                                    onClick={() => {
                                        onSpeaker('比牌', { sponsor: item.player.userId, compared: pItem.userId });
                                    }}
                                >
                                    <span>{pItem.username}</span>
                                </p>
                            );
                        })}
                    </>
                }
                trigger="click"
            >
                <Button type="primary" key="compare-pocker" disabled={!isMineSpeaker}>
                    比牌
                </Button>
            </Popover>
        );
    }, [players, isMineSpeaker]);

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
                        >
                            <Button key="layout-room">退出房间</Button>
                        </Popconfirm>
                        {/* 非弃牌才展示跟注按钮 */}
                        {item.playerGames.gameStatus != PlayerGameStatusEnum.DELETE_POCKER && <CallBtn></CallBtn>}
                        {/* 发牌阶段才展示看牌 */}
                        {item.playerGames.gameStatus == PlayerGameStatusEnum.DEAL_POCKER && (
                            <Button
                                key="look-pocker"
                                type="primary"
                                disabled={!isMineSpeaker}
                                onClick={() => {
                                    onSpeaker('看牌');
                                }}
                            >
                                看牌
                            </Button>
                        )}
                        {/* 发牌后才展示比牌 */}
                        {item.playerGames.gameStatus == PlayerGameStatusEnum.LOOK_POCKER && <CompareBtn></CompareBtn>}
                        {item.playerGames.gameStatus != PlayerGameStatusEnum.DELETE_POCKER && (
                            <Button
                                key="end-say"
                                type="primary"
                                disabled={!isMineSpeaker}
                                onClick={() => {
                                    onSpeaker('结束发言');
                                }}
                            >
                                结束发言
                            </Button>
                        )}
                        {item.playerGames.gameStatus != PlayerGameStatusEnum.DELETE_POCKER && (
                            <Button
                                key="delete-pocker"
                                type="primary"
                                disabled={!isMineSpeaker}
                                onClick={() => {
                                    onSpeaker('弃牌');
                                }}
                            >
                                弃牌
                            </Button>
                        )}
                    </Space>
                </div>
            </div>
            <div className=" flex items-center justify-center mt-6">
                <p className=" text-zjf-new-cyan">{playerGameStatusMap.get(item.playerGames.gameStatus) || ''}</p>
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

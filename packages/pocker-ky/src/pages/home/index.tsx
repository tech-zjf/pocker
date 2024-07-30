import { Button } from 'antd';
import useSocket, { EventListenerEnum, EventPushEnum } from '@/libs/hooks/use-socket';
import { useEffect, useState } from 'react';
import CreateRoomModal from './components/create-room-modal';
import RoomItem from './components/room-card';
import { GameRoomItem } from '@/api/modules/room/interface';
import { ApiResponse } from '@/api/interface';
import { ApiCode } from '@/api/constant';
import { PockerEnum, PockersTypeEnum } from '@/constants/pocker';
import { compare } from '@/libs/tools/pocker';

const Home: React.FC = () => {
    const { socket } = useSocket();
    const [rooms, setRooms] = useState<any[]>([]);
    const [createRoomModal, setCreateRoomModal] = useState(false);

    /** 获取房间列表 */
    const fetchRooms = async () => {
        // 通知服务端推送房间列表
        socket.emit(EventPushEnum.ON_GAME_ROOM_LIST);
    };

    const testPosckerSize = () => {
        const p1 = [
            {
                type: PockersTypeEnum.HONG_TAO,
                value: PockerEnum.FIVE,
                weight: 5
            },
            { type: PockersTypeEnum.HEI_TAO, value: PockerEnum.FIVE, weight: 5 },
            { type: PockersTypeEnum.MEI_HUA, value: PockerEnum.THREE, weight: 3 }
        ];
        const p2 = [
            {
                type: PockersTypeEnum.HONG_TAO,
                value: PockerEnum.A,
                weight: 14
            },
            { type: PockersTypeEnum.HEI_TAO, value: PockerEnum.A, weight: 14 },
            { type: PockersTypeEnum.MEI_HUA, value: PockerEnum.A, weight: 14 }
        ];
        const result = compare(p1, p2);
        console.log(result);
    };

    useEffect(() => {
        fetchRooms();
        testPosckerSize();
        function onListenerRoomsRefresh(res: ApiResponse<GameRoomItem[]>) {
            if (res.code === ApiCode.SUCCESS) {
                setRooms(res.data);
            }
        }

        socket.on(EventListenerEnum.PUSH_ROOM_LIST, onListenerRoomsRefresh);

        return () => {
            socket.off(EventListenerEnum.PUSH_ROOM_LIST, onListenerRoomsRefresh);
        };
    }, []);

    return (
        <>
            <div className="room-container">
                <div className="flex items-center justify-between  mb-3 pb-3 border-b border-gray-200">
                    <div className="flex items-center">
                        <h4 className=" text-base font-semibold  text-gray-900 ">房间列表</h4>
                    </div>
                    <div className="flex items-center">
                        <Button
                            type="primary"
                            className="flex items-center"
                            onClick={() => {
                                setCreateRoomModal(true);
                            }}
                        >
                            创建房间
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    {rooms.map((roomItem) => (
                        <RoomItem roomItem={roomItem} key={roomItem.roomNo} />
                    ))}
                </div>
            </div>
            {/* 创建房间 */}
            <CreateRoomModal
                open={createRoomModal}
                onClose={() => {
                    setCreateRoomModal(false);
                }}
                updateRooms={fetchRooms}
            />
        </>
    );
};
export default Home;

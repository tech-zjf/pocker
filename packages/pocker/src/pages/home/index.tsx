import { Button } from 'antd';
import useSocket from '@/libs/hooks/use-socket';
import { useEffect, useState } from 'react';
import CreateRoomModal from './components/create-room-modal';
import RoomItem from './components/room-card';

const Home: React.FC = () => {
    const { socket } = useSocket();
    const [rooms, setRooms] = useState<any[]>([]);
    const [createRoomModal, setCreateRoomModal] = useState(false);

    useEffect(() => {
        try {
            // 通知服务端推送房间列表
            socket.emit('getRoomList');
            // 服务端推送过来的房间列表
            socket.on('updateRoomList', (_rooms) => {
                console.log('_rooms', _rooms);
                setRooms(_rooms);
            });
            // 服务端推送过来的玩家加入房间了
            socket.on('joined', (playerJoinMsg) => {
                console.log('joined', playerJoinMsg);
            });
        } catch (error) {
            console.log(error);
        }
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
                            className=" flex items-center"
                            onClick={() => {
                                setCreateRoomModal(true);
                            }}
                        >
                            创建房间
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    {rooms.map((roomItem) => {
                        return <RoomItem roomItem={roomItem} key={roomItem.id} />;
                    })}
                </div>
            </div>
            {/* 创建房间 */}
            <CreateRoomModal
                open={createRoomModal}
                onClose={() => {
                    setCreateRoomModal(false);
                }}
            />
        </>
    );
};
export default Home;

import { Space, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useSocket from '@/libs/hooks/use-socket';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { getUserInfo } from '@/libs/storage';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const toRoomPage = (roomItem: any) => {
        socket.emit('joinRoom', {
            room: roomItem,
            player: getUserInfo()
        });
        setTimeout(() => {
            socket.emit('getRoomList');
        }, 2000);
        // navigate('/room');
    };
    const { socket } = useSocket();
    const [rooms, setRooms] = useState<any[]>([]);

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
        <div className="room-container">
            <h4
                className=" text-base font-semibold text-gray-900 mb-6"
                onClick={() => {
                    const room = {
                        id: new Date().valueOf().toString(),
                        roomName: '测试房间'
                    };
                    socket.emit('createRoom', room);
                }}
            >
                创建房间
            </h4>
            <div className=" grid grid-cols-4 gap-5">
                {rooms.map((roomItem, index) => {
                    return (
                        <div className=" col-span-1" key={roomItem.id}>
                            <Card
                                size="small"
                                title={roomItem.roomName + index + 1}
                                extra={
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            toRoomPage(roomItem);
                                        }}
                                    >
                                        进入房间 - {roomItem.playersSize}
                                    </Button>
                                }
                            >
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Home;

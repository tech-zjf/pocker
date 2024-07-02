import { Space, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useSocket from '@/libs/hooks/use-socket';
import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const toRoomPage = () => {
        navigate('/room');
    };

    useEffect(() => {
        try {
            const socket: Socket = io('http://localhost:4000');
            socket.emit('createWebsocketPocker', '这是客户端消息啊', (response: any) => {
                console.log('Received response:', response);
            });
            socket.on('message', (message) => {
                console.log('>>>>>>message', message);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="room-container">
            <h4 className=" text-base font-semibold text-gray-900 mb-6">房间列表</h4>
            <div className=" grid grid-cols-4 gap-5">
                <div className=" col-span-1">
                    <Card
                        size="small"
                        title="room"
                        extra={
                            <Button type="link" onClick={toRoomPage}>
                                进入房间
                            </Button>
                        }
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className=" col-span-1">
                    <Card
                        size="small"
                        title="room"
                        extra={
                            <Button type="link" onClick={toRoomPage}>
                                进入房间
                            </Button>
                        }
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className=" col-span-1">
                    <Card
                        size="small"
                        title="room"
                        extra={
                            <Button type="link" onClick={toRoomPage}>
                                进入房间
                            </Button>
                        }
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className=" col-span-1">
                    <Card
                        size="small"
                        title="room"
                        extra={
                            <Button type="link" onClick={toRoomPage}>
                                进入房间
                            </Button>
                        }
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className=" col-span-1">
                    <Card
                        size="small"
                        title="room"
                        extra={
                            <Button type="link" onClick={toRoomPage}>
                                进入房间
                            </Button>
                        }
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div className=" col-span-1">
                    <Card
                        size="small"
                        title="room"
                        extra={
                            <Button type="link" onClick={toRoomPage}>
                                进入房间
                            </Button>
                        }
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default Home;

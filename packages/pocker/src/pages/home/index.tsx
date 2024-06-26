import { Space, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const toRoomPage = () => {
        navigate('/room');
    };

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

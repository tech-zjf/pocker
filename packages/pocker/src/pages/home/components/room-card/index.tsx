import useSocket from '@/libs/hooks/use-socket';
import { getUserInfo } from '@/libs/storage';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface RoomItemProps {
    roomItem: any;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
    const { roomItem } = props;
    const navigate = useNavigate();
    const { socket } = useSocket();

    const onJoinRoom = () => {
        socket.emit('joinRoom', {
            room: roomItem,
            player: getUserInfo()
        });
        setTimeout(() => {
            socket.emit('getRoomList');
        }, 2000);
    };

    return (
        <div className="col-span-1">
            <Card
                size="small"
                title={roomItem.name}
                extra={
                    <Button type="link" onClick={onJoinRoom}>
                        进入房间
                    </Button>
                }
            >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    );
};
export default RoomItem;

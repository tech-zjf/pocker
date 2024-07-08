import useSocket from '@/libs/hooks/use-socket';
import { Button } from 'antd';

const ConnectTest: React.FC = () => {
    const { socket } = useSocket();
    return (
        <Button
            type="primary"
            onClick={() => {
                socket.emit('xxx', { a: 1 });
            }}
        >
            点击发送
        </Button>
    );
};
export default ConnectTest;

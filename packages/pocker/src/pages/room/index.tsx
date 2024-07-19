import { useEffect, useState } from 'react';
import PockerDesktop from './components/desktop';
import RoomReadingMask from './components/reading';
import useSocket from '@/libs/hooks/use-socket';

const Home: React.FC = () => {
    const { socket } = useSocket();
    const [currentRoomPlayers, setCurrentRoomPlayers] = useState([]);

    const onStatusChange = (status: string) => {
        console.log(status);
    };

    useEffect(() => {
        function updateRoomPlayers(res: any) {
            console.log('房间内玩家1231：', res);
        }

        // 服务端推送过来的房间列表
        socket.on('update_room_players', updateRoomPlayers);

        return () => {
            socket.off('update_room_players', updateRoomPlayers);
        };
    }, []);

    return (
        <div className="h-full ">
            <PockerDesktop />
            {/* 未开始游戏，准备中状态展示以下蒙层 */}
            <RoomReadingMask onStatusChange={onStatusChange} />
        </div>
    );
};
export default Home;

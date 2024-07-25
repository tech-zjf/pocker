import { useEffect, useState } from 'react';
import PockerDesktop from './components/desktop';
import RoomReadingMask from './components/reading';
import useSocket, { EventPushEnum } from '@/libs/hooks/use-socket';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '@/libs/storage';

const Home: React.FC = () => {
    const { socket } = useSocket();
    const { roomNo } = useParams();
    const [currentRoomPlayers, setCurrentRoomPlayers] = useState([]);

    const onStatusChange = (status: string) => {
        if (status === '退出') {
            onLeaveRoom();
        }
    };

    const onLeaveRoom = () => {
        console.log('退出房间！', { roomNo: roomNo, userId: getUserInfo().userId });
        // socket.emit(EventPushEnum.ON_LEAVE_ROOM, { roomNo: roomNo, userId: '' });
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

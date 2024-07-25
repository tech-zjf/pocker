import { useEffect, useState } from 'react';
import PockerDesktop from './components/desktop';
import RoomReadingMask from './components/reading';
import useSocket, { EventPushEnum } from '@/libs/hooks/use-socket';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '@/libs/storage';
import { ApiResponse } from '@/api/interface';
import { ApiCode } from '@/api/constant';
import { message } from 'antd';

const Home: React.FC = () => {
    const { socket } = useSocket();
    const { roomNo } = useParams();
    const useInfo = getUserInfo();
    const navigate = useNavigate();
    const [currentRoomPlayers, setCurrentRoomPlayers] = useState([]);

    const onStatusChange = (status: string) => {
        if (status === '退出') {
            onLeaveRoom();
        }
    };

    const onLeaveRoom = () => {
        socket.emit(EventPushEnum.ON_LEAVE_ROOM, { roomNo: roomNo, userId: useInfo.userId }, (res: ApiResponse<unknown>) => {
            if (res.code === ApiCode.SUCCESS) {
                message.success('退出成功！');
                navigate('/');
                return;
            }
            message.error(res.msg);
        });
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

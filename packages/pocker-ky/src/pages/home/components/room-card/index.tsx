import { GameRoomItem } from '@/api/modules/room/interface';
import useSocket, { EventListenerEnum, EventPushEnum } from '@/libs/hooks/use-socket';
import { getUserInfo } from '@/libs/storage';
import { Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { FORMAT } from '@/constants/dayjs';
import { RoomStatusMap } from '../../constants';
import { useEffect } from 'react';
import { ApiResponse } from '@/api/interface';
import { ApiCode } from '@/api/constant';
export interface RoomItemProps {
  roomItem: GameRoomItem;
}

const RoomItem: React.FC<RoomItemProps> = (props) => {
  const { roomItem } = props;
  const navigate = useNavigate();
  const { socket } = useSocket();
  const player = getUserInfo();

  const onJoinRoom = () => {
    const joinRoomParams = {
      roomNo: roomItem.roomNo,
      userId: player.userId
    };
    console.log('点击了加入房间', joinRoomParams);
    socket.emit(EventPushEnum.ON_JOIN_ROOM, joinRoomParams, (res: ApiResponse<unknown>) => {
      console.log('join:', res);
      if (res.code == ApiCode.SUCCESS) {
        // 通知服务端推送房间列表
        socket.emit(EventPushEnum.ON_GAME_ROOM_LIST);
        // 跳转到该房间
        navigate(`/room/${roomItem.roomNo}`);
      }
    });
  };

  useEffect(() => {
    function onRefreshRoomInfo(res: ApiResponse<unknown>) {
      console.log(res.code);
    }

    socket.on(EventListenerEnum.PUSH_ROOM_INFO, onRefreshRoomInfo);

    return () => {
      socket.off(EventListenerEnum.PUSH_ROOM_INFO, onRefreshRoomInfo);
    };
  });

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
        <p className="flex items-center mb-2">
          <span className=" text-gray-700">状态：</span>
          <span className=" text-zjf-bright-blue">{RoomStatusMap.get(roomItem.roomState)}</span>
        </p>
        <p className="flex items-center mb-2">
          <span className=" text-gray-700">房间人数上限：</span>
          <span className="  text-gray-900">{roomItem.maxPlayers}</span>
        </p>
        <p className="flex items-center mb-2">
          <span className=" text-gray-700">当前人数：</span>
          <span className="  text-gray-900">{roomItem.playerNum}</span>
        </p>
        <p className="flex items-center mb-2">
          <span className=" text-gray-700">创建时间：</span>
          <span className="  text-gray-900">{dayjs(roomItem.createTime).format(FORMAT.DATETIME)}</span>
        </p>
      </Card>
    </div>
  );
};
export default RoomItem;

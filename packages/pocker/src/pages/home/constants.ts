import { RoomStatusEnum } from '@/api/modules/room/interface';

export const RoomStatusMap = new Map([
    [RoomStatusEnum.WAIT, '等待玩家加入中'],
    [RoomStatusEnum.GAMEING, '游戏中']
]);

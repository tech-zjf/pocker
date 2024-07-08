export interface CreateRoomParams {
    name: string;
    maxPlayers: number;
}

export interface GameRoomItem {
    /**
     * 房间人数上限
     */
    maxPlayers: number;
    /**
     * 房间名
     */
    name: string;
    /**
     * 加入玩家人数
     */
    playerNum: number;
    /**
     * 准备就绪玩家人数
     */
    readyPlayers: number;
    /**
     * 房间号
     */
    roomNo: number;
    /**
     * 房间状态 （0 等待加入，1 游戏中）
     */
    roomState: RoomStatusEnum;
    [property: string]: any;
}

export enum RoomStatusEnum {
    /**
     * 等待玩家加入中
     */
    WAIT = 1,
    /**
     * 游戏中
     */
    GAMEING = 2
}

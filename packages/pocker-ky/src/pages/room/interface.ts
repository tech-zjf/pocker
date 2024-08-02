/** 房间状态枚举 */
export enum RoomStateEnum {
    /** 等待玩家加入 */
    WAIT_JOIN,
    /** 游戏中 */
    GAMEING
}

/** 房间详情 */
export interface RoomInfoResponse {
    /** 房间号 */
    roomNo: string;
    /** 房间名 */
    name: string;
    /** 房间状态 */
    roomState: RoomStateEnum;
    /** 房间玩家最大人数 */
    maxPlayers: number;
    /** 房间玩家人数 */
    playerNum: number;
    /** 已准备人数 */
    readyPlayers: number;
    /** 房主 ID */
    createId: string;
    /** 房间创建时间 */
    createTime: string;
}

/** 玩家在当前房间的状态 */
export enum PlayerRoomStatusEnum {
    /** 未准备 */
    WAIT,
    /** 已准备 */
    READING,
    /** 游戏中 */
    GAMEING
}

/** 玩家状态 */
export enum PlayerGameStatusEnum {
    /** 发牌 */
    DEAL_POCKER,
    /** 看牌 */
    LOOK_POCKER,
    /** 弃牌 */
    DELETE_POCKER
}

export interface RoomPlayerResponse {
    player: {
        userId: string;
        username: string;
        avatar: string;
    };
    playerGames: {
        roomStatus: PlayerRoomStatusEnum;
        gameStatus: PlayerGameStatusEnum;
        cards: {
            number: number;
            flower: number;
        };
    };
}

export interface RoomResponse {
    gameRoom: RoomInfoResponse;
    players: RoomPlayerResponse[];
}

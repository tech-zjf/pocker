export interface GameRoom {
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
    roomState: number;
    [property: string]: any;
}

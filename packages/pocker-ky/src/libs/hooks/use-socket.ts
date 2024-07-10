import { Socket, io } from 'socket.io-client';
import { getToken } from '../storage';

export enum EventPushEnum {
    /**
     * 创建房间
     */
    ON_CREATE_ROOM = 'create-room',
    /**
     * 加入房间
     */
    ON_JOIN_ROOM = 'join-room',
    /**
     * 获取房间列表
     */
    ON_GAME_ROOM_LIST = 'game-room-list'
}

export enum EventListenerEnum {
    /**
     * 刷新房间列表推送
     */
    PUSH_ROOM_LIST = 'refresh-room-list',
    /**
     * 刷新房间信息推送
     */
    PUSH_ROOM_INFO = 'refresh-room-info'
}

const useSocket = () => {
    const socket: Socket = io('http://110.40.198.126:8888/game', {
        extraHeaders: {
            Authorization: getToken()
        },
        autoConnect: false
    });
    return {
        socket
    };
};
export default useSocket;
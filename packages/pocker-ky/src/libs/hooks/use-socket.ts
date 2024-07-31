import { Socket, io } from 'socket.io-client';
import { getToken, setToken, setUserInfo } from '../storage';
import { redirect } from 'react-router-dom';
import { Error_Code, SOCKET_CONNECT_ERROR_CODE } from '@/constants/socket-code';

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
    ON_GAME_ROOM_LIST = 'game-room-list',
    /**
     * 退出房间
     */
    ON_LEAVE_ROOM = 'leave-room',

    /**
     * 通知服务端推送房间信息
     */
    ON_GAME_ROOM_INFO = 'game-room-info'
}

export enum EventListenerEnum {
    /**
     * 刷新房间列表推送
     */
    PUSH_ROOM_LIST = 'refresh-room-list',
    /**
     * 监听服务端推送房间信息
     */
    PUSH_ROOM_INFO = 'refresh-room-info'
}

let socketInstance: Socket | null = null;

export function login() {
    setToken();
    setUserInfo();
    redirect('/login');
}

const useSocket = () => {
    if (!socketInstance || !socketInstance.connected) {
        socketInstance = io('http://110.40.198.126:8888/game', {
            auth: {
                token: getToken()
            },
            autoConnect: false
        });
        socketInstance.connect();

        socketInstance.on('connect_error', (err: any) => {
            const { data, message } = err;
            console.log('connect_error：', message, data);
            const code: Error_Code = data?.code;
            if (SOCKET_CONNECT_ERROR_CODE[code]) {
                message.error(SOCKET_CONNECT_ERROR_CODE[code]);
            }
            login();
        });
    }
    return {
        socket: socketInstance
    };
};
export default useSocket;

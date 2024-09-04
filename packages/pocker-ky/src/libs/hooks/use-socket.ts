import { Socket, io } from 'socket.io-client';
import { getToken, setToken, setUserInfo } from '../storage';
import { redirect } from 'react-router-dom';
import { ApiResponse } from '@/api/interface';
import { message } from 'antd';
import { ApiCode, socket_connect_error_code } from '@/api/constant';

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
    ON_GAME_ROOM_INFO = 'game-room-info',
    /**
     * 开始游戏
     */
    ON_START_GAME = 'start-game',
    /**
     * 获取房间玩家信息
     */
    ON_GAME_ROOM_PLAYERS = 'game-room-players',
    /**
     * 断开连接
     */
    PLAYER_DISCONNECT = 'plaver-disconnect',
    /**
     * 结束发言
     */
    ON_FINISH_SPEAK = 'finish-speak',
    /**
     * 看牌
     */

    ON_LOOK_CARDS = 'look-cards',
    /**
     * 弃牌
     */

    ON_FOLD = 'fold',
    /**
     * 比牌
     */
    ON_COMPARE_CARDS = 'compare-cards',
    /**
     * 跟牌
     */
    ON_CALL = 'call'
}

export enum EventListenerEnum {
    /**
     * 刷新房间列表推送
     */
    PUSH_ROOM_LIST = 'refresh-room-list',
    /**
     * 监听服务端推送房间信息
     */
    PUSH_ROOM_INFO = 'refresh-room-info',
    /**
     * 房间卡牌信息
     */
    PUSH_ROOM_PLAYER = 'refresh-room-player'
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
            const { data, errMsg } = err;
            console.log('connect_error：', errMsg, data);
            const code: ApiCode = data?.code;
            if (socket_connect_error_code.has(code)) {
                message.error(socket_connect_error_code.get(code));
            } else {
                message.error('socket连接错误！');
            }
            if (code === ApiCode.TOKEN_INVALID) {
                login();
            }
        });

        socketInstance.on('socket_error', (err: ApiResponse<unknown>) => {
            const { code } = err;
            console.log('socket_error：', err);
            message.error(socket_connect_error_code.get(code));
            if (code === ApiCode.TOKEN_INVALID) {
                login();
            }
        });
    }
    return {
        socket: socketInstance
    };
};
export default useSocket;

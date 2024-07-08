import { Socket, io } from 'socket.io-client';
import { getToken } from '../storage';

const useSocket = () => {
    const socket: Socket = io('http://110.40.198.126:8989/game', {
        extraHeaders: {
            Authorization: 'Bearer' + ' ' + getToken()
        }
    });
    return {
        socket
    };
};
export default useSocket;

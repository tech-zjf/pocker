import { Socket, io } from 'socket.io-client';

const useSocket = () => {
    const socket: Socket = io('http://127.0.0.1:8080');
    return {
        socket
    };
};
export default useSocket;

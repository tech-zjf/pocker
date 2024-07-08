import { Socket, io } from 'socket.io-client';

const useSocket = () => {
    const socket: Socket = io('http://localhost:4000/ws');
    return {
        socket
    };
};
export default useSocket;

import { Socket, io } from 'socket.io-client';
import { getToken, setToken, setUserInfo } from '../storage';
import { redirect } from 'react-router-dom';

let socketInstance: Socket | null = null;

const useSocket = () => {
    socketInstance = io('http://localhost:4000/ws', {
        extraHeaders: {
            Authorization: getToken()
        },
        autoConnect: false
    });

    socketInstance.connect();

    socketInstance.on('connect_error', (err) => {
        setToken();
        setUserInfo();
        redirect('/login');
    });
    return {
        socket: socketInstance
    };
};
export default useSocket;

import { createContext } from 'react';
import { RoomInfoResponse, RoomPlayerResponse } from './interface';

export interface RoomContextValue {
    roomNo?: string;
    roomInfo?: RoomInfoResponse;
    players?: RoomPlayerResponse[];
    onStatusChange?: (status: string) => void;
    onStartGame?: () => void;
    onLeaveRoom?: () => void;
    fetchRoomInfo?: () => void;
    fetchRoomPlayers?: () => void;
    speaker?: (type: string, params?: Record<string, any>) => void;
}

const RoomContext = createContext<RoomContextValue>({});

export default RoomContext;

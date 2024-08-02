import { createContext } from 'react';

export interface RoomContextValue {}

const RoomContext = createContext<RoomContextValue | null>(null);

export default RoomContext;

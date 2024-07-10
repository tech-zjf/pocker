import { createContext } from 'react';

interface RoomContextValue {}

const RoomContext = createContext<RoomContextValue | null>(null);

export default RoomContext;

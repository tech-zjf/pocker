import { PockersTypeEnum } from './constants';

export interface Player {
    id: number;
    phone: string;
    name: string;
    isMine: boolean;
    pockers: Array<{ type: PockersTypeEnum; value: string }>;
    isSpeech: boolean;
    status: string;
    betting: number;
}

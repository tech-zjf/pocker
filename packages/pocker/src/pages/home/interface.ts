export interface Player {
    id: number;
    phone: string;
    name: string;
    isMine: boolean;
    pockers: Array<{
        type: string;
        value: string;
    }>;
    isSpeech: boolean;
    status: string;
    betting: number;
}

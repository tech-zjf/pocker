import { Pocker } from '@/constants/pocker';

export interface AuthorDetailResponse {
    nickname: string;
    userId: number;
    avatar: string;
    roles: string[];
    username: string;
}

export interface Player {
    // 玩家id
    id: number;
    // 玩家名称
    name: string;
    // 自己
    isMine: boolean;
    // 卡牌
    pockers: Array<Pocker>;
    // 是否是说话状态
    isSpeech: boolean;
    // 状态
    status: string;
    // 下注的金额
    betting: number;
}

import { PockersTypeEnum } from './constants';

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

export enum PockerEnum {
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    TEN = '10',
    J = 'J',
    Q = 'Q',
    K = 'K',
    A = 'A'
}

export interface Pocker {
    /**
     * 红黑梅方
     */
    readonly type: PockersTypeEnum;
    readonly value: PockerEnum;
    /**
     *  value 大小
     **/
    readonly weight: number;
}

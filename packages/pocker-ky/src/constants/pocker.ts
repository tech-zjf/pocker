import HONG_TAO_IMG from '@/assets/images/hong-tao.png';
import HEI_TAO_IMG from '@/assets/images/hei-tao.png';
import MEI_HUA_IMG from '@/assets/images/mei-hua.png';
import FANG_KUAI_IMG from '@/assets/images/fang-kuai.png';

export enum PockersTypeEnum {
    /** 红桃 */
    HONG_TAO = 3,
    /** 黑桃 */
    HEI_TAO = 2,
    /** 梅花 */
    MEI_HUA = 1,
    /** 方块 */
    FANG_KUAI = 0
}

export const PockerCardCenterImageMap = new Map([
    [PockersTypeEnum.HONG_TAO, HONG_TAO_IMG],
    [PockersTypeEnum.HEI_TAO, HEI_TAO_IMG],
    [PockersTypeEnum.MEI_HUA, MEI_HUA_IMG],
    [PockersTypeEnum.FANG_KUAI, FANG_KUAI_IMG]
]);

export const pockerMap = new Map([
    [2, '2'],
    [3, '3'],
    [4, '4'],
    [5, '5'],
    [6, '6'],
    [7, '7'],
    [8, '8'],
    [9, '9'],
    [10, '10'],
    [11, 'J'],
    [12, 'Q'],
    [13, 'K'],
    [14, 'A']
]);

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

/** 扑克牌比大小的类型 */
export enum PockerCombinationTypeEnum {
    AAA = 'AAA',
    // 三胞胎
    TRIPLETS = 'triplets',
    // 顺金
    STRAIGHT_FLUSH = 'straight_flush',
    // 金花
    FLUSH = 'flush',
    // 顺子
    STRAIGHT = 'straight',
    // 双胞胎
    PAIR = 'pair',
    // 散牌
    HIGH_CARD = 'high_card',
    // 二三五
    TWO_THREE_FIVE = 'two_three_five'
}

/** 根据类型大小排序 小 - 大 */
export const defaultPockerCombinationSort = [
    PockerCombinationTypeEnum.TWO_THREE_FIVE,
    PockerCombinationTypeEnum.HIGH_CARD,
    PockerCombinationTypeEnum.PAIR,
    PockerCombinationTypeEnum.STRAIGHT,
    PockerCombinationTypeEnum.FLUSH,
    PockerCombinationTypeEnum.STRAIGHT_FLUSH,
    PockerCombinationTypeEnum.TRIPLETS,
    PockerCombinationTypeEnum.AAA
];

export interface Pocker {
    readonly type: PockersTypeEnum;
    readonly value: PockerEnum; // '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
    readonly weight: number; // '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14' 和 value 对应， 比大小用
}

export const default_pockers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

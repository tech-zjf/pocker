import HONG_TAO_IMG from '@/assets/images/hong-tao.png';
import HEI_TAO_IMG from '@/assets/images/hei-tao.png';
import MEI_HUA_IMG from '@/assets/images/mei-hua.png';
import FANG_KUAI_IMG from '@/assets/images/fang-kuai.png';
import { Pocker } from './interface';

export const _pockers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export enum PockersTypeEnum {
    /** 红桃 */
    HONG_TAO = 4,
    /** 黑桃 */
    HEI_TAO = 3,
    /** 梅花 */
    MEI_HUA = 2,
    /** 方块 */
    FANG_KUAI = 1
}

export const PockerCardCenterImageMap = new Map([
    [PockersTypeEnum.HONG_TAO, HONG_TAO_IMG],
    [PockersTypeEnum.HEI_TAO, HEI_TAO_IMG],
    [PockersTypeEnum.MEI_HUA, MEI_HUA_IMG],
    [PockersTypeEnum.FANG_KUAI, FANG_KUAI_IMG]
]);

/** 扑克牌比大小的类型 */
enum PockerCombinationTypeEnum {
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

const defaultPockerCombinationSort = [
    PockerCombinationTypeEnum.TWO_THREE_FIVE,
    PockerCombinationTypeEnum.HIGH_CARD,
    PockerCombinationTypeEnum.PAIR,
    PockerCombinationTypeEnum.STRAIGHT,
    PockerCombinationTypeEnum.FLUSH,
    PockerCombinationTypeEnum.STRAIGHT_FLUSH,
    PockerCombinationTypeEnum.TRIPLETS,
    PockerCombinationTypeEnum.AAA
];

function findCombinationRank(combination: PockerCombinationTypeEnum): number {
    return defaultPockerCombinationSort.indexOf(combination);
}

/** 计算牌的类型 */
function computePockerType(pockers: Pocker[]): PockerCombinationTypeEnum {
    const values = pockers.map((p) => p.value);
    const suits = pockers.map((p) => p.type);
    const weights = pockers.map((p) => p.weight).sort((a, b) => a - b);

    const hasValue = (pVal: string) => pockers.some((p) => p.value === pVal);

    const isAAA = () => values.every((p) => p === 'A');
    const isTriplets = () => new Set(values).size === 1;
    const isPair = () => new Set(values).size === 2;
    const isFlush = () => new Set(suits).size === 1;
    const isStraight = () => {
        if (hasValue('A') && !hasValue('K')) {
            return hasValue('2') && hasValue('3');
        }
        return weights[1] === weights[0] + 1 && weights[2] === weights[1] + 1;
    };
    const isStraightFlush = () => isFlush() && isStraight();
    const isTwoThreeFive = () => hasValue('2') && hasValue('3') && hasValue('5');

    if (isAAA()) {
        return PockerCombinationTypeEnum.AAA;
    }
    if (isTriplets()) {
        return PockerCombinationTypeEnum.TRIPLETS;
    }
    if (isPair()) {
        return PockerCombinationTypeEnum.PAIR;
    }
    if (isStraightFlush()) {
        return PockerCombinationTypeEnum.STRAIGHT_FLUSH;
    }
    if (isFlush()) {
        return PockerCombinationTypeEnum.FLUSH;
    }
    if (isStraight()) {
        return PockerCombinationTypeEnum.STRAIGHT;
    }
    if (isTwoThreeFive()) {
        return PockerCombinationTypeEnum.TWO_THREE_FIVE;
    }
    return PockerCombinationTypeEnum.HIGH_CARD;
}

function compareSameTypePockers(pockers1: Pocker[], pockers2: Pocker[]) {
    const sortPockers1 = pockers1.sort((a, b) => b.weight - a.weight);
    const sortPockers2 = pockers2.sort((a, b) => b.weight - a.weight);
    let result = 0;
    let p1Index = 0;
    let p2Index = 0;
    const p1 = sortPockers1[p1Index];
    const p2 = sortPockers2[p2Index];

    // 牌一样 比较花色
    if (p1.weight === p2.weight) {
        result = p1.type > p2.type ? 0 : 1;
    } else {
        result = p1.weight > p2.weight ? 0 : 1;
    }
    return result;
}

/** 比大小 */
export function compare(pockers1: Pocker[], pockers2: Pocker[]) {
    const pocker1Type = computePockerType(pockers1);
    const pocker2Type = computePockerType(pockers2);

    if (pocker1Type === pocker2Type) {
        return compareSameTypePockers(pockers1, pockers2);
    } else {
        const pocker1Index = findCombinationRank(pocker1Type);
        const pocker2Index = findCombinationRank(pocker2Type);
        if ([pocker1Type, pocker2Type].includes(PockerCombinationTypeEnum.AAA) && [pocker1Type, pocker2Type].includes(PockerCombinationTypeEnum.TWO_THREE_FIVE)) {
            if (pocker1Type === PockerCombinationTypeEnum.TWO_THREE_FIVE) {
                return 0; // 'pocker1 - 大';
            } else {
                return 1; // 'pocker2 - 大';
            }
        } else {
            if (pocker1Index < pocker2Index) {
                return 1; // 'pocker2 - 大';
            } else {
                return 0; // 'pocker1 - 大';
            }
        }
    }
}

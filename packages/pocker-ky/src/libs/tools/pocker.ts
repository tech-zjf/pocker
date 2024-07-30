import { default_pockers, defaultPockerCombinationSort, Pocker, PockerCombinationTypeEnum, PockerEnum, PockersTypeEnum } from '@/constants/pocker';

export function createPocker(value: PockerEnum, type: PockersTypeEnum): Pocker {
    return {
        value,
        type,
        weight: default_pockers.findIndex((item) => item === value) + 2
    };
}

/** 根据牌的类型 获取当前类型的大小索引 */
function findCombinationRank(combination: PockerCombinationTypeEnum): number {
    return defaultPockerCombinationSort.indexOf(combination);
}

/** 计算牌的大小 */
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

/** 比较相同类型的牌  */
function compareSameTypePockers(pockers1: Pocker[], pockers2: Pocker[], type: PockerCombinationTypeEnum) {
    const sortPockers1 = pockers1.sort((a, b) => b.weight - a.weight);
    const sortPockers2 = pockers2.sort((a, b) => b.weight - a.weight);
    let i;
    for (i = 0; i < 3; i++) {
        const p1 = sortPockers1[i];
        const p2 = sortPockers2[i];
        if (p1.value > p2.value) {
            return 0;
        }
        if (p1.value < p2.value) {
            return 1;
        }
    }
    if (i === 3 && [PockerCombinationTypeEnum.STRAIGHT_FLUSH, PockerCombinationTypeEnum.FLUSH].includes(type)) {
        return sortPockers1[0].type > sortPockers2[1].type ? 0 : 1;
    } else {
        return '谁开牌谁输！';
    }
}

/** 比大小 */
export function compare(pockers1: Pocker[], pockers2: Pocker[]) {
    const pocker1Type = computePockerType(pockers1);
    const pocker2Type = computePockerType(pockers2);
    console.log('卡牌类型：', pocker1Type, pocker2Type);
    if (pocker1Type === pocker2Type) {
        return compareSameTypePockers(pockers1, pockers2, pocker1Type);
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

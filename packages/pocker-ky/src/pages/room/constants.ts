import HONG_TAO_IMG from '@/assets/images/hong-tao.png';
import HEI_TAO_IMG from '@/assets/images/hei-tao.png';
import MEI_HUA_IMG from '@/assets/images/mei-hua.png';
import FANG_KUAI_IMG from '@/assets/images/fang-kuai.png';
import { Player, Pocker } from './interface';

export const _pockers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export enum PockersTypeEnum {
    /** 红桃 */
    HONG_TAO = 4,
    /** 黑桃 */
    HEI_TAO = 3,
    /** 梅花 */
    MEI_HUA = 2,
    /** 方块 */
    FANG_kUAI = 1
}

export const PockerCardCenterImageMap = new Map([
    [PockersTypeEnum.HONG_TAO, HONG_TAO_IMG],
    [PockersTypeEnum.HEI_TAO, HEI_TAO_IMG],
    [PockersTypeEnum.MEI_HUA, MEI_HUA_IMG],
    [PockersTypeEnum.FANG_kUAI, FANG_KUAI_IMG]
]);

//  自己
//  看牌/弃牌  状态才能看到卡牌数据 否则展示卡片背面

//  好有
//  只有当好有时弃牌才能看到好友的卡牌数据

/** 扑克牌比大小的类型 */
enum PockerCombinationTypeEnum {
    AAA = 'AAA',
    // 三胞胎
    TRIPLETS = 'triplets',
    // 双胞胎
    TWINS = 'twins',
    // 顺金
    SHUN_JIN = 'shun_jin',
    // 金花
    JIN_HUA = 'jin_hua',
    // 顺子
    STRAIGHT = 'straight',
    // 散牌
    SAN_PAI = 'san_pai',
    // 二三五
    TWO_THREE_FIVE = 'two_three_five'
}

/** 计算牌的类型 */
function computePockerType(pocker: Pocker[]): PockerCombinationTypeEnum {
    const values = pocker.map((p) => p.value);
    const types = pocker.map((p) => p.type);
    const weights = pocker.map((p) => p.weight).sort((a, b) => a - b);

    const hasValue = (pVal: string) => pocker.some((p) => p.value === pVal);

    const isAAA = () => values.every((p) => p === 'A');

    const isTriplets = () => new Set(values).size === 1;

    const isTwins = () => new Set(values).size === 2;

    const isJinHua = () => new Set(types).size === 1;

    const isStraight = () => {
        if (hasValue('A') && !hasValue('K')) {
            return hasValue('2') && hasValue('3');
        }
        return weights[1] === weights[0] + 1 && weights[2] === weights[1] + 1;
    };

    const isShunJin = () => isJinHua() && isStraight();

    const is235 = () => hasValue('2') && hasValue('3') && hasValue('5');

    if (isAAA()) {
        return PockerCombinationTypeEnum.AAA;
    }
    if (isTriplets()) {
        return PockerCombinationTypeEnum.TRIPLETS;
    }
    if (isTwins()) {
        return PockerCombinationTypeEnum.TWINS;
    }
    if (isShunJin()) {
        return PockerCombinationTypeEnum.SHUN_JIN;
    }
    if (isJinHua()) {
        return PockerCombinationTypeEnum.JIN_HUA;
    }
    if (isStraight()) {
        return PockerCombinationTypeEnum.STRAIGHT;
    }
    if (is235()) {
        return PockerCombinationTypeEnum.TWO_THREE_FIVE;
    }
    return PockerCombinationTypeEnum.SAN_PAI;
}

export function compare(pocker1: Pocker[], pocker2: Pocker[]) {
    const pocker1Type = computePockerType(pocker1);
    const pocker2Type = computePockerType(pocker2);
    console.log(pocker1Type, pocker2Type);
    // let pocker1StartIndex = 0;
    // let pocker2StartIndex = 0;
}

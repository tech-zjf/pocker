import HONG_TAO_IMG from '@/assets/images/hong-tao.png';
import HEI_TAO_IMG from '@/assets/images/hei-tao.png';
import MEI_HUA_IMG from '@/assets/images/mei-hua.png';
import FANG_KUAI_IMG from '@/assets/images/fang-kuai.png';
import { Player, Pocker } from './interface';

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

export function compare(pocker1: Pocker[], pocker2: Pocker[]) {
    // 是否为对子
    function _isTwins(p: Pocker) {}

    // 三张一样的
    function _isTriplets(p: Pocker) {}
}

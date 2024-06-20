import HONG_TAO_IMG from '@/assets/images/hong-tao.png';
import HEI_TAO_IMG from '@/assets/images/hei-tao.png';
import MEI_HUA_IMG from '@/assets/images/mei-hua.png';
import FANG_KUAI_IMG from '@/assets/images/fang-kuai.png';

export enum PockersTypeEnum {
    /** 红桃 */
    HONG_TAO = 1,
    /** 黑桃 */
    HEI_TAO = 2,
    /** 梅花 */
    MEI_HUA = 3,
    /** 方块 */
    FANG_kUAI = 4
}

export const PockerCardCenterImageMap = new Map([
    [PockersTypeEnum.HONG_TAO, HONG_TAO_IMG],
    [PockersTypeEnum.HEI_TAO, HEI_TAO_IMG],
    [PockersTypeEnum.MEI_HUA, MEI_HUA_IMG],
    [PockersTypeEnum.FANG_kUAI, FANG_KUAI_IMG]
]);

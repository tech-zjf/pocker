import java.util.*;

public class PockerUtils {

    public enum PockersTypeEnum {
        HONG_TAO,
        HEI_TAO,
        MEI_HUA,
        FANG_KUAI
    }

    public enum PockerEnum {
        TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, J, Q, K, A
    }

    public enum PockerCombinationTypeEnum {
        AAA,
        TRIPLETS,
        STRAIGHT_FLUSH,
        FLUSH,
        STRAIGHT,
        PAIR,
        HIGH_CARD,
        TWO_THREE_FIVE
    }

    private static final String HONG_TAO_IMG = "@/assets/images/hong-tao.png";
    private static final String HEI_TAO_IMG = "@/assets/images/hei-tao.png";
    private static final String MEI_HUA_IMG = "@/assets/images/mei-hua.png";
    private static final String FANG_KUAI_IMG = "@/assets/images/fang-kuai.png";

    private static final Map<PockersTypeEnum, String> PockerCardCenterImageMap = new HashMap<>();
    static {
        PockerCardCenterImageMap.put(PockersTypeEnum.HONG_TAO, HONG_TAO_IMG);
        PockerCardCenterImageMap.put(PockersTypeEnum.HEI_TAO, HEI_TAO_IMG);
        PockerCardCenterImageMap.put(PockersTypeEnum.MEI_HUA, MEI_HUA_IMG);
        PockerCardCenterImageMap.put(PockersTypeEnum.FANG_KUAI, FANG_KUAI_IMG);
    }

    private static final List<String> defaultPockers = Arrays.asList("2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A");

    private static final List<PockerCombinationTypeEnum> defaultPockerCombinationSort = Arrays.asList(
            PockerCombinationTypeEnum.TWO_THREE_FIVE,
            PockerCombinationTypeEnum.HIGH_CARD,
            PockerCombinationTypeEnum.PAIR,
            PockerCombinationTypeEnum.STRAIGHT,
            PockerCombinationTypeEnum.FLUSH,
            PockerCombinationTypeEnum.STRAIGHT_FLUSH,
            PockerCombinationTypeEnum.TRIPLETS,
            PockerCombinationTypeEnum.AAA
    );

    public static class Pocker {
        public final PockersTypeEnum type;
        public final PockerEnum value;
        public final int weight;

        public Pocker(PockerEnum value, PockersTypeEnum type) {
            this.value = value;
            this.type = type;
            this.weight = defaultPockers.indexOf(value.toString()) + 2;
        }
    }

    public static Pocker createPocker(PockerEnum value, PockersTypeEnum type) {
        return new Pocker(value, type);
    }

    private static int findCombinationRank(PockerCombinationTypeEnum combination) {
        return defaultPockerCombinationSort.indexOf(combination);
    }

    private static PockerCombinationTypeEnum computePockerType(List<Pocker> pockers) {
        List<String> values = new ArrayList<>();
        List<PockersTypeEnum> suits = new ArrayList<>();
        List<Integer> weights = new ArrayList<>();

        for (Pocker p : pockers) {
            values.add(p.value.toString());
            suits.add(p.type);
            weights.add(p.weight);
        }

        Set<String> uniqueValues = new HashSet<>(values);
        Collections.sort(weights);

        boolean hasValue = values.contains("A");
        boolean isAAA = values.stream().allMatch("A"::equals);
        boolean isTriplets = uniqueValues.size() == 1;
        boolean isPair = uniqueValues.size() == 2;
        boolean isFlush = new HashSet<>(suits).size() == 1;
        boolean isStraight = hasValue && !values.contains("K") ? values.containsAll(Arrays.asList("2", "3")) :
                weights.get(1) == weights.get(0) + 1 && weights.get(2) == weights.get(1) + 1;
        boolean isStraightFlush = isFlush && isStraight;
        boolean isTwoThreeFive = values.containsAll(Arrays.asList("2", "3", "5"));

        if (isAAA) {
            return PockerCombinationTypeEnum.AAA;
        }
        if (isTriplets) {
            return PockerCombinationTypeEnum.TRIPLETS;
        }
        if (isPair) {
            return PockerCombinationTypeEnum.PAIR;
        }
        if (isStraightFlush) {
            return PockerCombinationTypeEnum.STRAIGHT_FLUSH;
        }
        if (isFlush) {
            return PockerCombinationTypeEnum.FLUSH;
        }
        if (isStraight) {
            return PockerCombinationTypeEnum.STRAIGHT;
        }
        if (isTwoThreeFive) {
            return PockerCombinationTypeEnum.TWO_THREE_FIVE;
        }
        return PockerCombinationTypeEnum.HIGH_CARD;
    }

    private static String compareSameTypePockers(List<Pocker> pockers1, List<Pocker> pockers2, PockerCombinationTypeEnum type) {
        List<Pocker> sortPockers1 = new ArrayList<>(pockers1);
        List<Pocker> sortPockers2 = new ArrayList<>(pockers2);

        sortPockers1.sort(Comparator.comparingInt(p -> -p.weight));
        sortPockers2.sort(Comparator.comparingInt(p -> -p.weight));

        for (int i = 0; i < 3; i++) {
            Pocker p1 = sortPockers1.get(i);
            Pocker p2 = sortPockers2.get(i);
            if (p1.value.compareTo(p2.value) > 0) {
                return "0";
            } else if (p1.value.compareTo(p2.value) < 0) {
                return "1";
            }
        }
        return "谁开牌谁输！";
    }

    public static String compare(List<Pocker> pockers1, List<Pocker> pockers2) {
        PockerCombinationTypeEnum pocker1Type = computePockerType(pockers1);
        PockerCombinationTypeEnum pocker2Type = computePockerType(pockers2);

        System.out.println("卡牌类型：" + pocker1Type + ", " + pocker2Type);

        if (pocker1Type == pocker2Type) {
            return compareSameTypePockers(pockers1, pockers2, pocker1Type);
        } else {
            int pocker1Index = findCombinationRank(pocker1Type);
            int pocker2Index = findCombinationRank(pocker2Type);

            if ((pocker1Type == PockerCombinationTypeEnum.AAA || pocker2Type == PockerCombinationTypeEnum.AAA) &&
                    (pocker1Type == PockerCombinationTypeEnum.TWO_THREE_FIVE || pocker2Type == PockerCombinationTypeEnum.TWO_THREE_FIVE)) {
                return pocker1Type == PockerCombinationTypeEnum.TWO_THREE_FIVE ? "0" : "1";
            } else {
                return pocker1Index < pocker2Index ? "1" : "0";
            }
        }
    }

    public static void main(String[] args) {
        // Example usage:
        List<Pocker> pockers1 = Arrays.asList(
                createPocker(PockerEnum.A, PockersTypeEnum.HONG_TAO),
                createPocker(PockerEnum.K, PockersTypeEnum.HEI_TAO),
                createPocker(PockerEnum.Q, PockersTypeEnum.MEI_HUA)
        );

        List<Pocker> pockers2 = Arrays.asList(
                createPocker(PockerEnum.A, PockersTypeEnum.HEI_TAO),
                createPocker(PockerEnum.Q, PockersTypeEnum.FANG_KUAI),
                createPocker(PockerEnum.K, PockersTypeEnum.HONG_TAO)
        );

        System.out.println(compare(pockers1, pockers2));
    }
}

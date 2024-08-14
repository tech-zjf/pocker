import { BasicComponentProps } from '@/components/interface';
import BACK_IMG from '@/assets/images/pocker-back.png';
import { Space } from 'antd';
import { Fragment } from 'react';
import { PockerCardCenterImageMap, pockerMap } from '@/constants/pocker';
import { PlayerGameStatusEnum } from '../../interface';

interface PockerCardProps extends BasicComponentProps {
    items: {
        number: number;
        flower: number;
    }[];
    isMine: boolean;
    status: PlayerGameStatusEnum;
}

const createPockers = (props: PockerCardProps) => {
    const { items } = props;
    let pokersComList: JSX.Element[] = [];

    if (items.length) {
        const poker = items.map((pt) => {
            return (
                <div style={{ width: 60, height: 90 }} className="relative rounded-lg bg-white shadow ">
                    <h4 className=" text-xl font-semibold absolute left-1 top-1">{pockerMap.get(pt.number)}</h4>
                    <p className=" text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img className="w-4 h-4" src={PockerCardCenterImageMap.get(pt.flower)} alt="" />
                    </p>
                    <h4 className=" text-xl font-semibold absolute right-1 bottom-1">{pockerMap.get(pt.number)}</h4>
                </div>
            );
        });
        pokersComList.push(...poker);
    } else {
        const poker = [null, null, null].map((pt) => {
            return (
                <div style={{ width: 60, height: 90 }} className="relative rounded-lg bg-white shadow ">
                    <img className="w-full h-full" src={BACK_IMG} alt="" />
                </div>
            );
        });
        pokersComList.push(...poker);
    }

    return pokersComList;
};

const PockerCard: React.FC<PockerCardProps> = (props) => {
    const pockers = createPockers(props);

    return (
        <div className="flex item-center justify-center">
            <Space size={10}>
                {pockers.map((pockerItem, index) => {
                    return <Fragment key={index}>{pockerItem}</Fragment>;
                })}
            </Space>
        </div>
    );
};

export default PockerCard;

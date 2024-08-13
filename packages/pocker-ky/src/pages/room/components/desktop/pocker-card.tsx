import { BasicComponentProps } from '@/components/interface';
import BACK_IMG from '@/assets/images/pocker-back.png';
import { Space } from 'antd';
import { Fragment } from 'react';
import { PockerCardCenterImageMap } from '@/constants/pocker';
import { Player } from '@/api/modules/user/interface';

interface PockerCardProps extends BasicComponentProps {
    items: Player['pockers'];
    isMine: boolean;
    status: string;
}

const createPockers = (props: PockerCardProps) => {
    const { items, status } = props;
    let pokersComList: JSX.Element[] = [];

    if (status === '看牌' || status === '弃牌') {
        const poker = items.map((pt) => {
            return (
                <div style={{ width: 80, height: 120 }} className="relative rounded-lg bg-white shadow ">
                    <h4 className=" text-xl font-semibold absolute left-1 top-1">{pt.value}</h4>
                    <p className=" text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img className="w-4 h-4" src={PockerCardCenterImageMap.get(pt.type)} alt="" />
                    </p>
                    <h4 className=" text-xl font-semibold absolute right-1 bottom-1">{pt.value}</h4>
                </div>
            );
        });
        pokersComList.push(...poker);
    } else {
        const poker = [null, null, null].map((pt) => {
            return (
                <div style={{ width: 80, height: 120 }} className="relative rounded-lg bg-white shadow ">
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
        <div className="flex item-center justify-center mt-3">
            <Space size={10}>
                {pockers.map((pockerItem, index) => {
                    return <Fragment key={index}>{pockerItem}</Fragment>;
                })}
            </Space>
        </div>
    );
};

export default PockerCard;

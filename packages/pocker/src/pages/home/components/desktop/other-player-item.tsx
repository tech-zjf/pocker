import { BasicComponentProps } from '@/components/interface';
import { Player } from '../../interface';
import PockerCard from './pocker-card';

interface OtherPlayerItemProps extends BasicComponentProps {
    item: Player;
}

const DesktopOtherPlayerItem: React.FC<OtherPlayerItemProps> = (props) => {
    const { item } = props;
    return (
        <div className=" col-span-1 custom-shadow p-3 flex flex-col ">
            <h2 className=" text-center">{item.name}</h2>
            <div className="flex items-center justify-center mt-4">
                <div>
                    <p className=" text-zjf-new-cyan">{item.status}</p>
                </div>
            </div>
            <div className=" flex-1 flex items-end justify-center">
                <PockerCard items={item.pockers} isMine={false} status={item.status} />
            </div>
        </div>
    );
};

export default DesktopOtherPlayerItem;

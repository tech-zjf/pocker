import { BasicComponentProps } from '@/components/interface';
import { Player } from '../../interface';

interface OtherPlayerItemProps extends BasicComponentProps {
    item: Player;
}

const DesktopOtherPlayerItem: React.FC<OtherPlayerItemProps> = (props) => {
    const { item } = props;
    return (
        <div className=" col-span-1 custom-shadow p-3">
            <h2 className=" text-center">{item.name}</h2>
            <div className="flex items-center justify-center mt-4">
                <div>
                    <p>{item.status}</p>
                </div>
            </div>
        </div>
    );
};

export default DesktopOtherPlayerItem;

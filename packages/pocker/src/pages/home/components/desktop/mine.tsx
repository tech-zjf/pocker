import { BasicComponentProps } from '@/components/interface';
import { Player } from '../../interface';
import { Button, Space } from 'antd';
import PockerCard from './pocker-card';

interface DesktopMineProps extends BasicComponentProps {
    item: Player;
}

const DesktopMine: React.FC<DesktopMineProps> = (props) => {
    const { item } = props;
    return (
        <div className="h-full p-3 custom-shadow flex  flex-col">
            <div className="desktop-mine-head relative">
                {item.status !== '弃牌' && (
                    <div className=" flex items-center justify-center">
                        <Space size={50}>
                            <Button type="primary">跟</Button>
                            <Button type="primary">看牌</Button>
                            <Button type="primary">弃牌</Button>
                            <Button type="primary">开牌</Button>
                        </Space>
                    </div>
                )}
                <div className=" absolute right-10 top-0">
                    <p className=" text-zjf-new-cyan">{item.status}</p>
                </div>
            </div>
            <div className=" flex-1 flex items-end justify-center">
                <PockerCard items={item.pockers} isMine={true} status={item.status} />
            </div>
        </div>
    );
};
export default DesktopMine;

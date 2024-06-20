import { BasicComponentProps } from '@/components/interface';
import { Player } from '../../interface';
import { Button, Space } from 'antd';

interface DesktopMineProps extends BasicComponentProps {
    item: Player;
}

const DesktopMine: React.FC<DesktopMineProps> = (props) => {
    const { item } = props;
    return (
        <div className="h-full p-3 custom-shadow">
            <div className="desktop-mine-head">
                <div className=" flex items-center justify-center">
                    <Space size={50}>
                        <Button type="primary">跟</Button>
                        <Button type="primary">看牌</Button>
                        <Button type="primary">弃牌</Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};
export default DesktopMine;

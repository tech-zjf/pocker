import { Avatar, Button, Space, Spin } from 'antd';

export interface RoomReadingMaskProps {
    onStatusChange: (s: string) => void;
}

const RoomReadingMask: React.FC<RoomReadingMaskProps> = (props) => {
    const { onStatusChange } = props;

    return (
        <div className="fixed bg-white w-full h-full overflow-hidden top-0 left-0 flex items-center justify-center">
            <div className=" flex flex-col " style={{ width: 800 }}>
                <div className=" text-base font-semibold text-zjf-bright-blue mb-40 flex flex-col justify-center items-center">
                    <Spin />
                    <p className="mt-3">等待其他玩家加入...</p>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <h4>已加入玩家：</h4>
                        <span className=" text-sm text-zjf-bright-blue font-semibold">3 / 8</span>
                    </div>
                    <div>
                        {['1', '2', '3'].map((pItem, index) => {
                            return (
                                <div className="flex items-center justify-between mt-4" key={index}>
                                    <div className="flex items-center">
                                        <Avatar size={40} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                                        <h4 className=" text-sm text-gray-900 font-semibold ml-3">antd</h4>
                                    </div>
                                    <div className="flex items-center">
                                        <span className=" text-sm text-zjf-bright-blue ">已准备</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Space direction="horizontal" size={20} className=" flex justify-center mt-40">
                    <Button
                        type="default"
                        onClick={() => {
                            onStatusChange('退出');
                        }}
                    >
                        退出房间
                    </Button>
                    {/* 权限： 房主 */}
                    <Button
                        type="primary"
                        onClick={() => {
                            onStatusChange('开始游戏');
                        }}
                    >
                        开始游戏
                    </Button>
                </Space>
            </div>
        </div>
    );
};
export default RoomReadingMask;

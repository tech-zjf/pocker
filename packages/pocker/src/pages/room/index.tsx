import PockerDesktop from './components/desktop';
import RoomReadingMask from './components/reading';

const Home: React.FC = () => {
    const onStatusChange = (status: string) => {
        console.log(status);
    };

    return (
        <div className="h-full ">
            <PockerDesktop />
            {/* 未开始游戏，准备中状态展示以下蒙层 */}
            <RoomReadingMask onStatusChange={onStatusChange} />
        </div>
    );
};
export default Home;

import PockerDesktop from './components/desktop';
import RoomReadingMask from './components/reading';

const Home: React.FC = () => {
    const onStatusChange = (status: string) => {
        console.log(status);
    };

    return (
        <div className="h-full ">
            <PockerDesktop />
            <RoomReadingMask onStatusChange={onStatusChange} />
        </div>
    );
};
export default Home;

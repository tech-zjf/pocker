import { Player } from '../../interface';
import DesktopMine from './mine';
import DesktopOtherPlayerItem from './other-player-item';

const mock: Player[] = [
    {
        id: 1,
        phone: '1234',
        name: 'Throne丶殇影',
        isMine: true,
        pockers: [
            { type: 1, value: 'A' },
            { type: 1, value: '2' },
            { type: 4, value: '3' }
        ],
        isSpeech: true,
        status: '看牌',
        betting: 66
    },
    {
        id: 2,
        phone: '1234',
        name: '希望之星over',
        isMine: false,
        pockers: [
            { type: 1, value: 'A' },
            { type: 1, value: '2' },
            { type: 4, value: '3' }
        ],
        isSpeech: false,
        status: '未看牌',
        betting: 20
    },
    {
        id: 3,
        phone: '1234',
        name: 'LC畅玩',
        isMine: false,
        pockers: [
            { type: 2, value: 'J' },
            { type: 3, value: 'Q' },
            { type: 3, value: 'K' }
        ],
        isSpeech: false,
        status: '未看牌',
        betting: 20
    },
    {
        id: 4,
        phone: '1234',
        name: 'Throne丶殇夜',
        isMine: false,
        pockers: [
            { type: 1, value: '2' },
            { type: 2, value: '3' },
            { type: 3, value: '4' }
        ],
        isSpeech: false,
        status: '弃牌',
        betting: 20
    },
    {
        id: 5,
        phone: '1234',
        name: '我是怪人',
        isMine: false,
        pockers: [
            { type: 1, value: 'A' },
            { type: 2, value: 'A' },
            { type: 3, value: 'A' }
        ],
        isSpeech: false,
        status: '弃牌',
        betting: 20
    }
];

const PockerDesktop: React.FC = () => {
    const otherPlayers = mock.slice(1, 5);
    const mine = mock[0];
    return (
        <div className="h-full flex  flex-col ">
            <div className={`flex-1 grid  grid-cols-4 gap-x-5`}>
                {otherPlayers.map((item) => {
                    return <DesktopOtherPlayerItem key={item.id} item={item} />;
                })}
            </div>
            <div className="flex-1">中间区域</div>
            <div className="flex-1">
                <DesktopMine item={mine} />
            </div>
        </div>
    );
};
export default PockerDesktop;

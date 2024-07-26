import { Player, PockerEnum } from '../../interface';
import DesktopMine from './mine';
import DesktopOtherPlayerItem from './other-player-item';

const mock: Player[] = [
    {
        id: 1,
        name: 'Throne丶殇影',
        isMine: true,
        pockers: [
            {
                type: 1,
                value: PockerEnum.A,
                weight: 1
            },
            { type: 1, value: PockerEnum.TWO, weight: 1 },
            { type: 4, value: PockerEnum.THREE, weight: 1 }
        ],
        isSpeech: true,
        status: '看牌',
        betting: 66
    },
    {
        id: 2,
        name: '希望之星over',
        isMine: false,
        pockers: [
            {
                type: 1,
                value: PockerEnum.A,
                weight: 1
            },
            { type: 1, value: PockerEnum.TWO, weight: 1 },
            { type: 4, value: PockerEnum.THREE, weight: 1 }
        ],
        isSpeech: false,
        status: '未看牌',
        betting: 20
    },
    {
        id: 3,
        name: 'LC畅玩',
        isMine: false,
        pockers: [
            {
                type: 1,
                value: PockerEnum.A,
                weight: 1
            },
            { type: 1, value: PockerEnum.TWO, weight: 1 },
            { type: 4, value: PockerEnum.THREE, weight: 1 }
        ],
        isSpeech: false,
        status: '未看牌',
        betting: 20
    },
    {
        id: 4,
        name: 'Throne丶殇夜',
        isMine: false,
        pockers: [
            {
                type: 1,
                value: PockerEnum.A,
                weight: 1
            },
            { type: 1, value: PockerEnum.TWO, weight: 1 },
            { type: 4, value: PockerEnum.THREE, weight: 1 }
        ],
        isSpeech: false,
        status: '弃牌',
        betting: 20
    },
    {
        id: 5,
        name: '我是怪人',
        isMine: false,
        pockers: [
            {
                type: 1,
                value: PockerEnum.A,
                weight: 1
            },
            { type: 1, value: PockerEnum.TWO, weight: 1 },
            { type: 4, value: PockerEnum.THREE, weight: 1 }
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

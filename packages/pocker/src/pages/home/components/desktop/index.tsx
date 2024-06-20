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
            { type: '红桃', value: 'A' },
            { type: '黑桃', value: 'A' },
            { type: '方块', value: 'A' }
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
            { type: '红桃', value: 'A' },
            { type: '黑桃', value: 'A' },
            { type: '方块', value: 'A' }
        ],
        isSpeech: false,
        status: '未看牌',
        betting: 20
    },
    {
        id: 1,
        phone: '1234',
        name: 'LC畅玩',
        isMine: false,
        pockers: [
            { type: '红桃', value: 'A' },
            { type: '黑桃', value: 'A' },
            { type: '方块', value: 'A' }
        ],
        isSpeech: false,
        status: '为看牌',
        betting: 20
    },
    {
        id: 1,
        phone: '1234',
        name: 'Throne丶殇夜',
        isMine: false,
        pockers: [
            { type: '红桃', value: 'A' },
            { type: '黑桃', value: 'A' },
            { type: '方块', value: 'A' }
        ],
        isSpeech: false,
        status: '弃牌',
        betting: 20
    }
];

const PockerDesktop: React.FC = () => {
    const otherPlayers = mock.slice(1, 4);
    const mine = mock[0];
    return (
        <div className="h-full flex  flex-col ">
            <div className={`flex-1 grid  grid-cols-${otherPlayers.length} gap-x-5`}>
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

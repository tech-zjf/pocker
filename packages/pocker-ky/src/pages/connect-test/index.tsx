import useSocket from '@/libs/hooks/use-socket';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

const useTest = (s: number) => {
    const [currentS, setCurrentS] = useState(s);
    const [isStart, setIsStart] = useState(false);
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (!isStart) {
            if (timer) {
                clearInterval(timer);
            }
            return;
        }
        timer = setInterval(() => {
            if (currentS === 0) {
                clearInterval(timer as NodeJS.Timeout);
                return;
            }
            setCurrentS(currentS - 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [currentS, isStart]);
    return {
        currentS,
        stop: () => {
            setIsStart(false);
        },
        start: () => {
            setIsStart(true);
        }
    };
};

const ConnectTest: React.FC = () => {
    const { socket } = useSocket();
    const [count, setCount] = useState(1);
    const { currentS, start, stop } = useTest(10);
    return (
        <>
            <p>{currentS}</p>
            <Button
                type="primary"
                key={1}
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                点击
            </Button>
            <Button type="primary" key={2} onClick={start}>
                开始
            </Button>
            <Button type="primary" key={3} onClick={stop}>
                暂停
            </Button>
        </>
    );
};
export default ConnectTest;

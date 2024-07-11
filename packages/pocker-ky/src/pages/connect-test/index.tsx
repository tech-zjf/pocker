import { Button } from 'antd';
import { useState } from 'react';

const ConnectTest: React.FC = () => {
    const [count, setCount] = useState(1);
    return (
        <>
            <Button
                type="primary"
                key={1}
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                点击
            </Button>
        </>
    );
};
export default ConnectTest;

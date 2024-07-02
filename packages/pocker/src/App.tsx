import React, { useEffect, useState } from 'react';
import { Avatar, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken, setUserInfo } from './libs/storage';
import $request from './api';
import { AuthorDetailResponse } from './api/modules/user/interface';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
    const navigate = useNavigate();
    const token = getToken();
    const [playerInfo, setPlayerInfo] = useState<AuthorDetailResponse>();

    /** 获取用户 */
    const fetchPlayer = async () => {
        const player = await $request.user.getUserInfo();
        setUserInfo(player);
        setPlayerInfo(player);
    };

    useEffect(() => {
        if (!token) {
            setUserInfo();
            navigate('/login');
        } else {
            fetchPlayer();
        }
    }, []);

    return (
        <div className=" w-full min-h-full bg-gray-100 pb-5">
            <div className="header-container bg-white flex-shrink-0 flex-grow-0 h-16 custom-shadow overflow-hidden static top-0">
                <div className="header h-full mx-auto  flex items-center justify-between px-5" style={{ width: 1440 }}>
                    <div
                        className=" text-xl text-gray-900 font-bold cursor-pointer"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        POCKER-ROOM
                    </div>
                    <div>
                        <div className=" flex items-center cursor-pointer">
                            <p className=" text-gray-900 text-base font-semibold mr-4"> {playerInfo?.nickname}</p>
                            <Avatar src={playerInfo?.wechatAvatarUrl} size="large" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main mx-auto bg-white  p-5  mt-5 rounded-md" style={{ width: 1440, minHeight: 1000 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default App;

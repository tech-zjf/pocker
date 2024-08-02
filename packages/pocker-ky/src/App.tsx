import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken, setToken, setUserInfo } from './libs/storage';
import $request from './api';
import { AuthorDetailResponse } from './api/modules/user/interface';
import { PoweroffOutlined } from '@ant-design/icons';
import useSocket, { EventPushEnum } from './libs/hooks/use-socket';

const App: React.FC = () => {
    const navigate = useNavigate();
    const token = getToken();
    const [playerInfo, setPlayerInfo] = useState<AuthorDetailResponse>();
    const [showMenu, setShowMenu] = useState(false);
    const { socket } = useSocket();

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

    const logout = () => {
        socket.emit(EventPushEnum.PLAYER_DISCONNECT, { userId: playerInfo?.userId });
        setUserInfo();
        setToken();
        navigate('/login');
    };

    return (
        <div className=" w-full min-h-full bg-gray-100 pb-5">
            <div className="header-container bg-white flex-shrink-0 flex-grow-0 h-16 custom-shadow  static top-0">
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
                        <div
                            className=" flex items-center cursor-pointer relative"
                            onClick={() => {
                                setShowMenu(!showMenu);
                            }}
                        >
                            <p className=" text-gray-900 text-base font-semibold mr-4"> {playerInfo?.username}</p>
                            <Avatar src={playerInfo?.avatar} size="large" />
                            {showMenu && (
                                <div className="absolute top-12 right-0 max-h-40 w-32 p-3 box-border overflow-y-auto rounded shadow-md bg-white z-50">
                                    <div className=" text-base text-gray-900 text-center flex  items-center  justify-center" onClick={logout}>
                                        <PoweroffOutlined className="mr-2" />
                                        <span>退出登录</span>
                                    </div>
                                </div>
                            )}
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

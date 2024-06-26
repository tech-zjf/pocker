import React, { useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from './libs/storage';
import $request from './api';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();
    const route = useNavigate();
    const token = getToken();

    const fetchPlayer = async () => {
        const player = await $request.user.getUserInfo();
        console.log(player);
    };

    useEffect(() => {
        if (!token) {
        } else {
            fetchPlayer();
        }
    }, [token]);

    return (
        <Layout className=" h-full">
            <Header style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '0 20px' }}>
                <h2 className="text-2xl">tech-feng</h2>
            </Header>
            <Layout className="p-5">
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;

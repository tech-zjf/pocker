import $request from '@/api';
import { LoginParams } from '@/api/modules/login/interface';
import { setToken, setUserInfo } from '@/libs/storage';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BasicComponentProps } from '../interface';
import classNames from 'classnames';

interface LoginCardProps extends BasicComponentProps {}

const LoginCard: React.FC<LoginCardProps> = (props) => {
    const { className } = props;
    const navigate = useNavigate();

    const onFinish = async (values: LoginParams) => {
        try {
            const { accessToken } = await $request.login.login(values);
            message.success('登录成功！');
            setToken(accessToken);
            navigate('/');
        } catch (error) {}
    };

    return (
        <div className={classNames('shadow p-5 rounded-md', className)} style={{ width: 300 }}>
            <h2 className=" text-gray-900 text-xl font-semibold  text-center pb-3 mb-5">登录</h2>
            <Form name="basic" labelCol={{ span: 24 }} initialValues={{ username: 'admin', password: '123456' }} style={{ maxWidth: 280 }} onFinish={onFinish} autoComplete="off" layout="vertical">
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default LoginCard;

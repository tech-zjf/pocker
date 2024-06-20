import LoginCard from '@/components/login-card';
import './style.less';

const Login: React.FC = () => {
    return (
        <div className="w-full h-full overflow-hidden login-wrap flex items-center justify-center">
            <LoginCard className=" scale-150" />
        </div>
    );
};
export default Login;

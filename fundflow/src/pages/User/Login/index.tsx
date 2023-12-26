import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormCheckbox,
    ProFormInstance,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, theme } from 'antd';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StyledGoogleIcon, StyledTwitterIcon } from 'components/ThirdPartyIcon';
import { isUserAuthorized, loginWithCredentialAsync } from 'utils/userHelper';
import { useNavigate } from "react-router-dom";

const LoginItem = () => {
    const { token } = theme.useToken();
    return (<>
        <ProFormText
            name="username"
            fieldProps={{
                size: 'large',
                prefix: (
                    <UserOutlined
                        style={{
                            color: token.colorText,
                        }}
                        className={'prefixIcon'}
                    />
                ),
            }}
            placeholder={'Username'}
            rules={[
                {
                    required: true,
                    message: 'Username is required!',
                },
            ]}
        />
        <ProFormText.Password
            name="password"
            fieldProps={{
                size: 'large',
                prefix: (
                    <LockOutlined
                        style={{
                            color: token.colorText,
                        }}
                        className={'prefixIcon'}
                    />
                ),
            }}
            placeholder={'Password'}
            rules={[
                {
                    required: true,
                    message: 'Password is required！',
                },
            ]}
        />
    </>);
}

const Login: React.FC = () => {
    const { token } = theme.useToken();

    const navigate = useNavigate();

    useEffect(() => {
        if (isUserAuthorized()) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const formRef = useRef<
        ProFormInstance<{
            username: string;
            password: string;
            autoLogin: boolean;
        }>
    >();

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
            }}
        >
            <LoginFormPage
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title="FundFlow"
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0,0.75)',
                    backdropFilter: 'blur(4px)',
                }}
                subTitle="Decentralized Crowdfunding Platform"
                activityConfig={{
                    style: {
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                        color: token.colorTextHeading,
                        borderRadius: 8,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(4px)',
                    },
                    title: "What's new in the latest version?",
                    subTitle: 'More powerful features coming soon',
                    action: (
                        <Button
                            size="large"
                            style={{
                                borderRadius: 20,
                                background: token.colorBgElevated,
                                color: token.colorPrimary,
                            }}
                        >
                            Check on our blogs
                        </Button>
                    ),
                }}
                formRef={formRef}
                onFinish={async (values) => {
                    await loginWithCredentialAsync(
                        values.username,
                        values.password,
                        values.autoLogin,
                    );

                    navigate('/dashboard');
                }}
                actions={<OtherLoginMethods />}>

                <Tabs
                    centered
                    activeKey={'login'}
                    items={[{ key: 'login', label: 'Login', children: <LoginItem /> }]}
                />

                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        Remember Me
                    </ProFormCheckbox>
                    <Link
                        style={{
                            float: 'right',
                        }}
                        to={'../user/register'}
                    >
                        Don't have an account?
                    </Link>
                </div>
            </LoginFormPage>
        </div>
    );
};

const OtherLoginMethods: React.FC = () => {
    const { token } = theme.useToken();
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Divider plain>
                <span
                    style={{
                        color: token.colorTextPlaceholder,
                        fontWeight: 'normal',
                        fontSize: 14,
                    }}
                >
                    Other Login Methods
                </span>
            </Divider>
            <Space align="center" size={24}>
                <StyledGoogleIcon />
                <StyledTwitterIcon />
            </Space>
        </div>
    );
}

export default Login;
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCheckbox,
    ProFormInstance,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledGoogleIcon, StyledTwitterIcon } from 'components/ThirdPartyIcon';
import { loginWithCredentialAsync } from 'utils/userHelper';

type LoginType = 'donor' | 'founder';

const Login: React.FC = () => {
    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('donor');

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
                backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title="FundFlow"
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0,0.65)',
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
                    var isLoginSuccess = await loginWithCredentialAsync(
                        values.username,
                        values.password,
                        values.autoLogin,
                    );
                    if (!isLoginSuccess) {
                        message.error('Login failed!');
                        return;
                    }
                    message.success('Login successful!');
                }}
                actions={<OtherLoginMethods />}
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key={'donor'} tab={'Donor Login'} />
                    <Tabs.TabPane key={'founder'} tab={'Founder Login'} />
                </Tabs>

                <>
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
                </>
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

const LoginPage = () => {
    return (
        <ProConfigProvider dark>
            <Login />
        </ProConfigProvider>
    );
};

export default LoginPage;
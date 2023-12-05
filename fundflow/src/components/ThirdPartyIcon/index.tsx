import {
    GoogleOutlined,
    TwitterOutlined,
} from '@ant-design/icons';
import { theme } from 'antd';
import type { CSSProperties } from 'react';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const StyledThirdPartyIcon = (props: {
    icon: React.ReactNode;
}) => {
    const { token } = theme.useToken();
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 40,
                width: 40,
                border: '1px solid ' + token.colorPrimaryBorder,
                borderRadius: '50%',
            }}
        >
            {props.icon}
        </div>
    )
}

const StyledGoogleIcon = () => <StyledThirdPartyIcon icon={<GoogleOutlined style={{ ...iconStyles, color: '#1677FF' }} />} />
const StyledTwitterIcon = () => <StyledThirdPartyIcon icon={<TwitterOutlined style={{ ...iconStyles, color: '#FFFFFF' }} />} />


export {
    StyledGoogleIcon,
    StyledTwitterIcon,
}
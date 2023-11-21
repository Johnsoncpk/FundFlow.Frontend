import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button } from "antd";
import { useState } from "react";

const SamplePage: React.FC = () => {
    const [num, setNum] = useState(40);
    return (
        <PageContainer
            token={{
                paddingInlinePageContainerContent: num,
            }}
            extra={[
                <Button key="3">操作</Button>,
                <Button key="2">操作</Button>,
                <Button
                    key="1"
                    type="primary"
                    onClick={() => {
                        setNum(num > 0 ? 0 : 40);
                    }}
                >
                    主操作
                </Button>,
            ]}
            subTitle="简单的描述"
            footer={[
                <Button key="3">Reset</Button>,
                <Button key="2" type="primary">
                    Submit
                </Button>,
            ]}
        >
            <ProCard
                style={{
                    height: '200vh',
                    minHeight: 800,
                }}
            >

                {
                    // do you stuffs here
                }

            </ProCard>
        </PageContainer>
    );
}

export default SamplePage;
import { PageContainer, ProCard } from "@ant-design/pro-components";

const Dashboard: React.FC = () => {
    return (
        <PageContainer
            subTitle="Summary and Statistic"
        >
            <ProCard
                style={{
                    height: '200vh',
                    minHeight: 800,
                }}
            >

                <div>Hi, Dashboard</div>

            </ProCard>
        </PageContainer>
    );
}

export default Dashboard;
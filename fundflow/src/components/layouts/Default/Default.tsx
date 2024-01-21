import { FC, ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
import { Footer, Header } from 'components/modules';
import Head from 'next/head';

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <>
    <Head>
      <title>{`${pageName} | FundFlow | Decentralized Crowdfunding Platform`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <Container maxW="container.lg" p={3} marginTop={"20px"} as="main" minH="75vh">
      {children}
    </Container>
    <Footer />
  </>
);

export default Default;

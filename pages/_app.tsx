import { ChakraProvider } from '@chakra-ui/react';
import { createClient, WagmiConfig } from 'wagmi';
import { configureChains } from '@wagmi/core';
import {
  polygonMumbai,
  sepolia,
  hardhat,
} from '@wagmi/core/chains';
import { extendTheme } from '@chakra-ui/react';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import "./styles.css";
import { StepsTheme as Steps } from "chakra-ui-steps";

const { provider, webSocketProvider } = configureChains(
  [
    polygonMumbai,
    sepolia,
    hardhat
  ],
  [publicProvider()],
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  components: {
    Steps,
  }
});

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;

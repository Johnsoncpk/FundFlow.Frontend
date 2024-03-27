import { ChakraProvider } from '@chakra-ui/react';
import { WagmiProvider } from 'wagmi';
import { extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import "./styles.css";
import { StepsTheme as Steps } from "chakra-ui-steps";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from "utils/wagmiConfig";
import { createWeb3Modal } from '@web3modal/wagmi/react'

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

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig,
  projectId: process.env.WALLETCONNECT_PROJECT_ID as string,
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
      </WagmiProvider>
  );
};

export default MyApp;

import { Divider, HStack, VStack } from '@chakra-ui/react';
import { Swiper } from 'components/modules/Swiper';
import { useSession } from 'next-auth/react';
import { useNetwork } from 'wagmi';
import RankTable from './RankTable';
import { useEvmWalletNFTs, useEvmRunContractFunction } from '@moralisweb3/next';

const Home = () => {
  const { data } = useSession();
  const { chain } = useNetwork();
  const { data: nfts } = useEvmWalletNFTs({
    address: data?.user?.address ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    chain: chain?.id ?? 1,
  });
  // const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
  //   abi: usdcEthPoolAbi,
  //   contractAddress: usdcEthPoolAddress,
  //   functionName: "observe",
  //   params: {
  //     secondsAgos: [0, 10],
  //   },
  // });

  // return (<div>
  //   {error && <ErrorMessage error={error} />}
  //   <button onClick={() => fetch()} disabled={isFetching}>Fetch data</button>
  //   {data && <pre>
  //     {JSON.stringify(data),
  //       null,
  //       2,
  //       )}
  //   </pre>}
  // </div>)

  return (
    <VStack>
      <Swiper nfts={nfts} />
      <Divider />
      <HStack spacing={8}>
        <RankTable title='Trending in Design & Tech' caption='Projects with weekly highest like❤️' nfts={nfts?.slice(5, 10)} />
        <Divider orientation='vertical' />
        <RankTable title='Trending in Video Games' caption='Projects with weekly highest like❤️' nfts={nfts?.slice(0, 5)} />
      </HStack >


    </VStack >
  );
};

export default Home;

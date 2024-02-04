import { Divider, HStack, VStack } from '@chakra-ui/react';
import { Swiper } from 'components/modules/Swiper';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import { useNetwork } from 'wagmi';
import RankTable from './RankTable';

const Home = () => {
  const { data } = useSession();
  const { chain } = useNetwork();
  const { data: nfts } = useEvmWalletNFTs({
    address: data?.user?.address ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    chain: chain?.id ?? 1,
  });

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

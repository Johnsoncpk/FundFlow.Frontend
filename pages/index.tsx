import { Default } from 'components/layouts/Default';
import { Divider, HStack, VStack } from '@chakra-ui/react';
import { Swiper } from 'components/modules/Swiper';
import RankTable from 'components/templates/home/RankTable';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from 'utils/getContract';
import { GetServerSideProps, NextPage } from 'next';
import { readContract } from '@wagmi/core';
import { wagmiConfig } from 'utils/wagmiConfig';
import { hardhat, sepolia } from 'wagmi/chains'
import { normalizeContractObject } from 'utils/format';

type HomePageProps = {
  projects: readonly {
    name: string;
    url: string;
    totalFundingGoal: bigint;
    totalRound: bigint;
    currentRound: bigint;
    creator: `0x${string}`;
    status: number;
  }[]
}

const HomePage: NextPage<HomePageProps> = (props) => {

  return (
    <Default pageName="Home">
      <VStack>
        <Swiper projects={props.projects} />
        <Divider />
        <HStack spacing={4}>
          <RankTable title='Trending in Design & Tech' caption='Projects with weekly highest like❤️' projects={props.projects?.slice(Math.max(props.projects.length - 5, 0))} />
          <Divider orientation='vertical' />
          <RankTable title='Trending in Video Games' caption='Projects with weekly highest like❤️' projects={props.projects?.slice(0, 5)} />
        </HStack >
      </VStack >
    </Default>
  );
};

export default HomePage;

export const getServerSideProps:
  GetServerSideProps<HomePageProps> = async (_) => {

    let result: readonly { name: string; url: string; totalFundingGoal: bigint; totalRound: bigint; currentRound: bigint; creator: `0x${string}`; status: number; }[] = [];

    try {
      result = await readContract(wagmiConfig,
        {
          chainId: process.env.chain === "sepolia" ? sepolia.id : hardhat.id,
          abi: CONTRACT_ABI,
          address: CONTRACT_ADDRESS,
          functionName: 'getProjects',
        })
    } catch (err) {
      console.log(err)
    }

    return {
      props: {
        projects: normalizeContractObject(result)
      }
    }
  }

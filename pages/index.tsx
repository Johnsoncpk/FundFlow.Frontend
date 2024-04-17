import { Default } from 'components/layouts/Default';
import { Divider, HStack, VStack } from '@chakra-ui/react';
import { Swiper } from 'components/modules/Swiper';
import RankTable from 'components/home/RankTable';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from 'utils/getContract';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Project } from 'utils/types';
import { useReadContract } from 'wagmi';
import { sepolia, hardhat } from 'wagmi/chains';

const HomePage: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const response = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getProjects',
    chainId: process.env.chain === "sepolia" ? sepolia.id : hardhat.id,
  })

  const fetchProjects = async () => {
    const result = response.data?.map((project, index) => {
      return {
        id: index,
        ...project
      }
    })

    if (!result) {
      return
    }

    setProjects(result);
  };

  useEffect(() => { fetchProjects().catch(console.error); }, [response.isFetched]);

  return (
    <Default pageName="Home">
      <VStack>
        <Swiper projects={projects} />
        <Divider />
        <HStack spacing={4}>
          <RankTable title='Trending in Design & Tech' caption='Projects with weekly highest like❤️' projects={projects.slice(0, 5)} />
          <Divider orientation='vertical' />
          <RankTable title='Trending in Video Games' caption='Projects with weekly highest like❤️' projects={projects.slice(0, 5)} />
        </HStack >
      </VStack >
    </Default>
  );
};

export default HomePage;

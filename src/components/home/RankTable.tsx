
import { Text, Image, StatArrow, useColorModeValue, HStack, Stat, StatGroup, StatLabel, StatNumber, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Box, Tooltip, Link } from '@chakra-ui/react';
import { Project, ProjectMetaData } from 'utils/types';
import { useEffect, useState } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { resolveIPFS } from 'utils/resolveIPFS';
import NextLink from 'next/link'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { useReadContract } from 'wagmi';
import { sepolia, hardhat } from 'wagmi/chains';
import { ethers } from 'ethers';
import { ProjectStatus } from '../project/Information/ProjectStatus';

const ProjectRow = (props: {
  project: Project
}) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  const [data, setData] = useState<ProjectMetaData>();

  const { data: rounds } = useReadContract({
    chainId: process.env.chain === "sepolia" ? sepolia.id : hardhat.id,
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getRounds',
    args: [BigInt(props.project.id)]
  })

  useEffect(() => {
    fetch(resolveIPFS(props.project?.url), { cache: 'force-cache' })
      .then((response) => response.json())
      .then((result) => setData(result));
  }, [props.project?.url]);

  return (
    <Tr
      key={`${props.project?.name}-${props.project.id}-tr`}
      _hover={{ bgColor: hoverTrColor }}
      cursor="pointer">
      <Td>
        {props.project.id + 1}
      </Td>
      <Td>
        <Link target="_blank" as={NextLink} href={`/project/${props.project.id}`}>
          <Tooltip label={props.project?.name}>
            <HStack>
              <Box maxW={"100px"} maxHeight="100px" overflow={'hidden'} borderRadius="xl">
                <Image
                  src={data?.image}
                  alt={'project_cover'}
                  minH="100px"
                  minW="100px"
                  objectFit="cover"
                />
              </Box>
              <VStack alignItems={'flex-start'} >
                <Text as={'b'} noOfLines={[1, 2]}>{getEllipsisTxt(props.project?.name, 22)}</Text>
                <Text fontSize={'xs'} as={'span'}>
                  Current Round:
                  <br />
                  <Text as='b'>{(BigInt(props.project.currentRound) + BigInt(1)).toString()}</Text>
                  <br />
                  Current Pool/Goal:
                  <br />
                  <Text mt={'10px'} as='b'>
                    {
                      Number(ethers.utils.formatEther(
                        rounds?.[Number(props.project.currentRound)]?.collectedFund ?? 0
                      )).toFixed(1)
                    }
                    /
                    {
                      Number(ethers.utils.formatEther(
                        rounds?.[Number(props.project.currentRound)]?.fundingGoal ?? 0
                      )).toFixed(1)
                    } ETH
                  </Text>
                </Text>
              </VStack>
            </HStack>
          </Tooltip>
        </Link>
      </Td>
      <Td>
        <StatGroup>
          <Stat>
            <ProjectStatus status={props.project.status} />
            <StatLabel marginTop={'4'}> Funded </StatLabel>
            <StatNumber>
              <StatArrow type='increase' />
              {
                ((
                  Number(ethers.utils.formatEther(rounds?.[Number(props.project.currentRound)]?.collectedFund ?? 0)) /
                  Number(ethers.utils.formatEther(rounds?.[Number(props.project.currentRound)]?.fundingGoal ?? 0))
                ) * 100).toFixed(1)
              }%
            </StatNumber>
          </Stat>
        </StatGroup>
      </Td>
    </Tr>

  );
}


const RankTable = (props: {
  title: string, caption?: string, projects: readonly Project[] | undefined
}) => {

  return (
    <VStack maxW={'50%'}>
      <TableContainer>
        <Text fontWeight={'bold'} my={"1"} fontSize='xl' align={'center'}>{props.title}</Text>
        <Table size={"sm"} variant='simple' maxW={'100%'}>
          {
            props.caption && <TableCaption>{props.caption}</TableCaption>
          }
          <Thead>
            <Tr>
              <Th isNumeric>#</Th>
              <Th>Project</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.projects?.map((project) => (
              <ProjectRow
                key={`${project?.name}-${project.id}-row`}
                project={project} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default RankTable;
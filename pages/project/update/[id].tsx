import { Default } from 'components/layouts/Default';
import { Update } from 'components/project';
import { useAccount } from 'wagmi';
import { Container, Text } from "@chakra-ui/react";
import React from 'react';
import { GetServerSideProps } from 'next';
import { readContract } from '@wagmi/core';
import { wagmiConfig } from 'utils/wagmiConfig';
import { hardhat, sepolia } from 'wagmi/chains'
import { normalizeContractObject } from 'utils/format';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { ProjectMetaData, ProjectProps } from 'utils/types';
import { useRouter } from 'next/router';

const ProjectUpdate: React.FC<ProjectProps> = ({ project, rounds, backers })  => {
    const { address } = useAccount()
    const router = useRouter();

    return (
        <Default pageName="Update Project">
            {
                address === project.creator ?
                <Update project={project} rounds={rounds} backers={backers} projectId={router.query.id as string}/> :
                <Container>
                    <Text align={'center'} fontSize={'5xl'}>Permission Denied</Text>
                    <Text align={'center'}><br />You are not the owner of the project</Text>
                </Container>
            }
        </Default>
    );
};

export default ProjectUpdate;

export const getServerSideProps: GetServerSideProps<ProjectProps> = async (context) => {
    let projectResult: {
        name: string;
        metadata?: ProjectMetaData | null;
        totalFundingGoal: bigint;
        totalRound: bigint;
        currentRound: bigint;
        creator: `0x${string}`;
        status: number;
    } =
    {
        name: "Something went wrong",
        totalFundingGoal: BigInt(0),
        totalRound: BigInt(0),
        currentRound: BigInt(0),
        creator: '0x',
        status: 0
    };

    let roundsResult: readonly {
        id: bigint;
        amountSentToCreator: bigint;
        collectedFund: bigint;
        fundingGoal: bigint;
        endAt: bigint;
    }[] = [];

    try {
        projectResult = await readContract(wagmiConfig,
            {
                chainId: process.env.CHAIN === "sepolia" ? sepolia.id : hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getProject',
                args: [BigInt(context.query.id as string)]
            })

        roundsResult = await readContract(wagmiConfig,
            {
                chainId: process.env.CHAIN === "sepolia" ? sepolia.id : hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getRounds',
                args: [BigInt(context.query.id as string)]
            })
    } catch (err) {
        console.log(err)
    }

    return {
        props: {
            project: normalizeContractObject(projectResult),
            rounds: normalizeContractObject(roundsResult),
            backers: []
        }
    }
}

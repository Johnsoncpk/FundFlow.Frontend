
import { Default } from 'components/layouts/Default';
import Cryptojs from 'crypto-js';
import React from 'react';
import { GetServerSideProps } from 'next';
import { readContract } from '@wagmi/core';
import { wagmiConfig } from 'utils/wagmiConfig';
import { hardhat, sepolia } from 'wagmi/chains'
import { normalizeContractObject } from 'utils/format';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { ProjectMetaData, ProjectProps } from 'components/types';
import { resolveIPFS } from 'utils/resolveIPFS';
import { Basic } from 'components/templates/projects/Information/Basic';
import { Detail } from 'components/templates/projects/Information/Detail';
import { RoundStepper } from 'components/templates/projects/Information/RoundStepper';

const Project: React.FC<ProjectProps> = ({ project, rounds, backers }) => {
    return (
        <Default pageName="Project Details">
            <Basic project={project} rounds={rounds} backers={backers} />
            <RoundStepper project={project} rounds={rounds} backers={backers} variant='circles' />
            <Detail project={project} rounds={rounds} backers={backers} />
        </Default>
    );
};

export default Project;

export const getServerSideProps: GetServerSideProps<ProjectProps> = async (context) => {
    let projectResult: {
        name: string;
        metadata: ProjectMetaData | null;
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
        status: 0,
        metadata: null
    };

    let roundsResult: readonly {
        id: bigint;
        amountSentToCreator: bigint;
        collectedFund: bigint;
        fundingGoal: bigint;
        endAt: bigint;
    }[] = [];

    let backersResult: readonly `0x${string}`[] = [];
    try {
        const project = await readContract(wagmiConfig,
            {
                chainId: process.env.chain === "sepolia" ? sepolia.id : hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getProject',
                args: [BigInt(context.query.id as string)]
            })

        const response = await fetch(resolveIPFS(project.url));
        const data: ProjectMetaData = await response.json();

        projectResult = {
            ...project,
            // may allocate to client side render
            metadata: {
                ...data,
                editorState: Cryptojs.AES.decrypt(data.editorState, process.env.ENCRYPTION_KEY || "default").toString(Cryptojs.enc.Utf8),
            }
        }

        roundsResult = await readContract(wagmiConfig,
            {
                chainId: process.env.chain === "sepolia" ? sepolia.id : hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getRounds',
                args: [BigInt(context.query.id as string)]
            })

        backersResult = await readContract(wagmiConfig,
            {
                chainId: process.env.chain === "sepolia" ? sepolia.id : hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getBackers',
                args: [roundsResult[Number(project.currentRound)].id]
            })
    } catch (err) {
        console.log(err)
    }

    return {
        props: {
            project: normalizeContractObject(projectResult),
            rounds: normalizeContractObject(roundsResult),
            backers: normalizeContractObject(backersResult)
        }
    }
}

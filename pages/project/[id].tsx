
import { Default } from 'components/layouts/Default';
import Cryptojs from 'crypto-js';
import {
    Flex,
    Text,
    Heading,
    Grid,
    GridItem,
    Image,
    Box,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Progress,
    Button,
    IconButton,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react';
import React from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { GetServerSideProps } from 'next';
import { readContract } from '@wagmi/core';
import { Editor } from '@tinymce/tinymce-react';
import { wagmiConfig } from 'utils/wagmiConfig';
import { hardhat, sepolia } from 'wagmi/chains'
import { normalizeContractObject } from 'utils/format';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { ProjectMetaData } from 'components/types';
import { resolveIPFS } from 'utils/resolveIPFS';
import { useColorMode } from '@chakra-ui/react';

type ProjectProps = {
    project: {
        name: string;
        metadata: ProjectMetaData | null
        totalFundingGoal: bigint;
        totalRound: bigint;
        currentRound: bigint;
        creator: `0x${string}`;
        status: number;
    },
    rounds: readonly {
        id: bigint;
        amountSentToCreator: bigint;
        collectedFund: bigint;
        fundingGoal: bigint;
        endAt: bigint;
    }[]
}

const Project: React.FC<ProjectProps> = ({ project, rounds }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Default pageName="Projects">
            <Grid
                templateAreas={`
                  "title title"
                  "image description"
                  "image progressBar"
                  "image amountFunded"
                  "image amountBacker"
                  "image dealineTimer"
                  "image control"
                  "image reminder"`}
                gridTemplateRows={'0.1fr 0.15fr 0.25fr 0.1fr 0.1fr 0.1fr 0.1fr 0.1fr'}
                gridTemplateColumns={'0.6fr 0.4fr'}
                gap='2'
            >
                <GridItem pl='2' area={'image'}>
                    <Box my={'10px'} maxHeight="500px" maxWidth={"700px"} overflow={'hidden'} borderRadius="xl">
                        <Image
                            src={project.metadata?.image}
                            alt={'project cover image'}
                            minW={'380px'}
                            minH={'400px'}
                            objectPosition={'center'}
                            objectFit="cover"
                        />
                    </Box>
                </GridItem>
                <GridItem pl='2' area={'title'}>
                    <Heading>
                        {project?.name}
                        <IconButton
                            mx={"10px"}
                            colorScheme={'teal'}
                            variant='outline'
                            aria-label='Bookmark this project'
                            fontSize='20px'
                            icon={<StarIcon />}
                        />
                    </Heading>
                </GridItem>
                <GridItem pl='2' area={'description'}>
                    <Text noOfLines={[1, 2, 3]}>{(project?.metadata as ProjectMetaData)?.description}</Text>
                </GridItem>

                <GridItem pl='2' area={'progressBar'}>
                    <Progress colorScheme={'teal'} value={Number(rounds[Number(project.currentRound)].collectedFund / rounds[Number(project.currentRound)].fundingGoal)} />
                </GridItem>
                <GridItem pl='2' area={'amountFunded'}>
                    <StatGroup>
                        <Stat>
                            <StatNumber textColor={'teal.400'} >{Number(rounds[Number(project.currentRound)].collectedFund)} ETH</StatNumber>
                            <StatLabel>pledged of {Number(rounds[Number(project.currentRound)].fundingGoal)} ETH goal</StatLabel>
                        </Stat>
                    </StatGroup>
                </GridItem>
                <GridItem pl='2' area={'amountBacker'}>
                    <StatGroup>
                        <Stat>
                            <StatNumber textColor={'teal.400'}>5,384</StatNumber>
                            <StatLabel>backer</StatLabel>
                        </Stat>
                    </StatGroup>
                </GridItem>
                <GridItem pl='2' area={'dealineTimer'}>
                    <StatGroup>
                        <Stat>
                            <StatNumber textColor={'teal.400'}>25</StatNumber>
                            <StatLabel>days to go</StatLabel>
                        </Stat>
                    </StatGroup>
                </GridItem>
                <GridItem pl='2' area={'control'}>
                    <Flex justify="flex-end" flexDir="column" width="100%">
                        <Button colorScheme='teal'>
                            Back this project
                        </Button>
                    </Flex>
                </GridItem>
                <GridItem pl='2' area={'reminder'}>
                    <Flex justify="flex-end" flexDir="column" width="100%">
                        <Text variant={'ghost'} noOfLines={[1, 2]}>All or nothing. This project will only be funded if it reaches its goal by Sun, March 3 2024 7:59 PM AWST.</Text>
                    </Flex>
                </GridItem>
            </Grid>
            <Tabs marginTop={"2vw"}>
                <TabList>
                    <Tab>Campaign</Tab>
                    <Tab>Rewards</Tab>
                    <Tab>Updates</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {
                            colorMode === 'light' &&
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TIMYMCE_API_KEY}
                                initialValue={project.metadata?.editorState}
                                init={{
                                    statusbar: false,
                                    plugins: 'autoresize',
                                    autoresize_bottom_margin: 0,
                                    menubar: false,
                                    toolbar: false,
                                    readonly: true,
                                    skin: 'oxide',
                                    content_css: 'default'
                                }}
                            />
                        }

                        {
                            colorMode !== 'light' &&
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TIMYMCE_API_KEY}
                                initialValue={project.metadata?.editorState}
                                init={{
                                    statusbar: false,
                                    plugins: 'autoresize',
                                    autoresize_bottom_margin: 0,
                                    menubar: false,
                                    toolbar: false,
                                    readonly: true,
                                    skin: 'oxide-dark',
                                    content_css: 'dark'
                                }}
                            />
                        }

                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
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

    try {
        const project = await readContract(wagmiConfig,
            {
                chainId: hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getProject',
                args: [BigInt(context.query.id as string)]
            })

        const response = await fetch(resolveIPFS(project.url));
        const data: ProjectMetaData = await response.json();

        projectResult = {
            ...project,
            metadata: {
                ...data,
                editorState: Cryptojs.AES.decrypt(data.editorState, process.env.ENCRYPTION_KEY || "default").toString(Cryptojs.enc.Utf8),
            }
        }

        roundsResult = await readContract(wagmiConfig,
            {
                chainId: hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getRounds',
                args: [BigInt(context.query.id as string)]
            })

        let result = await readContract(wagmiConfig,
            {
                chainId: hardhat.id,
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: 'getBackers',
                args: [roundsResult[Number(project.currentRound)].id]
            })

        console.log(result)
    } catch (err) {
        console.log(err)
    }

    return {
        props: {
            project: normalizeContractObject(projectResult),
            rounds: normalizeContractObject(roundsResult)
        }
    }
}

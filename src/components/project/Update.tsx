import React, { useEffect, useState } from 'react';
import { Box } from "@chakra-ui/layout";
import { Flex, Text, useToast, Grid, GridItem, Button } from "@chakra-ui/react";
import { Form4 } from "components/project/StepForms";
import { ProjectData, ProjectMetaData, ProjectProps, ProjectRound } from 'utils/types';
import { uploadProjectDataToIpfs } from 'utils/useIpfs';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "utils/getContract";
import { useWaitForTransactionReceipt, useWriteContract, useAccount } from "wagmi";
import Link from 'next/link';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { resolveIPFS } from 'utils/resolveIPFS';
import Cryptojs from 'crypto-js';
import { INIT_VALUE } from 'components/project/StepForms/DefaultWYSIWYGValue';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';

export const Update: React.FC<ProjectProps & { projectId: string }> = ({ project, rounds, projectId }) => {

    const [projectData, setProjectData] = useState<ProjectData>(INIT_VALUE);

    const { open } = useWeb3Modal()

    const {
        data: hash,
        isPending,
        writeContractAsync
    } = useWriteContract()

    const toast = useToast()

    const account = useAccount()

    // status checkign should do in server side
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    useEffect(() => {
        if (isConfirmed) {
            toast({
                title: `Update Project Transaction Confirmed!`,
                description:
                    (<Text>
                        Project Updated!
                        <Text as={'u'}>
                            <br />
                            <Link href={`https://sepolia.etherscan.io/tx/${hash}`}> Check the  Transaction status here!</Link>
                        </Text>
                    </Text>),
                status: "success",
                position: 'top',
                isClosable: true,
            })
        }
    }, [isConfirmed])

    useEffect(() => {
        if (isConfirming) {
            toast({
                title: `Transaction Created!`,
                description:
                    (<Text as="u">
                        <Link href={`https://sepolia.etherscan.io/tx/${hash}`}> Check the  Transaction status here!</Link>
                    </Text>),
                status: "info",
                position: 'top',
                isClosable: true,
            })
        }
    }, [isConfirming])

    useEffect(() => {
        const getMetadata = async () => {
            if (project.url) {
                const response = await fetch(resolveIPFS(project.url));

                const result: ProjectMetaData = await response.json();
                const metadata = {
                    ...result,
                    editorState: Cryptojs.AES.decrypt(result.editorState, process.env.ENCRYPTION_KEY || "default").toString(Cryptojs.enc.Utf8),
                }
                setProjectData({
                    name: project.name,
                    description: metadata.description as string,
                    category: metadata.category as string,
                    image: metadata.image as string,
                    external_url: metadata.external_url as string,
                    totalFundingGoal: project.totalFundingGoal,
                    totalRound: Number(project.totalRound),
                    rounds: rounds.map((round): ProjectRound => {
                        return {
                            fundingGoal: round.fundingGoal,
                            endAt: Number(round.endAt)
                        }
                    }),
                    editorState: metadata.editorState as string
                })
            }
        }

        getMetadata()
    }, [])

    async function submitForm() {
        try {
            if (!account.isConnected) {
                open({ view: 'Connect' })
                return;
            }

            if (!projectData || !projectId) {
                return
            }

            const cid = await uploadProjectDataToIpfs(projectData);
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'setProjectUri',
                args: [
                    BigInt(projectId),
                    `ipfs://${cid}`,
                ],
            })

        } catch (error: any) {
            toast({
                title: `Error: ${error.name}`,
                description: error.shortMessage,
                position: "top",
                status: "error",
                isClosable: true,
            })

            if (error.name === "ConnectorNotConnectedError") {
                open({ view: 'Connect' })
            }
        }
    }

    return (
        <Flex flexDir="column" width="100%">
            <Grid
                sx={{ pl: 4 }}
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(5, 1fr)'>
                <GridItem colSpan={1}>
                    <Button leftIcon={<ArrowBackIcon />}>
                        <Link color='teal' href={`/project/${projectId}`}>Back to Project</Link>
                    </Button>
                </GridItem>
                <GridItem colSpan={3}>
                    <Text align={'center'} fontSize='3xl' marginBottom={'15px'}>🎨 Update Your Project 🛠️</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Button rightIcon={<EditIcon />} fontSize={'lg'} disabled={isPending} size="sm" onClick={
                        (_: React.MouseEvent<HTMLButtonElement>) => {
                            submitForm();
                        }} colorScheme='orange'>
                        Update Project
                    </Button>
                </GridItem>
            </Grid>
            <Box sx={{ p: 4, rounded: "md" }}>
                <Form4 projectData={projectData} setProjectData={setProjectData} isDisabled={true} defaultIndex={[2]} />
            </Box>
        </Flex>
    );
};
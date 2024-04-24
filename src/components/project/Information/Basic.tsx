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
    Link,
    useToast,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    FormControl,
    FormHelperText,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Tooltip,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    HStack,
    StatHelpText
} from '@chakra-ui/react';
import { db } from "config/firebaseConfig"
import React, { useEffect, useState } from 'react';
import { InfoOutlineIcon, StarIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { ProjectMetaData, ProjectProps } from 'utils/types';
import { ethers, utils } from 'ethers';
import { useRouter } from 'next/router';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from 'utils/getContract';
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatDateToString, getTotalCollectedFund } from 'utils/format';
import { Steps, Step } from 'chakra-ui-steps';
import { ProjectStatus } from './ProjectStatus';
import { hardhat, sepolia } from 'wagmi/chains';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { getEmail } from 'utils/firebaseHelper';

const Basic: React.FC<ProjectProps> = ({ project, rounds, backers }) => {
    const toast = useToast()
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
    const [option, setOption] = useState<string>('package1');
    const [amount, setAmount] = useState<string>(getAmount(100));

    const {
        data: hash,
        isPending,
        writeContractAsync
    } = useWriteContract()

    const { open } = useWeb3Modal()
    const { address } = useAccount()

    // status checkign should do in server side
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    function getDayBefore(date: Date): React.ReactNode {
        const today = new Date();
        const Difference_In_Time = date.getTime() - today.getTime();
        const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

        return Difference_In_Days;
    }

    useEffect(() => {
        if (isConfirmed) {
            toast({
                title: `Create Project Transaction Confirmed!`,
                description:
                    (<Text>
                        Transaction Completed! Thank you!
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
                title: `Transaction Created! Please Wait...`,
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

    async function onBackProjectClick() {
        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'fundProject',
                args: [BigInt(router.query.id as string)],
                value: utils.parseEther(amount).toBigInt()
            })

            if(project.metadata?.chatId && address){
                await updateDoc(doc(db, 'rooms', project.metadata.chatId.toString()), {
                    users: arrayUnion(getEmail(address))
                })
            }
            
            await new Promise((resolve) => {setTimeout(resolve, 1000)});

            router.reload();
        } catch (error: any) {
            toast({
                title: `Error: ${error.name}`,
                description: error.shortMessage,
                position: "top",
                status: "error",
                isClosable: true,
            })

            if (error.name === "ConnectorNotConnectedError") {
                onClose();
                open({ view: 'Connect' })
            }
        }
    }

    async function onQuitProjectClick() {
        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'quitProject',
                args: [BigInt(router.query.id as string)]
            })

            if(project.metadata?.chatId && address){
                await updateDoc(doc(db, 'rooms', project.metadata.chatId.toString()), {
                    users: arrayRemove(getEmail(address))
                })
            }

            await new Promise((resolve) => {setTimeout(resolve, 1000)});

            router.reload();
        } catch (error: any) {
            toast({
                title: `Error: ${error.name}`,
                description: error.shortMessage,
                position: "top",
                status: "error",
                isClosable: true,
            })

            if (error.name === "ConnectorNotConnectedError") {
                onClose();
                open({ view: 'Connect' })
            }
        }
    }

    async function onDisableProjectClick() {
        try {
            await writeContractAsync({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'cancelProject',
                args: [BigInt(router.query.id as string)]
            })

            await new Promise((resolve) => {setTimeout(resolve, 1000)});

            router.reload();
        } catch (error: any) {
            toast({
                title: `Error: ${error.name}`,
                description: error.shortMessage,
                position: "top",
                status: "error",
                isClosable: true,
            })

            if (error.name === "ConnectorNotConnectedError") {
                onClose();
                open({ view: 'Connect' })
            }
        }
    }

    function getAmount(div: number): string {
        return utils.formatEther(BigInt(project?.totalFundingGoal) / BigInt(div))
    }

    function isFundingRoundEnded(){
        return rounds[Number(project?.currentRound)]?.endAt < Date.now() / 1000;
    }

    function getActionButton(): React.ReactNode {
        if (project.creator === address) {
            return (
                <Flex gap={2}>
                    <Button colorScheme='teal' isDisabled={isPending || project.status!==0}>
                        <Link colorScheme='teal' href={`/project/update/${router.query.id as string}`}>
                            Update Campaign
                        </Link>
                    </Button>
                    <Button colorScheme='red' onClick={onDisableProjectClick}  isDisabled={Number(project.currentRound) !== 0 || project.status!==0}>
                        Disable Campaign
                    </Button>
                </Flex>
            )
        }

        if (backers.includes(address?.toString() as `0x${string}`)) {
            return (
                <Button colorScheme='green' isDisabled={isPending} onClick={onOpen2}>
                    Check the contribution status
                </Button>
            )
        }

        return (
            <Button colorScheme='teal' isDisabled={(isFundingRoundEnded() || isPending || project.status!==0)} onClick={onOpen} >
                {
                    isFundingRoundEnded() ?
                        "Funding round is over." :
                        "Support this project!"
                }
            </Button>
        )
    }

    function UpdateProjectStatusDialog() {
        const { onClose: onCloseStatus } = useDisclosure()
        const cancelRef = React.useRef<HTMLInputElement | null>(null)

        async function checkProjectStatus() {
            try {
                await writeContractAsync(
                    {
                        abi: CONTRACT_ABI,
                        address: CONTRACT_ADDRESS,
                        functionName: 'updateProjectStatus',
                        args: [BigInt(router.query.id as string)],
                    }
                )
                router.reload()
            } catch (error: any) {
                toast({
                    title: `Error: ${error.name}`,
                    description: error.shortMessage,
                    position: "top",
                    status: "error",
                    isClosable: true,
                })
            }
        }

        return (
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onCloseStatus}
                isOpen={isRoundUpdatekNeeded(Number(project?.currentRound)) && project?.status === 0 && project?.creator === address}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Check Project Status</AlertDialogHeader>
                    <AlertDialogBody>
                        The deadline of the project has passed. Please click the button below to update the project status
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button variant={'outline'} onClick={checkProjectStatus} ml={3}>
                            Check the Project Status
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    function isRoundUpdatekNeeded(currentRound: number) {
        return rounds[currentRound]?.endAt < Date.now() / 1000
    }

    function getContributionByRound(id: bigint): number {
        const { data } = useReadContract({
            chainId: process.env.CHAIN === "sepolia" ? sepolia.id : hardhat.id,
            abi: CONTRACT_ABI,
            address: CONTRACT_ADDRESS,
            functionName: 'roundBackerContributions',
            args: [BigInt(id), address as `0x${string}`],
        })

        return Number(utils.formatEther(data ?? 0))
    }

    function getTotalContributedFund(r: readonly { id: bigint; amountSentToCreator: bigint; collectedFund: bigint; fundingGoal: bigint; endAt: bigint; }[]): number {
        return r.reduce<number>((n, { id }) => n + getContributionByRound(id), 0);
    }

    return (
        <div>
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
                gap='1'
                pb={4} marginBottom={'10px'}
            >
                <GridItem pl='2' area={'image'}>
                    <Box
                        display={'block'}
                        position={'relative'}
                        height={'100%'}
                        borderRadius="xl">
                        <Image
                            src={project.metadata?.image}
                            alt={'project cover image'}
                            maxHeight="100%"
                            maxWidth="100%"
                            margin={'0 auto'}
                            width={'auto'}
                            display={'block'}
                            borderRadius={'base'}
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
                    <ProjectStatus status={project?.status} />
                </GridItem>
                <Tooltip hasArrow label={project?.metadata?.description} padding={'10px'}>
                    <GridItem pl='2' area={'description'}>
                        <Text noOfLines={[1, 2, 3]}>{(project?.metadata as ProjectMetaData)?.description}</Text>
                    </GridItem>
                </Tooltip>
                <GridItem pl='2' area={'progressBar'}>
                    <Progress colorScheme={'teal'} value={Number(rounds[Number(project.currentRound)].collectedFund / rounds[Number(project.currentRound)].fundingGoal) * 100} />
                </GridItem>
                <GridItem pl='2' area={'amountFunded'}>
                    <StatGroup>
                        <Stat>
                            <StatNumber textColor={'teal.400'} >{Number(ethers.utils.formatEther(rounds[Number(project.currentRound)].collectedFund)).toFixed(3)} ETH</StatNumber>
                            <Tooltip label={<Text>It will show the funding information of the current round of the project only.<br /> if you want to see more rounds, please check the <Text as={'u'}>Round Status</Text> section below.</Text>} >
                                <StatLabel>pledged of {ethers.utils.formatEther(rounds[Number(project.currentRound)].fundingGoal)} ETH goal ( Round <Text as={'u'}> {Number(project.currentRound) + 1}</Text> ) <InfoOutlineIcon /> </StatLabel>
                            </Tooltip>
                        </Stat>
                    </StatGroup>
                </GridItem>
                <GridItem pl='2' area={'amountBacker'}>
                    <StatGroup>
                        <Stat>
                            <StatNumber textColor={'teal.400'}>{backers.length}</StatNumber>
                            <StatLabel>backer</StatLabel>
                        </Stat>
                    </StatGroup>
                </GridItem>
                <GridItem pl='2' area={'dealineTimer'}>
                    <StatGroup>
                        <Stat>
                            <StatNumber textColor={'teal.400'}>{getDayBefore(new Date(Number(rounds[Number(project.currentRound)].endAt) * 1000))}</StatNumber>
                            <StatLabel>days to go</StatLabel>
                        </Stat>
                    </StatGroup>
                </GridItem>
                <GridItem pl='2' area={'control'}>
                    <Flex justify="flex-end" flexDir="column" width="100%">
                        {getActionButton()}
                    </Flex>
                </GridItem>
                <GridItem pl='2' area={'reminder'}>
                    <Flex justify="flex-end" flexDir="column" width="100%">
                        <Text variant={'ghost'} noOfLines={[1, 2]}>All or nothing. This project will only be funded if it reaches its goal by {formatDateToString(rounds[Number(project.currentRound)].endAt)}</Text>
                    </Flex>
                </GridItem>
            </Grid>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>What package do you want to support?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl as='fieldset'>
                            <RadioGroup
                                defaultValue={'package1'}
                                m={'2'}
                                alignItems={'left'}
                                value={option}
                                onChange={(value: string) => {
                                    setOption(value)
                                    switch (value) {
                                        case 'package1':
                                            setAmount(getAmount(100))
                                            break;
                                        case 'package2':
                                            setAmount(getAmount(50))
                                            break;
                                        case 'custom':
                                            setAmount(amount)
                                            break;
                                    }
                                }}>
                                <Radio value='package1' my={'2'}>
                                    Package 1 (<Text as={'u'}>{getAmount(100)} ETH</Text>) : <Text as={'b'}>Product x 1 + Souvenir</Text>
                                </Radio>
                                <Radio value={'package2'} my={'2'}>
                                    Package 2 (<Text as={'u'}>{getAmount(50)} ETH</Text>) : <Text as={'b'}>Product x 2 + Souvenir</Text>
                                </Radio>
                                <Radio value='custom' my={'2'}>
                                    Package 3 (<Text as={'u'}>Custom</Text>) : <Text as={'b'}>Product x 2 + Souvenir</Text>
                                </Radio>
                                <NumberInput size={'sm'} maxW={32}
                                    onChange={(value: string) => {
                                        setAmount(value)
                                    }} value={amount} min={Number(getAmount(50))}>
                                    <NumberInputField disabled={option !== 'custom'} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </RadioGroup>
                            <FormHelperText>Different Package have different reward!</FormHelperText>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' disabled={isPending} onClick={onBackProjectClick} >
                            Back this project
                        </Button>
                        <Button ml={'2'} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal size={'lg'} isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>The summary of your support</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w='100%' marginX={"10px"} >
                            <Text marginBottom={'4px'} fontSize='2xl'><Text as={'u'}>Summary Status</Text>
                                {
                                    isFundingRoundEnded() ?
                                        <Tooltip label='The funding was ended, wait the creator to update the state.'>
                                            <WarningTwoIcon color='red.500' />
                                        </Tooltip> :
                                        <></>
                                }
                            </Text>
                            <HStack >
                                <StatGroup marginRight={"10px"}>
                                    <Stat>
                                        <StatLabel>Total</StatLabel>
                                        <StatNumber>{(getTotalContributedFund(rounds) / getTotalCollectedFund(rounds)).toFixed(3)}%</StatNumber>
                                        <StatHelpText>
                                            {getTotalContributedFund(rounds)} ETH
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
                                <Steps mt={"10px"} colorScheme={'teal'} color={'teal.500'} size={'md'} variant={'circles-alt'} activeStep={Number(project.currentRound)} orientation={'vertical'}>
                                    {rounds?.map(({ id, endAt }, index) => (
                                        <Step
                                            description={`${formatDateToString(endAt)}`}
                                            label={<Text>{getContributionByRound(id).toFixed(2)} ETH</Text>}
                                            key={index}
                                        />
                                    ))}
                                </Steps>
                            </HStack>
                        </Box>

                    </ModalBody>
                    <ModalFooter>
                        <Tooltip label='Quit project mean your fund in all rounds will be withdraw.'>
                            <Button colorScheme='red' isDisabled={isPending || isFundingRoundEnded()} onClick={onQuitProjectClick} >
                                Quit the project
                            </Button>
                        </Tooltip>
                        <Button ml={'2'} onClick={onClose2}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <UpdateProjectStatusDialog />
        </div >
    )
}

export { Basic }
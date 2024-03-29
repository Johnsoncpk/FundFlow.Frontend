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
import { useEffect, useState } from 'react';
import { EvmNft } from 'moralis/common-evm-utils';
import { resolveIPFS } from 'utils/resolveIPFS';
import { StarIcon } from '@chakra-ui/icons';
import { Campaign } from './ProjectTabs';

type ProjectMetaData = {
    name: string,
    description: string,
    animation_url?: string,
    image?: string,
}

const Project = () => {
    const [project, setProject] = useState<EvmNft | undefined>();

    const fetchProject = async () => {
        setProject(undefined);
    };

    useEffect(() => { fetchProject().catch(console.error); }, []);

    return (
        <div>
            <Grid
                templateAreas={`
                  "image title"
                  "image description"
                  "image progressBar"
                  "image amountFunded"
                  "image amountBacker"
                  "image dealineTimer"
                  "image control"
                  "image reminder"`}
                gridTemplateRows={'0.1fr 0.15fr 0.25fr 0.1fr 0.1fr 0.1fr 0.1fr 0.1fr'}
                gridTemplateColumns={'0.4fr 0.6fr'}
                gap='1'
            >
                <GridItem pl='2' area={'image'}>
                    <Box my={'10px'} maxHeight="400px" maxWidth={"400px"} overflow={'hidden'} borderRadius="xl">
                        <Image
                            src={resolveIPFS((project?.metadata as ProjectMetaData)?.image)}
                            alt={'nft'}
                            minW={'370px'}
                            minH={'370px'}
                            objectPosition={'center'}
                            objectFit="cover"
                        />
                    </Box>
                </GridItem>
                <GridItem pl='2' area={'title'}>
                    <Heading noOfLines={1}>
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
                    <Progress colorScheme={'teal'} value={100} />
                </GridItem>
                <GridItem pl='2' area={'amountFunded'}>
                    <StatGroup>
                        <Stat>
                            <StatNumber textColor={'teal.400'} >HK$ 14,772,478</StatNumber>
                            <StatLabel>pledged of HK$ 422,301 goal</StatLabel>
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
                        <Campaign />
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default Project;
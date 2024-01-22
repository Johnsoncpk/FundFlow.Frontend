import {
    VStack,
    Box,
    Divider,
    Grid,
    HStack,
    GridItem,
    Wrap,
    WrapItem,
    Center,
} from '@chakra-ui/react';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useNetwork } from 'wagmi';
import { SearchSection } from './SearchSection';
import { ProjectCard } from 'components/modules';

const Projects = () => {
    const { data } = useSession();
    const { chain } = useNetwork();
    const { data: nfts } = useEvmWalletNFTs({
        address: data?.user?.address,
        chain: chain?.id,
    });

    useEffect(() => console.log('nfts: ', nfts), [nfts]);

    return (
        <div>
            <VStack spacing={8}>
                <SearchSection />
                <Divider />
                <HStack>
                    <Wrap spacing='20px'>
                        {nfts?.map((nft, key) => (
                            <WrapItem>
                                <Center>
                                    <ProjectCard nft={nft} key={key} />
                                </Center>
                            </WrapItem>
                        ))}
                    </Wrap>

                </HStack>
            </VStack>

        </div>
    );
};

export default Projects;

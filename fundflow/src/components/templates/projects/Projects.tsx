import {
    VStack,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    Center,
} from '@chakra-ui/react';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import { SearchSection, ProjectFilterParams } from './SearchSection';
import { ProjectCard } from 'components/modules';

const Projects = () => {
    const { data } = useSession();
    const { chain } = useNetwork();
    const { data: nfts } = useEvmWalletNFTs({
        address: data?.user?.address,
        chain: chain?.id,
    });
    const [filterParams, setFilterParams] = useState({} as ProjectFilterParams);


    useEffect(() => console.log('nfts: ', nfts), [nfts]);

    return (
        <div>
            <VStack spacing={8}>
                <SearchSection FilterParams={filterParams} SetFilterParams={setFilterParams} />
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

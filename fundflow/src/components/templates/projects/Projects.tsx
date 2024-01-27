import {
    VStack,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SearchSection, ProjectFilterParams } from './SearchSection';
import { ProjectCard } from 'components/modules';
import { EvmNft } from 'moralis/common-evm-utils';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import { useNetwork } from 'wagmi';

const Projects = () => {
    const { data } = useSession();
    const { chain } = useNetwork();
    const { fetch } = useEvmWalletNFTs();
    const [filterParams, setFilterParams] = useState({} as ProjectFilterParams);
    const [nftBalance, setNftBalance] = useState<EvmNft[] | undefined>();

    const fetchNftBalance = async () => {
        const response = await fetch({ address: data?.user?.address, chain: chain?.id });
        if (response?.data) {
            setNftBalance(response.data);
        }
    };

    useEffect(() => { fetchNftBalance().catch(console.error); }, [nftBalance, filterParams]);

    return (
        <div>
            <VStack spacing={8}>
                <SearchSection filterParams={filterParams} setFilterParams={setFilterParams} />
                <Divider />
                <HStack>
                    <Wrap spacing='20px'>
                        {nftBalance?.map((nft, key) => (
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
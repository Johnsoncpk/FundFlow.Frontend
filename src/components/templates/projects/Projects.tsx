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
        const response = await fetch({ address: data?.user?.address ?? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", chain: chain?.id ?? 1 });
        if (response) {
            setNftBalance(response.data.slice(0, Math.random() * 10));
        }
    };

    useEffect(() => { fetchNftBalance().catch(console.error); }, [filterParams]);

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
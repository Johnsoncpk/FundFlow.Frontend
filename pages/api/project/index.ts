import type { NextApiRequest, NextApiResponse } from 'next'
import { EvmChain, EvmNft } from 'moralis/common-evm-utils';
import { CONTRACT_ADDRESS } from 'utils/getAddress';
import Moralis from 'moralis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EvmNft[]>
) {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }

  const projects = await Moralis.EvmApi.nft.getContractNFTs({
    address: CONTRACT_ADDRESS,
    chain: EvmChain.SEPOLIA,
    limit: 20,
  });

  const data = projects.result;
  res.status(200).json(data)
}
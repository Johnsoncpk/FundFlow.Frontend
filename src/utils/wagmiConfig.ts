import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { headers } from 'next/headers'

import { cookieStorage, createStorage } from 'wagmi'
import { polygonMumbai, hardhat, sepolia } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Fundflow',
  description: 'Decentralized Crowdfunding Platform',
  url: "https://www.fund-flow.vercel.com", // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [polygonMumbai, hardhat, sepolia] as const
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
})
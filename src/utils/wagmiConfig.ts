import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createStorage, cookieStorage } from 'wagmi'
import { polygonMumbai, hardhat, sepolia } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.WALLETCONNECT_PROJECT_ID

if (!projectId) { throw new Error('Project ID is not defined') }

const metadata = {
  name: 'Fundflow',
  description: 'Decentralized Crowdfunding Platform',
  // origin must match your domain & subdomain
  url: "https://www.fund-flow.vercel.com",
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [polygonMumbai, hardhat, sepolia] as const
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})
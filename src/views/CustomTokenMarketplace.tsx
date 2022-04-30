import { useRef } from 'react'
import { CandyShop } from '@liqnft/candy-shop-sdk'
import { Orders, Stat } from '@liqnft/candy-shop'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Cluster } from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styled from 'styled-components'

const CANDY_SHOP_CREATOR_ADDRESS = new PublicKey(process.env.REACT_APP_CANDY_SHOP_CREATOR_ADDRESS!)
const CANDY_SHOP_TREASURY_MINT = new PublicKey(process.env.REACT_APP_CANDY_SHOP_TREASURY_MINT!)
const CANDY_SHOP_PROGRAM_ID = new PublicKey(process.env.REACT_APP_CANDY_SHOP_PROGRAM_ID!)
const NETWORK = process.env.REACT_APP_SOLANA_NETWORK! as Cluster

const DesContainer = styled.div`
  width: 100%;
  .candy-filter {
    color: #fff;
  }
`

const CustomTokenMarketplace: React.FC = () => {
  const wallet = useAnchorWallet();

  const candyShopRef = useRef<CandyShop>(
    new CandyShop(
      CANDY_SHOP_CREATOR_ADDRESS,
      CANDY_SHOP_TREASURY_MINT,
      CANDY_SHOP_PROGRAM_ID,
      NETWORK,
      // pass additional settings param to configure shop display
      {
        currencySymbol: 'BBX',
        currencyDecimals: 9,
        priceDecimals: 3,
        volumeDecimals: 1
      }
    )
  )

  return (
    <DesContainer>
      <Stat
        candyShop={candyShopRef.current}
        title={'BlockHead$ Marketplace - Closed Alpha'}
        description={'Limited edition merch, pre-mint perks, raffles and more'}
        style={{ paddingBottom: 50 }}
      />
      <Orders
        wallet={wallet}
        candyShop={candyShopRef.current}
        walletConnectComponent={<WalletMultiButton />}
        // configure filter by collection
        filters={[
          {name: '1/1', identifier: -280213123 },
          {name: 'ART', identifier: -280213123 },
          {name: 'RAFFLES', identifier: -38328789 },
          {name: 'MORE', identifier: -4546556 },
        ]}
      />
    </DesContainer>
  )
}

export default CustomTokenMarketplace

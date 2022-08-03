import { GET_ACTIVE_ITEMS } from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import { useMoralis } from 'react-moralis'
import NFT from '../components/NFT/NFT'
import NFTList from '../components/NFT/NFTList'
import LoadingSpinner from "../components/Other/LoadingSpinner"
import React from 'react'

export default function Home() {
  const { isWeb3Enabled } = useMoralis()

  const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS)

  const listedNfts = data?.activeItems.map(nft => {
    const { price, nftAddress, tokenId, seller, id } = nft
    return (
      <NFT
        key={id}
        price={price}
        nftAddress={nftAddress}
        tokenId={tokenId}
        seller={seller}
      />
    )
  })

  return (
    <React.Fragment>
      <h1 style={{ margin: '2.3%' }}>Recently Listed</h1>
      {isWeb3Enabled && <NFTList>{listedNfts}</NFTList>}
      {isWeb3Enabled && loading && <LoadingSpinner />}
      {!isWeb3Enabled && <p>You must connect your web3 wallet to use this app.</p>}
    </React.Fragment>
  )
}

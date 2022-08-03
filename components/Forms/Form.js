import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from '../../constants/NftMarketplaceAbi.json'
import basicNftAbi from '../../constants/BasicNftAbi.json'
import contractAddresses from '../../constants/networkMapping.json'
import React from 'react'
import { useNotification } from '@web3uikit/core'
import classes from './Form.module.css'
import { ethers } from 'ethers'

export default function Form() {
    const nftAddress = React.useRef()
    const tokenId = React.useRef()
    const price = React.useRef()

    const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()

    async function handleSuccessApproval() {
        // List NFT
        function handleSuccess() {
            dispatch({
                type: 'success',
                message: 'Item listed successfully!',
                title: 'Item Listed',
                position: 'topR'
            })
        }

        const listParams = {
            abi: nftMarketplaceAbi,
            contractAddress: contractAddresses.NftMarketplace,
            functionName: 'listItem',
            params: {
                nftAddress: nftAddress.current.value,
                tokenId: tokenId.current.value,
                price: ethers.utils.parseEther(price.current.value)
            }
        }

        await runContractFunction({
            params: listParams,
            onSuccess: () => handleSuccess(),
            onError: () => handleError()
        })
    }

    function handleError(error) {
        dispatch({
            type: 'error',
            message: `There was a problem ${error}`,
            title: 'Error',
            position: 'topR'
        })
        console.error(error)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const approveParams = {
            abi: basicNftAbi,
            contractAddress: contractAddresses.BasicNft,
            functionName: 'approve',
            params: {
                to: contractAddresses.NftMarketplace,
                tokenId: tokenId.current.value
            }
        }

        // Approve NFT 
        await runContractFunction({
            params: approveParams,
            onSuccess: () => handleSuccessApproval(),
            onError: (error) => handleError(error.message)
        })
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <input type="text" placeholder="NFT Address" ref={nftAddress} />
            <input type="text" placeholder="NFT Token ID" ref={tokenId} />
            <input type="text" placeholder="Price (ETH)" ref={price} />
            <button>Submit!</button>
        </form>
    )
}
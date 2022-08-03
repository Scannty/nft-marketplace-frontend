import classes from './UpdateForm.module.css'
import React from 'react'
import { ethers } from 'ethers'
import { useWeb3Contract } from 'react-moralis'
import { useNotification } from '@web3uikit/core'
import nftMarketplaceAbi from '../../constants/NftMarketplaceAbi.json'
import contractAddresses from '../../constants/networkMapping.json'

export default function UpdateForm(props) {
    const newPriceRef = React.useRef()
    const { runContractFunction } = useWeb3Contract()
    const dispatch = useNotification()

    function handleSuccess(cancel = false) {
        dispatch({
            type: 'success',
            message: cancel ? 'Item listing canceled successfully!' : 'Item price updated successfully!',
            title: cancel ? 'Item Canceled' : 'Item Price Updated',
            position: 'topR'
        })
    }

    function handleError(error, cancel = false) {
        console.log(error)
        dispatch({
            type: 'error',
            message: cancel
                ? 'There was a problem with canceling the listing.'
                : 'There was a problem with updating the price.',
            title: 'Error',
            position: 'topR'
        })
    }

    async function handleCancelListing() {
        const cancelParams = {
            abi: nftMarketplaceAbi,
            contractAddress: contractAddresses.NftMarketplace,
            functionName: 'cancelListing',
            params: {
                nftAddress: contractAddresses.BasicNft,
                tokenId: props.tokenId
            }
        }

        await runContractFunction({
            params: cancelParams,
            onSuccess: () => handleSuccess(true),
            onError: (error) => handleError(error.message, true)
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const updateParams = {
            abi: nftMarketplaceAbi,
            contractAddress: contractAddresses.NftMarketplace,
            functionName: 'updateListing',
            params: {
                nftAddress: contractAddresses.BasicNft,
                tokenId: props.tokenId,
                newPrice: ethers.utils.parseEther(newPriceRef.current.value, 'ether')
            }
        }

        await runContractFunction({
            params: updateParams,
            onSuccess: () => handleSuccess(),
            onError: (error) => handleError(error.message)
        })
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <label htmlFor="updateListing">Update Listing With New Price (ETH)</label>
            <input
                type="text"
                name="updateListing"
                placeholder='New Listing Price (ETH)'
                ref={newPriceRef}
            />
            <div className={classes.or}>or</div>
            <button
                type='button'
                className={classes.cancelButton}
                onClick={handleCancelListing}
            >
                Cancel Listing
            </button>
            <div className={classes.border} />
            <hr className={classes.breakLine} />
            < div className={classes.footer}>
                <button
                    type='button'
                    className={classes.closeButton}
                    onClick={() => props.setShowModal(false)}
                >
                    Close
                </button>
                <button type='submit' className={classes.submitButton}>Save New Price</button>
            </div>
        </form>

    )
}
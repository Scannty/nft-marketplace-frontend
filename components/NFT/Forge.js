import Image from 'next/image'
import forgeIcon from '../../images/blacksmith.png'
import classes from './Forge.module.css'

import basicNftAbi from '../../constants/BasicNftAbi.json'
import contractAddresses from '../../constants/networkMapping.json'

import { useWeb3Contract } from 'react-moralis'
import { useNotification } from '@web3uikit/core'

export default function Forge() {
    const dispatch = useNotification()

    const { runContractFunction: mintNft } = useWeb3Contract({
        abi: basicNftAbi,
        contractAddress: contractAddresses.BasicNft,
        functionName: 'mintNft'
    })

    function handleSuccess() {
        dispatch({
            type: 'success',
            message: 'NFT minted successfully!',
            title: 'NFT Minted',
            position: 'topR'
        })
    }

    function handleError(error) {
        console.log(error)
        dispatch({
            type: 'error',
            message: 'Failed to mint an NFT',
            title: 'Error Minting',
            position: 'topR'
        })
    }

    async function handleForge() {
        console.log('Minting an NFT...')
        await mintNft({
            onSuccess: () => handleSuccess(),
            onError: (error) => handleError(error.message)
        })
    }

    return (
        <div className={classes.forgery}>
            <h2>NFT Forgery</h2>
            <Image
                src={forgeIcon}
                alt="Forge icon"
            />
            <button
                className={classes['forge--button']}
                onClick={handleForge}
            >
                Mint a test NFT</button>
        </div>
    )
}
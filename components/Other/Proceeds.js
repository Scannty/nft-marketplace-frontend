import nftMarketplaceAbi from '../../constants/NftMarketplaceAbi.json'
import contractAddresses from '../../constants/networkMapping.json'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { useNotification } from '@web3uikit/core'
import React from 'react'
import { ethers } from 'ethers'
import classes from './Proceeds.module.css'

export default function Proceeds() {
    const { account, isWeb3Enabled } = useMoralis()
    const dispatch = useNotification()

    const { runContractFunction: withdrawProceeds } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: contractAddresses.NftMarketplace,
        functionName: 'withdrawProceeds'
    })

    const { runContractFunction: getProceeds } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: contractAddresses.NftMarketplace,
        functionName: 'getProceeds',
        params: {
            seller: account
        }
    })

    function handleSuccess() {
        dispatch({
            type: 'success',
            message: 'Proceeds withdrawn successfully!',
            title: 'Proceeds Withdrawn',
            position: 'topR'
        })
    }

    function handleError(error) {
        console.log(error)
        dispatch({
            type: 'error',
            message: 'There was a problem with withdrawing proceeds!',
            title: 'Error',
            position: 'topR'
        })
    }

    async function handleWithdraw() {
        await withdrawProceeds({
            onSuccess: () => handleSuccess(),
            onError: (error) => handleError(error.message)
        })
    }

    const [proceeds, setProceeds] = React.useState(0)

    React.useEffect(() => {
        (async () => {
            let contractProceeds
            if (isWeb3Enabled) {
                contractProceeds = await getProceeds({
                    onError: (error) => console.error(error.message, ':(')
                })
            }
            setProceeds(contractProceeds ? ethers.utils.formatEther(contractProceeds, 'ether') : 0)
        })()
    }, [isWeb3Enabled, setProceeds])

    return (
        <div className={classes.withdraw}>
            <h2 style={{ fontWeight: '400' }}>Withdraw {proceeds} proceeds!</h2>
            {proceeds > 0 && <button className={classes.withdrawButton} onClick={handleWithdraw}>Withdraw Proceeds</button>}
            {proceeds == 0 && <p>No proceeds available!</p>}
        </div >
    )
}
import classes from './NFT.module.css'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { useNotification } from '@web3uikit/core'
import basicNftAbi from '../../constants/BasicNftAbi.json'
import nftMarketplaceAbi from '../../constants/NftMarketplaceAbi.json'
import contractAddresses from '../../constants/networkMapping.json'
import React from 'react'
import { ethers } from 'ethers'
import { Eth } from '@web3uikit/icons'
import Hover from '../Layout/Hover'
import Modal from '../Layout/Modal'

export default function NFT(props) {
    const { account } = useMoralis()
    const dispatch = useNotification()

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: basicNftAbi,
        contractAddress: contractAddresses.BasicNft,
        functionName: 'tokenURI',
        params: {
            tokenId: props.tokenId
        }
    })

    const { runContractFunction: buyNft } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: contractAddresses.NftMarketplace,
        functionName: 'buyItem',
        params: {
            nftAddress: props.nftAddress,
            tokenId: props.tokenId,
        },
        msgValue: props.price
    })

    const [image, setImage] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [isHovering, setIsHovering] = React.useState(false)
    const [showModal, setShowModal] = React.useState(false)

    async function updateUI() {
        const tokenURI = await getTokenURI()
        const requestURL = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
        const data = await fetch(requestURL)
        const nftMetadata = await data.json()
        setImage(nftMetadata.image)
        setName(nftMetadata.name)
        setDescription(nftMetadata.description)
    }

    function truncString(str) {
        const firstPart = str.slice(0, 6)
        const secondPart = str.slice(-4)
        return firstPart + '...' + secondPart
    }

    function handeMouseEnter() {
        setIsHovering(true)
    }

    function handleMouseLeave() {
        setIsHovering(false)
    }

    function handleSuccess() {
        dispatch({
            type: 'success',
            message: 'Item bought successfully!',
            title: 'Item Bought',
            position: 'topR'
        })
    }

    function handleError(error) {
        console.log(error)
        dispatch({
            type: 'error',
            message: 'There was a problem with buying the item!',
            title: 'Error',
            position: 'topR'
        })
    }

    async function handleClick(event) {
        if (account == props.seller) {
            setShowModal(true)
        } else {
            await buyNft({
                onSuccess: () => handleSuccess(),
                onError: (error) => handleError(error.message)
            })
        }
    }

    React.useEffect(() => { updateUI() }, [])

    return (
        <React.Fragment>
            <div
                className={classes.nft}
                onMouseEnter={handeMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <div>#{props.tokenId}</div>
                <div>
                    Owned by {account == props.seller ? 'you' : truncString(props.seller)}
                </div>
                {image && <img src={image} alt='nft' className={classes.nftImg} />}
                <div className={classes.nftInfo}>
                    <h2>{name}</h2>
                    <h2 className={classes.price}>
                        {ethers.utils.formatEther(props.price, 'ether')}
                        <Eth fontSize='2rem' />
                    </h2>
                </div>
                <p>{description}</p>
                {isHovering && <Hover seller={props.seller} />}
            </div>
            <Modal
                tokenId={props.tokenId}
                image={image}
                price={props.price}
                isShowing={showModal}
                setShowModal={setShowModal}
            />
        </React.Fragment>

    )
}
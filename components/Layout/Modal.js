import classes from './Modal.module.css'
import { Eth } from '@web3uikit/icons'
import { ethers } from 'ethers'
import UpdateForm from '../Forms/UpdateForm'
import ReactDOM from 'react-dom'

export default function Modal(props) {
    if (props.isShowing) {
        return ReactDOM.createPortal(
            <div className={classes.background}>
                <div className={classes.modal}>
                    <div className={classes.nftCard}>
                        <div className={classes.tokenId}>#{props.tokenId}</div>
                        <img src={props.image} alt="nft" />
                        <div className={classes.price}>
                            {ethers.utils.formatEther(props.price, 'ether')}
                            <Eth fontSize='1em' />
                        </div>
                    </div>
                    <UpdateForm
                        setShowModal={props.setShowModal}
                        isShowing={props.isShowing}
                        tokenId={props.tokenId}
                    />
                </div>
            </div>,
            document.getElementById('modal')
        )
    } else {
        return null
    }
}
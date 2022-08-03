import classes from './Hover.module.css'
import { useMoralis } from 'react-moralis'

export default function Hover(props) {
    const { account } = useMoralis()

    if (props.seller == account) {
        return (
            <div className={classes.modal}>Click to update listing!</div>
        )
    } else {
        return (
            <div className={classes.modal}>Click to buy the NFT!</div>
        )
    }
}
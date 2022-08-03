import classes from './NFTList.module.css'

export default function NFTList(props) {
    return (
        <div className={classes.nftList}>
            {props.children}
        </div>
    )
}
import React from 'react'
import Link from 'next/link'
import { ConnectWallet } from '@web3uikit/web3'
import classes from './Header.module.css'
import { useRouter } from 'next/router'

export default function Header(props) {
    const router = useRouter()
    const currentRoute = router.pathname

    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>NFT Marketplace</h1>
                <nav className={classes.navbar}>
                    <Link href='/'>
                        <a
                            className={`${classes.link} ${currentRoute === '/' ? classes.active : ''}`}
                        >
                            Home
                        </a>
                    </Link>
                    <Link href='/sell-nft'>
                        <a
                            className={`${classes.link} ${currentRoute === '/sell-nft' ? classes.active : ''}`}
                        >
                            Sell NFT
                        </a>
                    </Link>
                    <ConnectWallet moralisAuth={false} className={classes.connect} />
                </nav>
            </header>
            {props.children}
        </React.Fragment>
    )
}
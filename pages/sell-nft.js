import Form from '../components/Forms/Form'
import Proceeds from '../components/Other/Proceeds'
import React from 'react'

export default function SellNFT() {
    return (
        <React.Fragment>
            <h1 style={{ margin: '1%', color: 'rgb(160, 160, 160)' }}>Sell your NFT</h1>
            <Form />
            <Proceeds />
        </React.Fragment>
    )
}
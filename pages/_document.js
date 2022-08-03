import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>NFT Marketplace</title>
                    <meta name="description" content="Markeplace for NFTs" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <div id='modal'></div>
                    <NextScript />
                </body>
            </Html>
        )
    }
}
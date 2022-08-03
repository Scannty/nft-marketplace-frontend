import React from 'react'
import '../styles/globals.css'
import Header from '../components/Layout/Header'
import { MoralisProvider } from 'react-moralis'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { NotificationProvider } from '@web3uikit/core'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.studio.thegraph.com/query/31978/nft-marketplace/v0.0.1'
})

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Header>
              <Component {...pageProps} />
            </Header>
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </React.Fragment>
  )
}

export default MyApp

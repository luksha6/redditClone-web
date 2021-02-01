import { ChakraProvider } from '@chakra-ui/react'
import {Provider, createClient, dedupExchange, fetchExchange } from 'urql'
import theme from '../theme'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';


function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
    
        <Component {...pageProps} />
    
    </ChakraProvider>
  );
}

export default MyApp

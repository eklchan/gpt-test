import React from 'react'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

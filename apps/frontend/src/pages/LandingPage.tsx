import React from 'react';
import { Image, VStack } from '@chakra-ui/react';
import NavigationButton from '../components/NavigationButton';

function LandingPage() {
  return (
    <VStack
      spacing={4}
      bg="brand.50"
      w={'100vw'}
      h={'100vh'}
      justify={'center'}
    >
      {/* <Image
        src="gcn_logo.svg"
        alt="gcn_logo"
      /> */}
      <NavigationButton label="LOGIN" to="/login" />
      <NavigationButton label="SIGN UP" to="/register" variant={'outline'} />
    </VStack>
  );
}

export default LandingPage;

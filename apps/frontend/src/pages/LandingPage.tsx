import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, VStack } from '@chakra-ui/react';

function LandingPage() {
  return (
    <VStack
      spacing={4}
      bg="background"
      w={'100vw'}
      h={'100vh'}
      justify={'center'}
    >
      {/* <Image
        src="gcn_logo.svg"
        alt="gcn_logo"
      /> */}
      <Button
        colorScheme="brand"
        w={'90%'}
      >
        <Link to="/register">
          LOGIN
        </Link>
      </Button>
      <Button
        colorScheme="brand"
        variant="outline"
        w={'90%'}
      >
        <Link to="/signup">
          SIGN UP
        </Link>
      </Button>
    </VStack>
  );
}

export default LandingPage;

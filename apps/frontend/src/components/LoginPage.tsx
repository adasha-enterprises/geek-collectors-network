import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';

interface LoginPageProps {
  formComponent: React.ReactNode;
}

// Add Header component created by Toco following rebase / merge
function LoginPage({ formComponent }: LoginPageProps) {
  return (
    <Box w={'100vw'} h={'100vh'} bg={'white'}>
      <Box as="header" bg={'brand.500'} p={6} zIndex="sticky" top={0}>
        <Flex justify="end" align="center">
          <HamburgerIcon as="button" w={8} h={8} color="white" aria-label="Open Menu" />
        </Flex>
      </Box>
      <VStack bg={'background.900'} px={10} pt={20}>
        <Flex w={'100%'} align={'center'} justify={'start'} mb={10}>
          <ChevronLeftIcon as="button" w={8} h={8} color="brand.500" aria-label="Go Back" />
          <Heading size={'sm'} m={'auto'}>
              Login
          </Heading>
        </Flex>
        {/* Below is where the Login Form will be rendered. */}
        {formComponent}
      </VStack>
    </Box>
  );
}

export default LoginPage;

import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
  return (
    <>
      <Box w={'100vw'} h={'100vh'} bg={'background'}>
        <Header />
        <Flex
          bg={'background'}
          direction={'column'}
          px={10}
          pt={20}
          align={'center'}
        >
          <PageTitle title={'Sign Up'} />
          <RegistrationForm />
        </Flex>
      </Box>
    </>
  );
}

export default Registration;

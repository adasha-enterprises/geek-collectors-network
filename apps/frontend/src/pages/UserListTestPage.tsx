import React from 'react';
import { VStack } from '@chakra-ui/react';

import UserList from './UserList';


function TestPage() {
  return (
    <VStack
      border={'1px solid'}
      spacing={4}
      w={'100%'}
      justify={'center'}
    >
      <UserList />
    </VStack>
  );
}

export default TestPage;

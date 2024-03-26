import React from 'react';
import { VStack } from '@chakra-ui/react';

import FriendsList from '../components/FriendsList';


function FriendsListPage() {
  console.log('FriendsListPage');
  return (
    <VStack
      border={'1px solid'}
      spacing={4}
      w={'100%'}
      justify={'center'}
    >
      <FriendsList />
    </VStack>
  );
}

export default FriendsListPage;

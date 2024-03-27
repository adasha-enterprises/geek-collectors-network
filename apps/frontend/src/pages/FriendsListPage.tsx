import React from 'react';
import { VStack } from '@chakra-ui/react';

import FriendsList from '../components/FriendsList';
import PageLayout from '../components/PageLayout';

function FriendsListPage() {
  return (
    <PageLayout showNavigation={true}>
      <VStack
        justify={'center'}
      >
        <FriendsList />
      </VStack>
    </PageLayout>
  );
}

export default FriendsListPage;

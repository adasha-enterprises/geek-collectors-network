import React, { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { EmailIcon, InfoIcon } from '@chakra-ui/icons';

import PageTitle from '../components/PageTitle';
import UserProfileCard from '../components/UserProfileCard';
import SearchBar from '../components/SearchBar';
import useFetchData from '../hooks/useFetchData';
import loadingAnimation from '../components/LoadingAnimation';
import { Friend } from '../types/types';

function FriendsList() {
  const { data: friends, isLoading } = useFetchData<Friend>('/api/v1/user/friends', 'data');
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);

  // Ensures `filteredFriends` list is updated when original `friends` list changes.
  useEffect(() => {
    if (friends) { setFilteredFriends(friends); }
  }, [friends]);

  // Filter function for search bar
  const handleUserSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filteredQueries = friends.filter(friend => friend.firstName.toLowerCase().includes(lowercaseQuery) ||
      friend.lastName.toLowerCase().includes(lowercaseQuery));
    setFilteredFriends(filteredQueries);
  };

  const renderFriendsList = (
    <>
      {filteredFriends.length > 0 ? filteredFriends.map(friend => (
        <UserProfileCard
          key={friend.id}
          userData={{ name: `${friend.firstName} ${friend.lastName}`, image: friend.profileImageUrl }}
          buttons={[
            { label: 'Send email', icon: <EmailIcon boxSize={6}/>, onClick: () => console.log(`Sending message to ${friend.id}`) },
            { label: 'Social media', icon: <InfoIcon boxSize={5}/> },
          ]}
        />
      )) : <p>No friends found</p>
      }
    </>
  );

  return (
    <VStack
      bg={'background'}
      px={10}
      pt={14}
      spacing={4}
      width={{ base: '100%', md: '90%', lg: '80%' }}
      alignItems={'center'}
    >

      <PageTitle title={'Friends Lists'} />
      <SearchBar onSearch={handleUserSearch} />

      {isLoading ? loadingAnimation : renderFriendsList}

    </VStack>
  );
}

export default FriendsList;

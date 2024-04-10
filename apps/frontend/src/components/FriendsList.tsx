import React, { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { EmailIcon, ChatIcon } from '@chakra-ui/icons';

import UserProfileCard from '../components/UserProfileCard';
import SearchBar from '../components/SearchBar';
import useFetchData from '../hooks/useFetchData';
import loadingAnimation from './widgets/LoadingAnimation';
import { Friend } from '../types/types';

function FriendsList() {
  const { data: friends, isLoading } = useFetchData<Friend>('/api/v1/friendship');
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

  const handleEmailClick = (emailAddress:string) => {
    const subject = encodeURIComponent('Hey, check out my recent find on GCN!');
    const body = encodeURIComponent('Hi, I found this cool item on Geek Collectors Network and thought you might like it! Check it out here: https://geekcollectorsnetwork.com/item/1234.');

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  const renderFriendsList = (
    <>
      {filteredFriends.length > 0 ? filteredFriends.map(friend => (
        <UserProfileCard
          key={friend.id}
          userData={{
            id: friend.id,
            name: `${friend.firstName} ${friend.lastName}`,
            image: friend.profileImageUrl,
          }}
          buttons={[
            {
              label: 'Send email',
              icon: <EmailIcon boxSize={6}/>,
              onClick: () => handleEmailClick(friend.email),
            },
            {
              label: 'Social media',
              icon: <ChatIcon boxSize={5}/>,
              onClick: () => {
                const socialMediaUrl = friend.twitter ? `https://twitter.com/${friend.twitter}` : 'Social media button clicked';
                console.log(socialMediaUrl);
              },
            },
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

      <SearchBar onSearch={handleUserSearch} />

      {isLoading ? loadingAnimation : renderFriendsList}

    </VStack>
  );
}

export default FriendsList;

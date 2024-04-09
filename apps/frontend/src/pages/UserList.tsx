import React, { useState, useEffect } from 'react';
import { VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Center } from '@chakra-ui/react';

import PageLayout from '../components/PageLayout';
import UserProfileCard from '../components/UserProfileCard';
import { AddIcon, CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import FriendRequestModal from '../components/FriendRequestModal';
import userFetchAndFilterData from '../hooks/useFetchData';
import { User } from '../types/types';

function UserList() {
  const { data: pendingUsers } = userFetchAndFilterData<User>('https://dummyjson.com/users?limit=3&skip=10', 'users');
  const [filteredPendingUsers, setFilteredPendingUsers] = useState<User[]>([]);
  useEffect(() => {
    setFilteredPendingUsers(pendingUsers);
  }, [pendingUsers]);


  const { data: suggestedUsers } = userFetchAndFilterData<User>('https://dummyjson.com/users?limit=7&skip=15', 'users');
  const [filteredSuggestedUsers, setFilteredSuggestedUsers] = useState<User[]>([]);
  useEffect(() => {
    setFilteredSuggestedUsers(suggestedUsers);
  }, [suggestedUsers]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');


  const openFriendRequestModal = (friendID: string) => {
    setSelectedUserId(friendID);
    setInviteMessage('');
    setIsModalOpen(true);
  };

  const closeFriendRequestModal = () => {
    setInviteMessage('');
    setIsModalOpen(false);
  };

  const acceptFriendRequest = (userId: string) => {
    console.log('Accepting friend request from:', userId);
    setFilteredPendingUsers(prevPeople => prevPeople.filter(user => user.id !== userId));
    setIsModalOpen(false);
  };

  type SetFilteredUsers = React.Dispatch<React.SetStateAction<User[]>>;

  const handleUserRemoval = (setFilteredUsers: SetFilteredUsers, userId: string) => {
    console.log('Removing user with ID:', userId);
    setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setIsModalOpen(false);
  };

  const sendFriendRequest = () => {
    console.log('Sending invite to:', selectedUserId);
    console.log('Message:', inviteMessage);
    handleUserRemoval(setFilteredSuggestedUsers, selectedUserId);
    setIsModalOpen(false);
  };


  return (
    <PageLayout>
      <VStack bg={'background'} px={10} pt={14} spacing={0}>

        <Tabs size={['sm', 'md']} variant={'enclosed'} colorScheme="brand">

          <TabList>
            <Tab>Pending Requests</Tab>
            <Tab>Friend Suggestions</Tab>
          </TabList>

          <TabPanels>

            {/* PENDING REQUESTS TABS */}
            <TabPanel>
              {filteredPendingUsers.length === 0 ? (
                <Center h={'100%'}>
                  <Text>No pending requests</Text>
                </Center>
              ) : (
                filteredPendingUsers.map(user => (
                  <UserProfileCard
                    key={user.id}
                    userData={{ id: user.id, name: `${user.firstName} ${user.lastName}`, image: user.image }}
                    buttons={[
                      {
                        label: 'Accept request',
                        icon: <CheckIcon boxSize={6}/>,
                        onClick: () => acceptFriendRequest(user.id),
                      },
                      {
                        label: 'Reject request',
                        icon: <SmallCloseIcon boxSize={8}/>,
                        onClick: () => handleUserRemoval(setFilteredPendingUsers, user.id),
                      },
                    ]}
                  />
                ))
              )}
            </TabPanel>

            {/* PEOPLE YOU MAY KNOW TAB */}
            <TabPanel>
              {filteredSuggestedUsers.length === 0 ? (
                <Center h={'100%'}>
                  <Text>No suggested friends</Text>
                </Center>
              ) : (
                filteredSuggestedUsers.map(user => (
                  <UserProfileCard
                    key={user.id}
                    userData={{ id: user.id, name: `${user.firstName} ${user.lastName}`, image: user.image }}
                    buttons={[
                      {
                        label: 'Accept Request',
                        icon: <AddIcon boxSize={5}/>,
                        onClick: () => openFriendRequestModal(user.id),
                      },
                      {
                        label: 'Reject Request',
                        icon: <SmallCloseIcon boxSize={8}/>,
                        onClick: () => handleUserRemoval(setFilteredSuggestedUsers, user.id),
                      },
                    ]}
                  />
                ))
              )}
              <FriendRequestModal
                isOpen={isModalOpen}
                onClose={closeFriendRequestModal}
                onSendRequest={sendFriendRequest}
                userName={filteredSuggestedUsers.find(user => user.id === selectedUserId)?.firstName || ''}
                bodyProps={{ message: inviteMessage, setMessage: setInviteMessage }} />

            </TabPanel>
          </TabPanels>

        </Tabs>
      </VStack>
    </ PageLayout>
  );
}
export default UserList;

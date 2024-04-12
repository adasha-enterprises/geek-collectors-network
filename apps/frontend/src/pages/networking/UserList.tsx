import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Text } from '@chakra-ui/react';

import PageLayout from '../../components/PageLayout';
import UserProfileCard from '../profile/UserProfileCard';
import { AddIcon, CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import FriendRequestModal from './FriendRequestModal';
import userFetchAndFilterData from '../../hooks/useFetchData';
import { User } from '../../types/types';

function UserList() {
  const { data: pendingUsers } = userFetchAndFilterData<User>('/api/v1/friendship/requests');
  const [filteredPendingUsers, setFilteredPendingUsers] = useState<User[]>([]);
  useEffect(() => {
    setFilteredPendingUsers(pendingUsers);
  }, [pendingUsers]);


  const { data: suggestedUsers } = userFetchAndFilterData<User>('/api/v1/friendship/suggestions');
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
    setFilteredPendingUsers(prevPeople => prevPeople.filter(user => user.id !== userId));
    setIsModalOpen(false);
  };

  type SetFilteredUsers = React.Dispatch<React.SetStateAction<User[]>>;

  const handleUserRemoval = (setFilteredUsers: SetFilteredUsers, userId: string) => {
    setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setIsModalOpen(false);
  };

  const sendFriendRequest = () => {
    handleUserRemoval(setFilteredSuggestedUsers, selectedUserId);
    setIsModalOpen(false);
  };


  return (
    <PageLayout>
      <Tabs className="user-list" variant={'unstyled'}>
        <TabList className="tabs">
          <Tab className="tab">Pending Requests</Tab>
          <Tab className="tab">Friends Suggestions</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="brand.500" borderRadius="1px" />
        <TabPanels>
          {/* PENDING REQUESTS TABS */}
          <TabPanel className="tag-panel">
            {filteredPendingUsers.length === 0 ? (
              <Text>No pending requests</Text>
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
          <TabPanel className="tag-panel">
            {filteredSuggestedUsers.length === 0 ? (
              <Text>No suggested friends</Text>
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
    </ PageLayout>
  );
}
export default UserList;

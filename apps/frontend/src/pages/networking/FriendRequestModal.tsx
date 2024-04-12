import React from 'react';
import GeneralModal from '../../components/widgets/GeneralModal';
import { Button, HStack, Textarea, Text } from '@chakra-ui/react';

import { FriendRequestHeaderProps } from '../../types/types';


function FriendRequestHeader({ userName } : FriendRequestHeaderProps) {
  return (
    <HStack w={'100%'} justify={'center'}>
      <Text fontSize={'lg'}>Send Request to {userName}</Text>
    </HStack>
  );
}


type FriendRequestBodyProps = {
  message: string,
  setMessage: (message : string) => void;
}

function FriendRequestBody({ message, setMessage } : FriendRequestBodyProps) {
  return (
    <Textarea
      value={message}
      onChange={e => setMessage(e.target.value)}
      placeholder="Write a custom message..." />
  );
}


type FriendRequestFooterProps = {
  onClose: () => void;
  onSendRequest: () => void;
}

function FriendRequestFooter({ onClose, onSendRequest } : FriendRequestFooterProps) {
  return (
    <HStack
      w={'100%'}
      justify={'center'}>
      <Button colorScheme="brand" onClick={onSendRequest}>Send</Button>
      <Button colorScheme="brand" onClick={onClose}>Close</Button>
    </HStack>
  );
}


type FriendRequestModalProps = {
  onClose: () => void;
  onSendRequest: () => void;
  isOpen: boolean;
  userName: string
  bodyProps: FriendRequestBodyProps;
}

function FriendRequestModal({ onClose, onSendRequest, isOpen, userName, bodyProps } : FriendRequestModalProps) {
  return (
    <GeneralModal
      onClose={onClose}
      isOpen={isOpen}
      headerContent={<FriendRequestHeader userName={userName} />}
      bodyContent={<FriendRequestBody {...bodyProps} />}
      footerContent={<FriendRequestFooter onClose={onClose} onSendRequest={onSendRequest} />} />
  );
}

export default FriendRequestModal;

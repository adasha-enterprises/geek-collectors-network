import React from 'react';
import { VStack } from '@chakra-ui/react';

import UserProfileCard from '../components/UserProfileCard';

import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';

const cardButtons = [
  {
    label: 'Send email',
    icon: <CheckIcon boxSize={8}/>,
  },
  {
    label: 'Connect to social media',
    icon: <SmallCloseIcon boxSize={10}/>,
  },
];

function TestPage() {
  return (
    <VStack
      border={'1px solid'}
      spacing={4}
      w={'100%'}
      justify={'center'}
    >
      <UserProfileCard userData={{ name: 'John Smith' }} buttons={cardButtons}/>
    </VStack>
  );
}

export default TestPage;

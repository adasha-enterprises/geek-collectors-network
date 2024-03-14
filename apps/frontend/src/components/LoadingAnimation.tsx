import React from 'react';
import { Spinner } from '@chakra-ui/react';

const loadingAnimation = (
  <Spinner
    thickness="4px"
    color={'brand.500'}
    emptyColor="gray.200"
    size={['md', 'lg', 'xl']}
  />
);

export default loadingAnimation;

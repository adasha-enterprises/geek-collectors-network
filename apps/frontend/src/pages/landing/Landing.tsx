import React from 'react';
import { VStack, HStack, Image, Box, Text } from '@chakra-ui/react';
import NavigationButton from '../../components/widgets/NavigationButton';

function Landing() {
  return (
    <VStack
      className="background"
    >
      {/* <Image
        src="gcn_logo.svg"
        alt="gcn_logo"
      /> */}
      <Box
        bg="brand.500"
        w={'160px'}
        h={'160px'}
        display={'inline'}
        transform={'rotate(45deg)'}
      />
      <Text className="motto">Collect & Connect</Text>
      <HStack className="navigation-buttons" gap={'0.2rem'}>
        <NavigationButton label="SIGNUP" to="/register"/>
        <NavigationButton label="LOGIN" to="/login" />
      </HStack>
    </VStack>
  );
}

export default Landing;

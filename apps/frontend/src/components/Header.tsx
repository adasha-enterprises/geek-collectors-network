import React from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function Header() {
  return (
    <Box as='header' bg='brand.500' p={6} zIndex='sticky' top={0}>
      <Flex justify='end' align='center'>
        <IconButton colorScheme='brand' aria-label='Hamburger Menu' icon={
            <HamburgerIcon w={8} h={8} color='white' />
        } />
      </Flex>
    </Box>
  );
}

export default Header;
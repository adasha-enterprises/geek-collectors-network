import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Hamburger from './Hamburger';

type HeaderProps = {
  showNavigation: boolean;
};

function Header({ showNavigation }: HeaderProps) {
  return (
    <Box as="header" bg="brand.500" p={3} zIndex="sticky" top={0}>
      <Flex justify="end" align="center">
        {/* Conditional rendering of HamburgerIcon. */}
        {showNavigation ? (
          <Hamburger />
        ) : <Box w={8} h={8} />}
      </Flex>
    </Box>
  );
}

export default Header;

import React from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

type HeaderProps = {
  showNavigation: boolean;
};

function Header({ showNavigation }: HeaderProps) {
  return (
    <Box as="header" bg="brand.500" p={3} zIndex="sticky" top={0}>
      <Flex justify="end" align="center">
        {/* Conditional rendering of HamburgerIcon. */}
        {showNavigation ? (
          <IconButton
            colorScheme="brand"
            aria-label="Hamburger Menu"
            icon={<HamburgerIcon w={8} h={8} color="white" />}
          />
        ) : <Box w={8} h={8} />}
      </Flex>
    </Box>
  );
}

export default Header;

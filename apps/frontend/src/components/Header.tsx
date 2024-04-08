import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Box, Flex, IconButton, useBreakpointValue, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import Hamburger from './Hamburger';
import NavigationLinks from './NavigationLinks';

type HeaderProps = {
  showNavigation: boolean;
};
const links = [
  { path: '/profile/edit', text: 'Edit Profile' },
  { path: '/account', text: 'Account Info' },
  { path: '/friendslist', text: 'Friends List' },
  { path: '/userlist', text: 'User Networking' },
  { path: '/collection', text: 'Personal Collection' },
  { path: '/wishlist', text: 'Wishlist' },
];

function Header({ showNavigation }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const link = links.find(link_ => link_.path === location.pathname);
  const pageTitle = link ? link.text : '';

  // Function to render navigation content
  const renderNavigationContent = () => {
    if (showNavigation) {
      if (isMobile) {
        return (
          <Flex align="center" justify="space-between">
            <IconButton
              colorScheme="white"
              aria-label="Back"
              icon={<ChevronLeftIcon w={8} h={8} color="white" />}
              justifySelf={'start'}
              onClick={() => navigate(-1)}
            />
            <Text color="white" fontWeight="bold" fontSize="xl">{pageTitle}</Text>
            <Hamburger links={links}/>
          </Flex>
        );
      }
      return (
        <Flex align="center" justify="space-between">
          <NavigationLinks links={links}/>
          <Link key={'/logout'} to={'Logout'}>
            <Box
              px={2}
              py={1}
              color={ 'gray.200'}
              fontSize="xl"
              _hover={{ textDecoration: 'underline' }}
            >
              Logout
            </Box>
          </Link>
        </Flex>
      );
    }
    return <Box w={8} h={8} />;
  };

  return (
    <Box as="header" bg="brand.500" p={3} zIndex="sticky" top={0}>

      {renderNavigationContent()}

    </Box>
  );
}

export default Header;

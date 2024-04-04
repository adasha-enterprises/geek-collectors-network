import React from 'react';
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Flex,
  Avatar,
  Heading,
  List,
  ListItem,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

function Hamburger() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        colorScheme="brand"
        aria-label="Hamburger Menu"
        icon={<HamburgerIcon w={8} h={8} color="white" />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size={'xs'}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              backgroundColor={'brand.500'}
              py={8}
              mb={4}
              _hover={{
                cursor: 'pointer',
                backgroundColor: 'brand.600',
              }}
              onClick={() => {
                if (window.location.pathname !== '/profile') {
                  navigate('/profile');
                }
              }}
            >
              <Flex align={'center'} direction={'column'}>
                <Avatar size={'lg'} mb={4} />
                <Heading
                  size={'md'}
                  color={'white'}
                >John Doe</Heading>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <List spacing={8} textAlign={'center'}>
                <ListItem _hover={{
                  color: 'brand.900',
                }}><Link to={'/friendslist'}>Friends</Link></ListItem>
                <ListItem _hover={{
                  color: 'brand.900',
                }}><Link to={'/userlist'}>Network</Link></ListItem>
                <ListItem _hover={{
                  color: 'brand.900',
                }}><Link to={'/wishlist'}>Wishlist</Link></ListItem>
                <ListItem _hover={{
                  color: 'brand.900',
                }}><Link to={'/collection'}>Collection</Link></ListItem>
                <ListItem _hover={{
                  color: 'brand.900',
                }}><Link to={'/account'}>Setting</Link></ListItem>
              </List>
            </DrawerBody>
            <DrawerFooter mb={8}>
              <Button
                colorScheme="brand"
                variant="outline"
                w={'full'}
                onClick={() => {
                  fetch('/api/logout', {
                    credentials: 'include',
                  }).then(() => {
                    navigate('/');
                  }).catch(error => {
                    console.error('Logout error:', error);
                  });
                }
                }>Logout</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Hamburger;

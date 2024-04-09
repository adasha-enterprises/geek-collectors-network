import React, { useState, useEffect } from 'react';
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
  Divider,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

type HamburgerProps = {
    links: { path: string; text: string }[];
};

function Hamburger({ links }: HamburgerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', profileImageUrl: '' });

  // Fetch profile data; if the data changes -- name
  // or image -- update the user state
  useEffect(() => {
    fetch('/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({ data }) => {
        setUser({
          name: `${data.firstName} ${data.lastName}`,
          profileImageUrl: data.profileImageUrl,
        });
      })
      .catch(error => console.error(error));
  }, [user.name, user.profileImageUrl]);

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

                {/* Add src tag with user image and name */}
                <Avatar size={'lg'} mb={4} src={user.profileImageUrl} />
                <Heading
                  size={'md'}
                  color={'white'}
                >{user.name}</Heading>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <List spacing={8} textAlign={'center'}>
                {links.map((link, index) => (
                  <React.Fragment key={link.path}>
                    <ListItem _hover={{ color: 'brand.900' }}>
                      <Link to={link.path}>{link.text}</Link>
                    </ListItem>
                    {(index + 1) % 2 === 0 && (index + 1) !== links.length && <Divider key={`divider-${index}`} />}
                  </React.Fragment>
                ))}
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

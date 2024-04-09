import React, { useState, useEffect } from 'react';
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Heading,
  List,
  ListItem,
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
        colorScheme="background"
        aria-label="Hamburger Menu"
        icon={<HamburgerIcon w={8} h={8} color="white" />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              className="hamburger-header"
              p={8}
              onClick={() => {
                if (window.location.pathname !== '/profile') {
                  navigate('/profile');
                }
              }}
            >
              {/* Add src tag with user image and name */}
              <Avatar className="avator" size={'lg'} name={user.name} src={user.profileImageUrl} />
              <Heading>{user.name}</Heading>
            </DrawerHeader>
            <DrawerBody className="hamburger-body">
              <List>
                {links.map((link, index) => (
                  <>
                    <ListItem key={link.path}>
                      <Link to={link.path}>{link.text}</Link>
                    </ListItem>
                    {(index + 1) % 2 === 0 && (index + 1) !== links.length && <Divider key={`divider-${index}`} />}
                  </>
                ))}
              </List>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Hamburger;

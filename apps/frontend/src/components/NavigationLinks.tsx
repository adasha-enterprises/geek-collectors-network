import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

type NavigationLinksProps = {
    links: { path: string; text: string }[];
};

function NavigationLinks({ links }: NavigationLinksProps) {
  const location = useLocation();

  return (
    <Flex ml={4}>
      {links.map(({ path, text }) => (
        <Link key={path} to={path}>
          <Box
            px={2}
            py={1}
            color={location.pathname === path ? 'white' : 'gray.200'}
            fontWeight={location.pathname === path ? 'bold' : 'normal'}
            fontSize="xl"
            _hover={{ textDecoration: 'underline' }}
          >
            {text}
          </Box>
        </Link>
      ))}
    </Flex>
  );
}

export default NavigationLinks;

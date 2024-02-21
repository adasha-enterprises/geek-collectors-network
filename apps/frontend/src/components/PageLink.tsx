import React from 'react';
import { HStack, Link as ChakraLink, BoxProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface PageLinkProps extends BoxProps {
    text: string;
    to: string;
  }

function PageLink({ text, to, ...rest } : PageLinkProps) {
  return (
    <HStack w={'100%'} justify={'center'} color={'brand.500'} {...rest}>
      <ChakraLink as={ReactRouterLink} to={to}>
        <b>{text}</b>
      </ChakraLink>
    </HStack>
  );
}

export default PageLink;

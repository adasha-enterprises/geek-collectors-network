import React from 'react';
import { HStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type PageLinkProps = {
    text: string;
    to: string;
  }

function PageLink({ text, to } : PageLinkProps) {
  return (
    <HStack w={'100%'} justify={'center'} color={'brand.500'} >
      <Link to={to} >
        <Button
          size={['sm', 'md']}
          colorScheme="brand"
          variant="link"
        >
          {text}
        </Button>
      </Link>
    </HStack>
  );
}

export default PageLink;

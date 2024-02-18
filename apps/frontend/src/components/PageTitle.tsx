import React from 'react';
import { Link } from 'react-router-dom';
import { HStack, Heading, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

type PageTitleProps = {
    title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <HStack w={'100%'} mb={10}>
      <Link to="..">
        <IconButton
          colorScheme="transparent"
          aria-label="Back"
          icon={<ChevronLeftIcon w={8} h={8} color="brand.500" />}
        />
      </Link>
      <Heading size={'sm'} m={'auto'}>
        {title}
      </Heading>
    </HStack>
  );
}

export default PageTitle;

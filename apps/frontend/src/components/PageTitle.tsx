import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleGrid, Heading, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

type PageTitleProps = {
    title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <SimpleGrid columns={3} width={'90%'} mb={6}>
      <Link to="..">
        <IconButton
          colorScheme="transparent"
          aria-label="Back"
          icon={<ChevronLeftIcon w={8} h={8} color="brand.500" />}
        />
      </Link>
      <Heading size={'sm'} alignSelf={'center'} justifySelf={'center'}>
        {title}
      </Heading>
    </SimpleGrid>
  );
}

export default PageTitle;

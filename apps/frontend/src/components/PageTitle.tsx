import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleGrid, Heading, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

type PageTitleProps = {
    title: string;
};

function PageTitle({ title }: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <SimpleGrid
      columns={3}
      width={{ base: '100%', md: '90%', lg: '80%'}}
      mb={6}
      gridTemplateColumns={'1fr 2fr 1fr'}
    >
      <IconButton
        colorScheme="transparent"
        aria-label="Back"
        icon={<ChevronLeftIcon w={8} h={8} color="brand.500" />}
        justifySelf={'start'}
        onClick={() => navigate(-1)}
      />
      <Heading size={'sm'} alignSelf={'center'} justifySelf={'center'}>
        {title}
      </Heading>
    </SimpleGrid>
  );
}

export default PageTitle;

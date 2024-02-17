import React from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

type PageTitleProps = {
    title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <Flex w={'100%'} align={'center'} mb={10} justify={'start'}>
      <IconButton
        colorScheme=""
        aria-label="Back"
        icon={<ChevronLeftIcon as="button" w={8} h={8} color="brand.500" />}
      />
      <Heading size={'sm'} m={'auto'}>
        {title}
      </Heading>
    </Flex>
  );
}

export default PageTitle;

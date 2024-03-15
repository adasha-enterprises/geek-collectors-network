import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';

type PageLayoutProps = {
  children: ReactNode;
  showNavigation: boolean;
};

function PageLayout({ children, showNavigation }: PageLayoutProps) {
  return (
    <>
      <Box w={'100vw'} h={'100vh'} bg={'background'}>
        <Header showNavigation={showNavigation} />
        {children}
      </Box>
    </>
  );
}

export default PageLayout;

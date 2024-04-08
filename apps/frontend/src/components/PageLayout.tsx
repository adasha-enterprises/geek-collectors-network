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
      <Box
        w={'100vw'}
        h={'100vh'}
        bg={'background'}
        position="relative"
        overflow="hidden">
        <Box
          pos="fixed"
          top={0}
          left={0}
          right={0}
          zIndex="docked"
          boxShadow="sm"
        >
          <Header showNavigation={showNavigation} />
        </Box>
        <Box overflowY="auto" h="full" pt="4rem" pb="2rem">
          {children}
        </Box>
      </Box>
    </>
  );
}

export default PageLayout;

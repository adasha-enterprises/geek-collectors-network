import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Header from './header/Header';

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Box
        overflow="hidden">
        <Header />
        <Box
          className="container"
          overflowY="auto"
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

export default PageLayout;

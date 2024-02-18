import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header';


function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Box w={'100vw'} h={'100vh'} bg={'background'}>
        <Header />
        {children}
      </Box>
    </>
  );
}

export default PageLayout;

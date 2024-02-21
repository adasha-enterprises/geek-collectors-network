import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import React from 'react';

function LoginForm() {
  return (
    <VStack gap={4} >
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button
        bg={'brand.500'}
        color={'white'}
        _hover={{ bg: 'brand.600' }}
        variant="solid" p={6}
      >
        LOGIN
      </Button>
    </VStack>
  );
}

export default LoginForm;

import React from 'react';
import { Button, Checkbox, HStack } from '@chakra-ui/react';

function LoginControls() {
  return (
    <HStack w={'100%'} justify={'space-around'}>
      <Checkbox size={['sm', 'md']}>
        Remember me
      </Checkbox>

      <Button size={['sm', 'md']} colorScheme="brand" variant="link">
        Forgot password?
      </Button>
    </HStack>
  );
}

export default LoginControls;

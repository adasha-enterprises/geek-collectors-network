import React from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	VStack,
	HStack,
	Checkbox,
} from '@chakra-ui/react';

function RegistrationForm() {
	return (
		<VStack spacing={8} w={{ base: '100%', md: '80%', lg: '50%' }}>
			<FormControl id='first-name'>
				<FormLabel>First name:</FormLabel>
				<Input type='text' />
			</FormControl>
			<FormControl id='last-name'>
				<FormLabel>Last name:</FormLabel>
				<Input type='text' />
			</FormControl>
			<FormControl id='email'>
				<FormLabel>Email:</FormLabel>
				<Input type='email' />
				{/* <FormHelperText>We'll never share your email.</FormHelperText> */}
			</FormControl>
			<FormControl id='password'>
				<FormLabel>Password:</FormLabel>
				<Input type='password' />
				{/* <FormHelperText>Must be at least 8 characters.</FormHelperText> */}
			</FormControl>
			<HStack w={'100%'} justify={'space-around'}>
				<Checkbox size={['sm', 'md']}>Remember me</Checkbox>
				<Button size={['sm', 'md']} colorScheme='brand' variant='link'>
					Forgot password?
				</Button>
			</HStack>
			<Button w={'100%'} colorScheme='brand' variant='solid' mt={8} p={6}>
				SIGN UP
			</Button>
		</VStack>
	);
}

export default RegistrationForm;

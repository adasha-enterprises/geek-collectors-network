import React from 'react';
import {
	Box,
	Flex,
	Heading,
	IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import Header from '../components/Header';
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
	return (
		<>
			<Box w={'100vw'} h={'100vh'} bg={'background'}>
				<Header />
				<Flex bg={'background'} direction={'column'} px={10} pt={20} align={'center'}>
					<Flex w={'100%'} align={'center'} mb={10} justify={'start'}>
						<IconButton
							colorScheme=''
							aria-label='Back'
							icon={
								<ChevronLeftIcon as='button' w={8} h={8} color='brand.500' />
							}
						/>
						<Heading size={'sm'} m={'auto'}>
							Sign Up
						</Heading>
					</Flex>
					<RegistrationForm />
				</Flex>
			</Box>
		</>
	);
}

export default Registration;

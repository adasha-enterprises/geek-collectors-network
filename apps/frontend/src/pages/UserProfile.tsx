import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, VStack, StackDivider, Avatar, Heading, Text, Tag, Button } from '@chakra-ui/react';
import PageLayout from '../components/PageLayout';

type UserProfileProps = {
  avatar: string;
  username: string;
  about: string;
  interests: string[];
};

function UserProfile({ avatar, username, about, interests }: UserProfileProps) {
  const navigate = useNavigate();

  return (
    <PageLayout showNavigation={true}>
      <VStack
        bg={'background'}
        spacing={6}
        px={10}
        py={20}
        align={'start'}
        divider={<StackDivider borderWidth={'1px'}/>}
      >
        <Stack spacing={2}>
          <Avatar size={'lg'} mb={4} src={avatar}/>
          <Heading size={'md'}>{username}</Heading>
          <Text fontSize={'sm'}>Member since 1922 - Total friends: 3000</Text>
          <Button
            size={'sm'}
            colorScheme={'brand'}
            w={'8rem'}
            borderRadius={'full'}
            variant={'outline'}
            onClick={() => navigate('/profile/edit')}
          >Edit profile</Button>
        </Stack>
        <Stack spacing={4}>
          <Heading size={'sm'} color={'text'}>About</Heading>
          <Text fontSize={'sm'}>{about}</Text>
        </Stack>
        <Stack spacing={4}>
          <Heading size={'sm'}>Interests</Heading>
          <Box>
            {interests.map(interest => (
              <Tag
                key={interest}
                size={'lg'}
                variant={'outline'}
                backgroundColor={'transparent'}
                colorScheme={'brand'}
                borderRadius={'full'}
                m={1}
              >
                {interest}
              </Tag>
            ))}
          </Box>
        </Stack>
      </VStack>
    </PageLayout>
  );
}

export default UserProfile;

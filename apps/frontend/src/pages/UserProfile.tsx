import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Stack, VStack, StackDivider, Avatar, Heading, Text, Tag, Button } from '@chakra-ui/react';
import PageLayout from '../components/PageLayout';

type ProfileInfo = {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  profileImageUrl: string;
  birthDate: string;
  country: string;
  region: string;
  city: string;
  about: string;
  tags: string[];
}


function UserProfile() {
  const { userId } = useParams();
  const userProfileUrl = `/api/v1/user/profile?id=${userId}`;
  const [initialValues, setInitialValues] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    fetch(userProfileUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({ data }) => setInitialValues({ ...data }))
      .catch(error => console.error(error));
  }, []);

  if (!initialValues) {
    return (
      <PageLayout showNavigation={true}>
        <VStack
          bg={'background'}
          spacing={2}
          px={10}
          pt={20}
        >
          <div>Loading...</div>
        </VStack>
      </PageLayout>
    );
  }
  const {
    firstName, lastName, displayName, profileImageUrl,
    birthDate, country, region, city, about, tags,
  } = initialValues;
  const fullName = `${firstName} ${lastName}`;

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
          <Avatar size={'lg'} mb={4} src={profileImageUrl}/>
          <Heading size={'md'}>{fullName}</Heading>
          <Text fontSize={'sm'}>Member since 1922 - Total friends: 3000</Text>
          {/* <Button
            size={'s`m'}
            colorScheme={'brand'}
            w={'8rem'}
            borderRadius={'full'}
            variant={'outline'}
            onClick={() => navigate('/profile/edit')}
          >Edit profile</Button> */}
        </Stack>
        <Stack spacing={4}>
          <Heading size={'sm'} color={'text'}>About</Heading>
          <Text fontSize={'sm'}>{about}</Text>
        </Stack>
        <Stack spacing={4}>
          <Heading size={'sm'}>Interests</Heading>
          <Box>
            {tags.map(tag => (
              <Tag
                key={tag}
                size={'lg'}
                variant={'outline'}
                backgroundColor={'transparent'}
                colorScheme={'brand'}
                borderRadius={'full'}
                m={1}
              >
                {tag}
              </Tag>
            ))}
          </Box>
        </Stack>
      </VStack>
    </PageLayout>
  );
}

export default UserProfile;

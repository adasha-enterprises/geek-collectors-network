import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Stack, VStack, StackDivider, Avatar, Heading, Text, Tag, Button } from '@chakra-ui/react';
import PageLayout from '../../components/PageLayout';
import loadingAnimation from '../../components/widgets/LoadingAnimation';
import { TagInfo } from './TagInput';

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
  tags: TagInfo[];
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
      .then(({ data }) => {
        setInitialValues({ ...data });
      })
      .catch(error => console.error(error));
  }, []);

  if (!initialValues) {
    return (
      <PageLayout>
        {loadingAnimation}
      </PageLayout>
    );
  }
  const {
    firstName, lastName, displayName, profileImageUrl,
    birthDate, country, region, city, about, tags,
  } = initialValues;
  const fullName = `${firstName} ${lastName}`;

  return (
    <PageLayout>
      <VStack
        className="profile"
        align={'start'}
        divider={<StackDivider borderWidth={'1px'}/>}
      >
        <Stack className="profile-section">
          <Avatar
            className="avatar"
            size={'lg'}
            name={`${fullName.split(' ')[0]} ${fullName.split(' ')[1]}`}
            src={profileImageUrl}
          />
          <Heading as={'h1'}>{fullName}</Heading>
          <Text>Member since 2014</Text>
          <Text>Total friends: 412</Text>
          {/* <Button
            size={'s`m'}
            colorScheme={'brand'}
            w={'8rem'}
            borderRadius={'full'}
            variant={'outline'}
            onClick={() => navigate('/profile/edit')}
          >Edit profile</Button> */}
        </Stack>
        <Stack className="profile-section">
          <Heading>About</Heading>
          <Text>{about}</Text>
        </Stack>
        <Stack className="profile-section">
          <Heading>Interests</Heading>
          <Box>
            {tags.map(tag => (
              <Tag
                key={tag.id}
                size={'lg'}
                variant={'outline'}
                backgroundColor={'transparent'}
                colorScheme={'brand'}
                borderRadius={'full'}
                m={1}
              >
                {tag.text}
              </Tag>
            ))}
          </Box>
        </Stack>
        <></>
      </VStack>
    </PageLayout>
  );
}

export default UserProfile;

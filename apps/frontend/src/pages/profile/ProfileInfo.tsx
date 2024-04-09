import React, { useEffect, useState } from 'react';
import {
  VStack,
  StackDivider,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { profileSchema } from '../../schemas/schemas';
import PageLayout from '../../components/PageLayout';
import { TagInfo, TagInput } from './TagInput';
import loadingAnimation from '../../components/widgets/LoadingAnimation';

type ProfileInfo = {
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  email: string;
  birthDate: string;
  about: string;
  country: string;
  region: string;
  city: string;
  tags: TagInfo[];
}

function formatDate(date: Date) {
  const month = date.getUTCMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  // Format the date as MM/DD/YYYY
  const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

  return formattedDate;
}

const updateProfile = async (values: ProfileInfo) => {
  const response = await fetch('/api/v1/user/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  }
};

function ProfileInfo() {
  const [initialValues, setInitialValues] = useState<ProfileInfo | null>(null);
  const [tags, setTags] = useState<TagInfo[]>([]);

  useEffect(() => {
    fetch('/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({ data }) => {
        setInitialValues({
          ...data,
          birthDate: formatDate(new Date(data.birthDate)),
        });
        setTags(data.tags);
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

  return (
    <PageLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={values => updateProfile(values)}
      >
        {formik => (
          <Form className="profile-form">
            <VStack gap={1} divider={<StackDivider/>} >
              <Avatar className="avatar" border={'1px'} size={['lg', 'xl']} name={`${initialValues.firstName} ${initialValues.lastName}`} src={initialValues.profileImageUrl}>
                {/* <AvatarBadge boxSize={'1em'} bg="brand.500" border={'1px'} >+</AvatarBadge> */}
              </Avatar>
              <FormControl id={'email'} isInvalid={!!(formik.errors.email && formik.touched.email)}>
                <FormLabel>Email</FormLabel>
                <Field as={Input} name={'email'}></Field>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl id={'birthDate'} isInvalid={!!(formik.errors.birthDate && formik.touched.birthDate)}>
                <FormLabel>Date of Birth</FormLabel>
                <Field as={Input} name={'birthDate'} placeholder={'MM/DD/YYYY'}></Field>
                <FormErrorMessage>{formik.errors.birthDate}</FormErrorMessage>
              </FormControl>
              <FormControl id={'country'} isInvalid={!!(formik.errors.country && formik.touched.country)}>
                <FormLabel>Country</FormLabel>
                <Field as={Input} name={'country'}></Field>
                <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
              </FormControl>
              <FormControl id={'region'} isInvalid={!!(formik.errors.region && formik.touched.region)}>
                <FormLabel>Province/State</FormLabel>
                <Field as={Input} name={'region'}></Field>
                <FormErrorMessage>{formik.errors.region}</FormErrorMessage>
              </FormControl>
              <FormControl id={'city'} isInvalid={!!(formik.errors.city && formik.touched.city)}>
                <FormLabel>City</FormLabel>
                <Field as={Input} name={'city'} isInvalid={false}></Field>
                <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
              </FormControl>
              <FormControl id={'about'} isInvalid={!!(formik.errors.about && formik.touched.about)}>
                <FormLabel>About</FormLabel>
                <Field
                  as={Textarea}
                  name={'about'}
                  isInvalid={false}
                  placeholder="Tell us about yourself..."/>
                <FormErrorMessage>{formik.errors.about}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Interests</FormLabel>
                <TagInput tags={tags} setTags={setTags} />
              </FormControl>
              <Button
                className="submit-button"
                type="submit"
                colorScheme="brand"
                variant="outline"
                _hover={{
                  backgroundColor: 'brand.500',
                  border: '1px solid transparent',
                  color: 'white',
                }}
                disabled={!formik.dirty || formik.isSubmitting}>
                                SAVE
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
}

export default ProfileInfo;

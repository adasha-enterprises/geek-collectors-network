import React, { useEffect, useState } from 'react';
import {
  VStack, StackDivider, Avatar, Button, FormControl, FormLabel,
  FormErrorMessage, Input, Textarea, useToast, Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { profileSchema } from '../../schemas/schemas';
import PageLayout from '../../components/PageLayout';
import { TagInfo, TagInput } from './TagInput';
import loadingAnimation from '../../components/widgets/LoadingAnimation';

type ProfileInfoProps = {
  id: string,
  firstName: string;
  lastName: string;
  profileImageUrl: string;
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

async function updateProfile (values: ProfileInfoProps): Promise<boolean> {
  try {
    const response = await fetch('/api/v1/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (!response.ok || data.isError) {
      throw new Error(data.message || 'Failed to update profile due to network request error.');
    }
    return true;
  } catch (error) {
    console.log('Profile update failed: ', error);
    return false;
  }
}

function ProfileInfo() {
  const [initialValues, setInitialValues] = useState<ProfileInfoProps | null>(null);
  const [tags, setTags] = useState<TagInfo[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const goToProfile = () => {
    navigate(`/profile/${initialValues?.id}`);
  };

  const handleUpdateProfile = async (values: ProfileInfoProps) => {
    setIsLoading(true);
    const success = await updateProfile(values);
    setIsLoading(false);

    if (success) {
      toast({
        title: 'Profile succesfully updated!',
        status: 'success',
        duration: 2000,
      });
    } else {
      toast({
        title: 'Profile update failed.',
        status: 'error',
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/v1/user/profile', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const { data } = await response.json();
        setInitialValues({ ...data, birthDate: formatDate(new Date(data.birthDate)) });
        setTags(data.tags);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: 'Failed to load profile data.',
          description: 'Please refresh the page to try again.',
          status: 'error',
          duration: 2000,
        });
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

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
        onSubmit={handleUpdateProfile}
      >
        {formik => (
          <Form className="profile-form">
            <VStack gap={1} divider={<StackDivider/>} >
              <Avatar className="avatar" border={'1px'} size={['lg', 'xl']} name={`${initialValues.firstName} ${initialValues.lastName}`} src={initialValues.profileImageUrl}></Avatar>
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
              <Box display="flex" flexDirection="column" width="100%">
                <Button
                  className="submit-button"
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="brand"
                  variant="outline"
                  _hover={{
                    backgroundColor: 'brand.500',
                    border: '1px solid transparent',
                    color: 'white',
                  }}
                  disabled={!formik.dirty || formik.isSubmitting}
                >
                SAVE
                </Button>
                <Button
                  className="submit-button"
                  onClick={goToProfile}
                  colorScheme="brand"
                  type="button"
                  variant="outline"
                  _hover={{
                    backgroundColor: 'brand.500',
                    border: '1px solid transparent',
                    color: 'white',
                  }}
                >
                SEE MY PROFILE
                </Button>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
}

export default ProfileInfo;

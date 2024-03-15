import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

type TextInputProps = {
    name: string,
    label: string,
    type?: string
  }

function TextInput({ name, label, type = 'text' }: TextInputProps) {
  const [field, meta] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} type={type} focusBorderColor="brand.600" />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default TextInput;

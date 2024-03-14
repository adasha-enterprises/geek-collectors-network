import React, { useState } from 'react';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

type SearchBarProps = {
    onSearch: (search: string) => void;
    placeholderText?: string;
}

function SearchBar({ onSearch, placeholderText = 'Search...' }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <InputGroup>

      <Input
        value={value}
        placeholder={placeholderText}
        onChange={handleChange}
        focusBorderColor="brand.600"/>

      <InputRightElement>
        <Button
          background="transparent"
          _active={{ bg: 'brand.600' }}
          _hover={{ boxShadow: 'none' }}
          onClick={handleClear}
        >
          <SmallCloseIcon color={'brand.600'} boxSize={6}/>
        </Button>
      </InputRightElement>

    </InputGroup>
  );
}

export default SearchBar;

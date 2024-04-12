import React, { useState } from 'react';
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';

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
    <InputGroup className="search-bar">
      <InputLeftElement className="search-icon" pointerEvents="none">
        <Search2Icon/>
      </InputLeftElement>
      <Input
        value={value}
        placeholder={placeholderText}
        onChange={handleChange}
        focusBorderColor="brand.600"
      />
      <InputRightElement className="clear-button">
        <Button
          onClick={handleClear}
        >
          <SmallCloseIcon/>
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;

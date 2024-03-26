import React, { useState, useEffect } from 'react';
import { Flex, Box, Tag, TagCloseButton, Input } from '@chakra-ui/react';

type TagInputProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

function TagInput({ tags, setTags }: TagInputProps) {
  const [tagInput, setTagInput] = useState('');

  function addTag() {
    const trimmedInput = tagInput.trim();
    if (trimmedInput.length > 0 && !tags.includes(trimmedInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter(t => t !== tag));
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        addTag();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tagInput, tags]);

  return (
    <Flex >
      <Box w={'100%'}>
        <Input
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          border={'none'}
          focusBorderColor={'transparent'}
          placeholder="Add interests..."
          w={'100%'}
          mb={2}
        />
        {tags.map(tag => (
          <Tag key={tag} size="lg" m={1} backgroundColor={'brand.100'} borderRadius={'15px'}>
            {tag}
            <TagCloseButton onClick={() => removeTag(tag)} />
          </Tag>
        ))}
      </Box>
    </Flex>
  );
}

export default TagInput;

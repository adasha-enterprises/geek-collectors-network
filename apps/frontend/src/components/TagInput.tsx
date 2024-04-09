import React, { useState, useEffect } from 'react';
import { Flex, Box, Tag, TagCloseButton, Input } from '@chakra-ui/react';

type TagInfo = {
  id: number;
  text: string;
};

type TagInputProps = {
  tags: TagInfo[];
  setTags: React.Dispatch<React.SetStateAction<TagInfo[]>>;
};

function TagInput({ tags, setTags }: TagInputProps) {
  const [tagInput, setTagInput] = useState('');

  function addTag() {
    const trimmedInput = tagInput.trim();
    if (trimmedInput.length > 0 && !tags.some(tag => tag.text === trimmedInput)) {
      fetch('/api/v1/user/tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmedInput }),
      })
        .then(response => response.json())
        .then(({ data }) => {
          setTags([...tags, { id: data.id, text: trimmedInput }]);
          setTagInput('');
        })
        .catch(error => console.error(error));
    }
  }

  function removeTag(id: number) {
    fetch(`/api/v1/user/tag/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(({ data }) => {
        console.log(data);
        setTags(tags.filter(tag => tag.id !== id));
      })
      .catch(error => console.error(error));
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
          <Tag key={tag.text} size="lg" m={1} backgroundColor={'brand.100'} borderRadius={'15px'}>
            {tag.text}
            <TagCloseButton onClick={() => removeTag(tag.id)} />
          </Tag>
        ))}
      </Box>
    </Flex>
  );
}

export { TagInfo, TagInput };

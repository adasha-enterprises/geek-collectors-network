import React, { useState, useEffect } from 'react';
import { Flex, Tag, TagLabel, TagCloseButton, Input } from '@chakra-ui/react';

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
    <>
      <Input
        value={tagInput}
        onChange={e => setTagInput(e.target.value)}
        placeholder="Add interests..."
      />
      <Flex className="tag-container">
        {tags.map(tag => (
          <Tag key={tag.text} size={'lg'} colorScheme={'brand'} variant={'solid'} borderRadius={'full'} >
            <TagLabel>
              {tag.text}
            </TagLabel>
            <TagCloseButton className="tag-close-button" onClick={() => removeTag(tag.id)} />
          </Tag>
        ))}
      </Flex>
    </>
  );
}

export { TagInfo, TagInput };

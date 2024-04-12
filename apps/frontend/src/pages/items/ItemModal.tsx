import React from 'react';
import {
  HStack,
  Text,
  Stack,
  AspectRatio,
  Image,
  Tag,
  Wrap,
  WrapItem,
  Button,
  Link,
  Divider,
} from '@chakra-ui/react';

import GeneralModal from '../../components/widgets/GeneralModal';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { TagInfo } from '../profile/TagInput';

type ItemModalHeaderProps = {
    name: string;
}

function ItemModalHeader({ name }: ItemModalHeaderProps) {
  return (
    <Text>{name}</Text>
  );
}


type ItemModalBodyProps = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    url: string
    tags: TagInfo[];
}

function ItemModalBody({ id, name, description, imageUrl, url, tags }: ItemModalBodyProps) {
  return (
    <Stack className="modal-body">
      <AspectRatio ratio={ 16 / 9 }>
        <Image src={imageUrl || 'https://via.placeholder.com/150'} objectFit={'cover'}/>
      </AspectRatio>
      <Text>{description}</Text>
      <Link href={url} isExternal>
        {url}<ExternalLinkIcon/>
      </Link>
      <Wrap spacing={0}>
        {tags.map(tag => (
          <WrapItem key={tag.text}>
            <Tag
              size={'lg'}
              variant={'solid'}
              colorScheme={'brand'}
              borderRadius={'full'}
              m={1}
            >
              {tag.text}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
      <Divider/>
    </Stack>
  );
}


type ActionProps = {
    label: string;
    onClick: () => void;
    variant: 'solid' | 'outline';
}

type ItemModalFooterProps = {
    actions: ActionProps[];
}

function ItemModalFooter({ actions } : ItemModalFooterProps) {
  return (
    <HStack className="modal-footer">
      {actions.map((action, index) => (
        action.label !== 'Hide' && (
          <Button
            key={index}
            variant={action.variant}
            colorScheme={'brand'}
            onClick={action.onClick}
            _hover={{
              bg: 'brand.500',
              color: 'white',
            }}
          >
            {action.label}
          </Button>
        )
      ))}
    </HStack>
  );
}

type ItemModalProps = {
    isOpen: boolean;
    onClose: () => void;
    bodyProps: ItemModalBodyProps;
    footerActions: ActionProps[];
}

function ItemModal({ onClose, isOpen, bodyProps, footerActions }: ItemModalProps) {
  return (
    <GeneralModal
      isOpen={isOpen}
      onClose={onClose}
      headerContent={<ItemModalHeader name={bodyProps.name}/>}
      bodyContent={<ItemModalBody {...bodyProps} />}
      footerContent={<ItemModalFooter actions={footerActions} />}
    />
  );
}


export default ItemModal;

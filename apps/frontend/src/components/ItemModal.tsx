import React from 'react';
import {
  HStack,
  VStack,
  Text,
  Card,
  CardBody,
  Stack,
  AspectRatio,
  Image,
  Divider,
  Tag,
  Wrap,
  WrapItem,
  Button,
  Link,
} from '@chakra-ui/react';

import GeneralModal from './GeneralModal';
import { ExternalLinkIcon } from '@chakra-ui/icons';


type ItemModalHeaderProps = {
    name: string;
}

function ItemModalHeader({ name }: ItemModalHeaderProps) {
  return (
    <HStack w={'100%'} justify={'center'}>
      <Text fontSize={'xl'}>{name}</Text>
    </HStack>
  );
}


type ItemModalBodyProps = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    url: string
    tags: string[];
}

function ItemModalBody({ id, name, description, imageUrl, url, tags }: ItemModalBodyProps) {
  return (
    <VStack>
      <Card>
        <CardBody>
          <Stack spacing={4}>

            <AspectRatio ratio={ 16 / 9 }>
              <Image src={imageUrl || 'https://via.placeholder.com/150'} objectFit={'cover'} borderRadius={5}/>
            </AspectRatio>

            <Text>{description}</Text>

            <Divider />

            <Link href={url} isExternal> {name} <ExternalLinkIcon mx="2px" /> </Link>

            <Divider />

            <Text size={'md'} as={'b'}>Item Tags</Text>
            <Wrap spacing={0}>
              {tags.map(tag => (
                <WrapItem key={id}>
                  <Tag size="lg" m={1} backgroundColor={'brand.100'} borderRadius="15px">
                    {tag}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>

          </Stack>
        </CardBody>
      </Card>
    </VStack>
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
    <VStack w={'100%'}>
      {actions.map((action, index) => (
        <Button
          fontSize={['xs', 'sm', 'md', 'lg']}
          key={index}
          width={'100%'}
          variant={action.variant}
          colorScheme={'brand'}
          onClick={action.onClick}
        >
          {action.label}</Button>
      ))}
    </VStack>
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

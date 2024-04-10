import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Stack,
  Spacer,
  Divider,
  IconButton,
  CardFooter,
  AspectRatio,
  HStack,
} from '@chakra-ui/react';

import { CardButton } from './CardButtons';

type ItemData = {
 title: string,
 description: string,
 itemImage?: string,
}


type ItemCardProps = {
  itemData: ItemData,
  buttons: CardButton[],
  onClick: () => void,
}

// TODO: Make ItemCard clickable, so it opens modal with more details
function ItemCard({ itemData, buttons, onClick }: ItemCardProps) {
  return (
    <Card
      maxW="sm"
      variant="elevated"
      p="2"
      shadow="md"
      _hover={{ shadow: 'lg' }}
    >

      <CardBody onClick={onClick} cursor={'pointer'}>
        <Stack mt="3" spacing="6">

          <AspectRatio ratio={4 / 3}>
            <Image
              src={itemData.itemImage || 'https://via.placeholder.com/150'}
              objectFit="cover"
              alt={itemData.title}
            />
          </AspectRatio>

          <Divider />

          <Heading size="md">{itemData.title}</Heading>

          <Text>{itemData.description}</Text>
        </Stack>
      </CardBody>

      <CardFooter>

        {/* Moves icon to far right */}
        <Spacer />

        {/* Renders multiple buttons */}
        <HStack w={'100%'} justify={'center'} spacing={'0.5rem'}>
          {buttons.map((button, index) => (
            <IconButton
              key={index}
              aria-label={button.label}
              icon={button.icon}
              variant={button.variant || 'ghost'}
              colorScheme={button.colorScheme || 'brand'}
              onClick={button.onClick}
            />
          ))}
        </HStack>

      </CardFooter>
    </Card>
  );
}

export default ItemCard;

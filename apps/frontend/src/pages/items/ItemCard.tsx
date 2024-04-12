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
    <Card className="item-card" variant="elevated">
      <CardBody className="item-card-body" onClick={onClick} cursor={'pointer'}>
        <AspectRatio ratio={4 / 3}>
          <Image
            src={itemData.itemImage || 'https://via.placeholder.com/150'}
            objectFit="cover"
            alt={itemData.title}
          />
        </AspectRatio>
        <Divider />
        <Heading>{itemData.title}</Heading>
        <Text>{itemData.description}</Text>
      </CardBody>
      <CardFooter className="action-buttons">
        {/* Renders multiple buttons */}
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
      </CardFooter>
    </Card>
  );
}

export default ItemCard;

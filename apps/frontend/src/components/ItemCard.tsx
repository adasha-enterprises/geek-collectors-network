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
  VStack,
} from '@chakra-ui/react';

type ItemData = {
 title: string,
 description: string,
 itemImage?: string,
}

type CardButton = {
  label: string,
  icon: React.ReactElement,
  variant?: string,
  colorScheme?: string,
  onClick?: () => void
}

type ItemCardProps = {
  itemData: ItemData,
  buttons: CardButton[]
}

// TODO: Make ItemCard clickable, so it opens modal with more details
function ItemCard({ itemData, buttons }: ItemCardProps) {
  return (
    <Card
      maxW="sm"
      variant="elevated"
      p="2"
      shadow="md"
      _hover={{ shadow: 'lg' }}>

      <CardBody>
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
        <VStack w={'100%'}>
          {buttons.map((button, index) => (
            <IconButton
              key={index}
              w={'100%'}
              aria-label={button.label}
              icon={button.icon}
              variant={button.variant || 'ghost'}
              colorScheme={button.colorScheme || 'brand'}
              onClick={button.onClick}
            />
          ))}
        </VStack>

      </CardFooter>
    </Card>
  );
}

export default ItemCard;

import React from 'react';
import { Box, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type UserData = {
  id: string
  name: string,
  image?: string
  mutualFriends?: number,
}

type CardButton = {

  // Some icons may not have explicit names; added for accessibility
  label: string,

  // The Chakra UI (or other) icon to be rendered and its variant
  icon: React.ReactElement,
  variant?: string,

  // Allows for custom color schemes, i.e, green checkmark or red "x".
  colorScheme?: string

  onClick?: () => void
}

type UserProfileCardProps = {
    userData: UserData,
    buttons: CardButton[]; // May need to render multiple icon buttons
}

function navigateToUserProfile() {
  console.log('Navigating to user profile...');
}

function UserProfileCard({ userData, buttons }: UserProfileCardProps) {
  const navigate = useNavigate();
  const profilePath = `/profile/${userData.id}`;

  return (
    <HStack
      backgroundColor={'background'}
      justify={'space-between'}
      px={0}
      py={2}
      spacing={4}
      w={'100%'}
      borderBottom={'1px'}
      borderColor={'greyOut'}
      cursor={'pointer'}
    >

      {/* Profile image, displayed to the left of the user name */}
      <Box flexShrink={0} onClick={() => navigate(profilePath)}>
        <Image
          borderRadius={'full'} // Makes image circular
          boxSize={['30px', '40px', '50px']} // Dynamically increases image size based on screen width
          src={userData.image || 'https://via.placeholder.com/150'}
          alt={`${userData.name}'s profile photo`}>
        </Image>
      </Box>

      {/* User name, displayed to the right of the profile image */}
      <Flex flex={'1'} onClick={() => navigate(profilePath)} >
        <Text fontSize={['md', 'lg']} fontWeight={'bold'}>{userData.name}</Text>
      </Flex>

      <HStack spacing={3}>
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

    </HStack>
  );
}

export default UserProfileCard;

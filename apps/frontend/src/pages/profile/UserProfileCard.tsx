import React from 'react';
import { Avatar, Flex, Grid, GridItem, HStack, IconButton, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type UserData = {
  id: string
  name: string,
  image?: string
  mutualFriends?: number,
}

type CardButton = {
  label: string,
  icon: React.ReactElement,
  variant?: string,
  colorScheme?: string
  onClick?: () => void
}

type UserProfileCardProps = {
    userData: UserData,
    buttons: CardButton[]; // May need to render multiple icon buttons
}

function UserProfileCard({ userData, buttons }: UserProfileCardProps) {
  const navigate = useNavigate();
  const profilePath = `/profile/${userData.id}`;

  return (
    <Grid className="profile-card" onClick={() => navigate(profilePath)}>
      <GridItem>
        <Avatar
          name={userData.name}
          src={ userData.image || 'https://via.placeholder.com/150' }
        />
        <Flex>
          <Heading>{userData.name}</Heading>
        </Flex>
      </GridItem>
      <HStack className="contact-buttons">
        {buttons.map((button, index) => (
          <IconButton
            key={index}
            aria-label={button.label}
            icon={button.icon}
            variant={button.variant || 'ghost'}
            colorScheme={button.colorScheme || 'brand'}
            onClick={e => {
              e.stopPropagation();
              if (button.onClick) button.onClick();
            }}
          />
        ))}
      </HStack>
    </Grid>
  );
}

export default UserProfileCard;

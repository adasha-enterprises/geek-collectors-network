import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonProps {
    label: string;
    to: string;
    variant?: string;
}

function NavigationButton({ to, label, variant }: NavigationButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      colorScheme="brand"
      w={{ 'base': '90%', 'md': '50%', 'lg': '30%' }}
      variant={variant || 'solid'}
      onClick={ () => navigate(to) }
    >
      {label}
    </Button>
  );
}

export default NavigationButton;

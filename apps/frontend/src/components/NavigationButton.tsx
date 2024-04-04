import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type NavigationButtonProps = {
    label: string;
    to: string;
    variant?: string;
}

function NavigationButton({ to, label, variant }: NavigationButtonProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    navigate(to);
  };

  return (
    <Button
      isLoading={isLoading}
      colorScheme="brand"
      w={{ 'base': '90%', 'md': '50%', 'lg': '30%' }}
      variant={variant || 'solid'}
      onClick={ handleClick }
    >
      {label}
    </Button>
  );
}

export default NavigationButton;

import React from "react";
import { Box, useTheme } from "@chakra-ui/react";

interface RegistrationCardProps {
  children: React.ReactNode;
}

function RegistrationCard({ children }: RegistrationCardProps) {
  const theme = useTheme();

  return (
    <Box
      border={"3px solid"}
      borderRadius={5}
      borderColor={"black"}
      boxShadow={`10px 10px ${theme.colors.primaryPurple}`}
    >
      {children}
    </Box>
  );
}

export default RegistrationCard;

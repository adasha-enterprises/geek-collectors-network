import React from "react";
import { Button, ButtonProps, useTheme } from "@chakra-ui/react";

function CustomButton(props: ButtonProps) {
  const theme = useTheme();

  return (
    <Button
      color={theme.colors.primaryWhite}
      backgroundColor={theme.colors.primaryPurple}
      borderRadius={5}
      boxShadow={`5px 5px ${theme.colors.primaryPurple}`}
      border={"3px solid"}
      borderColor={theme.colors.primaryBlack}
      {...props}
    ></Button>
  );
}

export default CustomButton;

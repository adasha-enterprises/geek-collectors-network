import React from "react";
import { Button, ButtonProps, useTheme } from "@chakra-ui/react";

function CustomButton(props: ButtonProps) {
  const theme = useTheme();

  return (
    <Button
      color={theme.colors.primaryWhite}
      fontFamily={theme.font.primaryFont}
      backgroundColor={theme.colors.primaryPurple}
      size={"lg"}
      borderRadius={5}
      boxShadow={`5px 5px ${theme.colors.primaryPurple}`}
      border={"3px solid"}
      borderColor={theme.colors.primaryBlack}
      _placeholder={{ opacity: 1, color: "black " }}
      {...props}
    ></Button>
  );
}

export default CustomButton;

import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

function CustomButton(props: ButtonProps) {
  return (
    <Button
      color="primaryWhite"
      fontFamily="primaryFont"
      backgroundColor="primaryPurple"
      size="lg"
      borderRadius="5"
      boxShadow={"5px 5px var(--chakra-colors-primaryPurple)"}
      border={"3px solid"}
      borderColor="primaryBlack"
      {...props}
    ></Button>
  );
}

export default CustomButton;

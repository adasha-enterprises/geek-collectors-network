import React from "react";
import { Input, InputProps } from "@chakra-ui/react";

function CustomInput(props: InputProps) {
  return (
    <Input
      margin={2}
      border="3px solid"
      borderColor="primaryOrange"
      fontFamily="primaryFont"
      _placeholder={{ opacity: 1, color: "black" }}
      _hover={{ backgroundColor: "customHoverYellow" }}
      focusBorderColor="primaryOrange"
      borderRadius={5}
      boxShadow="5px 5px var(--chakra-colors-primaryOrange)"
      size="lg"
      width="auto"
      {...props}
    />
  );
}

export default CustomInput;

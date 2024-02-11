import React from "react";
import { Input, InputProps, useTheme } from "@chakra-ui/react";

function CustomInput(props: InputProps) {
  const theme = useTheme();

  return (
    <Input
      margin={2}
      border={"3px solid"}
      borderColor={theme.colors.primaryOrange}
      _placeholder={{
        fontFamily: theme.font.primaryFont,
        opacity: 1,
        color: "black",
      }}
      _hover={{ backgroundColor: "#FFD84D" }}
      focusBorderColor={theme.colors.primaryOrange}
      isRequired={true}
      borderRadius={5}
      boxShadow={`5px 5px ${theme.colors.primaryOrange}}`}
      size={"lg"}
      width={"auto"}
      {...props}
    ></Input>
  );
}

export default CustomInput;

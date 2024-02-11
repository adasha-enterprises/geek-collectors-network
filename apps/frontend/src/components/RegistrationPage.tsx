import React from "react";

import CustomInput from "./CustomInput";
import RegistrationCard from "./RegistrationCard";
import CustomButton from "./CustomButton";
import CardSpacer from "./CardSpacer";
import { Text } from "@chakra-ui/react";

function Registration() {
  return (
    <RegistrationCard>
      <CardSpacer>
        <Text
          as="h1"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize={"35"}
          fontWeight={700}
        >
          Register
        </Text>
      </CardSpacer>

      <CardSpacer>
        <CustomInput placeholder="First Name" />
        <CustomInput placeholder="Last Name" />
        <CustomInput placeholder="Email" />
        <CustomInput placeholder="Password" type="password" />
      </CardSpacer>

      <CardSpacer>
        <CustomButton colorScheme="blue">Sign Up</CustomButton>
      </CardSpacer>
    </RegistrationCard>
  );
}

export default Registration;

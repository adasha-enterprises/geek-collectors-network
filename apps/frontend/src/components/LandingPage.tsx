import React from "react";
import { Box, Button, Image, VStack } from "@chakra-ui/react";

function AuthButtons() {

  /* Temporary styles for buttons; to be replaced with Chakra 'useStyleConfig'. */
  const buttonStyles = {
    height: "4em",
    width: {base: "50%", md: "50%"},
    fontSize: {base : "lg", md: "xl"}
  };

  return (
    <VStack w={"100%"} spacing={4}>
      <Button
        h={buttonStyles.height}
        w={buttonStyles.width}
        fontSize={buttonStyles.fontSize}>
          SIGN UP
      </Button>
      <Button
        h={buttonStyles.height}
        w={buttonStyles.width}
        fontSize={buttonStyles.fontSize}>
          LOGIN
      </Button>
    </VStack>
  );
}

function LandingPage() {
  return (
    <VStack
      spacing={4}
      w="100vw"
      h="100vh"
      bg="background.900"
      align="center"
      justify="center">

      {/* GGR Logo -- Placeholder */}
      <Box>
        <Image
          src={"https://via.placeholder.com/200"}
          alt={"Company Logog Placeholder"}
          boxSize={{base: "200px", md: "300px"}}
        />
      </Box>
      <AuthButtons />
    </VStack>
  );
}

export default LandingPage;

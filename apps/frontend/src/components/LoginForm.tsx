import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import React from "react";

function LoginForm() {
    return (
        <VStack spacing={8} w={{ base: "100%", md: "80%", lg: "50%" }}>
            <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
            </FormControl>
            <Button bg={"brand.500"} color={"white"} _hover={{ bg: "brand.600" }} variant="solid" p={6}>
                LOGIN
            </Button>
        </VStack>
    );
}

export default LoginForm;

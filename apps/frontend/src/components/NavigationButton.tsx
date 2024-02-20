import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
    label: string;
    to: string;
}

function NavigationButton({ to, label }: NavigationButtonProps) {
    let navigate = useNavigate();

    return (
        <Button
            colorScheme="brand"
            w={"90%"}
            onClick={ () => navigate(to) }
        >
            {label}
        </Button>
    )
}

export default NavigationButton;

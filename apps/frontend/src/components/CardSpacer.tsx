import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface CardSpacerProps extends BoxProps {
  children: React.ReactNode;
}

function CardSpacer({ children, ...props }: CardSpacerProps) {
  return (
    <Box
      margin={8}
      display={"flex"}
      flexDirection={"column"} // Stacks all children vertically
      alignItems={"center"} // Centers children on cross-axis (horizontally)
      {...props} // Allow additional BoxProps for customization
    >
      {children}
    </Box>
  );
}

export default CardSpacer;

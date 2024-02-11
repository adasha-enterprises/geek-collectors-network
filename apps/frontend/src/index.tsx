import React from "react";
import ReactDOM from "react-dom";

import "./global.styles.scss";
import Registration from "./components/RegistrationPage";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        display={"flex"}
        height={"100vh"}
        width={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Registration />
      </Box>
    </ChakraProvider>
  );
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById("__react_app__")
);

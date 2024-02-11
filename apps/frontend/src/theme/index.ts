import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primaryPurple: '#954eff',
    primaryOrange: '#ff6000',
    primaryBlack: 'black',
    primaryWhite: 'white',
  },
  fonts: {
    primaryFont: "'IBM Plex Mono', monospace",
  },
});

export default theme;

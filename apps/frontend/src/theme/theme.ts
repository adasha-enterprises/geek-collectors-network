import { extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';

export const theme = extendTheme({
  colors: {
    brand: {
      '50': '#fff0e6',
      '100': '#ffddb3',
      '200': '#ffc39a',
      '300': '#ffb380',
      '400': '#ffa467',
      '500': '#FF954D',
      '600': '#ff8634',
      '700': '#ff771a',
      '800': '#ff6700',
      '900': '#ff5d00',
    },
    background: '#FFF6F0',
    text: '#261605',
    greyOut: '#86807A',
  },
  fonts: {
    body: 'Montserrat, sans-serif',
    heading: 'Montserrat, sans-serif',
  },
  styles: {
    global: {
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      },
    },
  },
});

export default theme;

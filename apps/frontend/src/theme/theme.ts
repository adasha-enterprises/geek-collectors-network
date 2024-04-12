import { extendTheme } from '@chakra-ui/react';
import '@fontsource/noto-sans';

export const theme = extendTheme({
  colors: {
    brand: {
      '50': '#fff6ec',
      '100': '#ffdfc2',
      '200': '#ffc598',
      '300': '#ffad6d',
      '400': '#ff953f',
      '500': '#FF802A',
      '600': '#ff741e',
      '700': '#ff6713',
      '800': '#ff5a07',
      '900': '#ff4c00',
    },
    background: {
      '50': '#f2f4f6',
      '100': '#d6dde3',
      '200': '#bac3cc',
      '300': '#9eabb6',
      '400': '#8293a0',
      '500': '#112B45',
      '600': '#0e2337',
      '700': '#0b1a29',
      '800': '#08121b',
      '900': '#050a0d',
    },
    text: '#261605',
    grey: '#86807A',
  },
  fonts: {
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  styles: {
    global: {
      '*': {
        'fontFamily': 'Noto Sans, sans-serif',
        'fontWeight': 'light',
        'margin': 0,
        'padding': 0,
        'boxSizing': 'border-box',

        'listStyle': 'none',
        'textDecoration': 'none',
      },
      'body': {
        'backgroundColor': 'background.50',
        'height': '100vh',
        'width': '100vw',
      },
      'button': {
        'fontWeight': 'light',
      },
      // Site-wide header
      'header': {
        'background': 'background.500',
        'color': 'white',
        'padding': '1rem 2rem',
        'display': 'flex',
        'justifyContent': 'space-between',
        'alignItems': 'center',
        'position': 'fixed',
        'top': 0,
        'height': '5rem',
        'width': '100%',
        'zIndex': 999,
        'a': {
          'fontSize': '0.5rem',
        },
        'button': {
          'backgroundColor': 'transparent',
          'color': 'white',
        },
        '.gcn': {
          'color': 'brand.500',
          'fontFamily': 'Noto Sans, sans-serif',
          'fontWeight': 'normal',
          '_hover': {
            'cursor': 'pointer',
          },
        },
        '.navigation-links': {
          'display': 'flex',
          'justifyContent': 'end',
          'gap': '1.5rem',
          'width': '100%',
          'a': {
            'color': 'grey',
            'fontSize': '1rem',
            ':hover': {
              'color': 'brand.500',
              'textDecoration': 'underline',
            },
          },
          '.active': {
            'color': 'brand.500',
            'fontWeight': 'bold',
          },
        },
      },
      // Hamburger menu
      '.hamburger-header': {
        'background': 'background.500',
        'color': 'white',
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'center',
        'cursor': 'pointer',
        'height': '10rem',
        'position': 'relative',
        'h2': {
          'fontFamily': 'Noto Sans, sans-serif',
          'fontSize': '1.5rem',
          'fontWeight': 'normal',
          'margin': '1rem 0 0',
        },
      },
      '.hamburger-body': {
        'padding': '2rem 0',
        'color': 'grey',
        'a': {
          'color': 'grey',
          'fontSize': '1.2rem',
          ':hover': {
            'color': 'brand.500',
            'fontWeight': 'bold',
          },
        },
        'ul': {
          'padding': '2rem 3rem',
          'li': {
            'margin': '0 0 2rem',
            '_hover': {
              'opacity': '0.8',
              'cursor': 'pointer',
            },
          },
        },
      },
      'form': {
        'background': 'white',
        'borderRadius': '0.5rem',
        'padding': '3rem',
        'width': '100%',
        'maxWidth': '30rem',
        'button': {
          'fontWeight': 'light',
          'padding': '1.7rem',
          'margin': '1.5rem 0 0',
          'width': '100%',
        },
        'label': {
          'color': 'grey',
        },
        'input': {
          'background': 'white',
          'boxShadow': 'none',
        },
      },
      // General container
      '.container': {
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'justifyContent': 'center',
        'padding': '10rem 0',
        'width': '100%',
      },
      // Loading animation
      '.loading-animation': {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
      },
      // Landing page - Navy blue background
      '.background': {
        'backgroundColor': 'background.500',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'justifyContent': 'center',
        'height': '100vh',
        'width': '100vw',
      },
      '.motto': {
        'color': 'white',
        'fontSize': '1.2rem',
        'margin': '3.5rem 0 0',
      },
      '.navigation-buttons': {
        'gap': '0.2rem',
        'margin': '7rem 0 0',
        'width': '100%',
        'maxWidth': '40rem',
        '.navigation-button': {
          'borderRadius': '0',
          'fontWeight': 'light',
          'padding': '2.1rem',
          'width': '100%',
          '&.signup': {
            'backgroundColor': 'brand.500',
            'color': 'white',
            '&:hover': {
              'opacity': '0.8',
            },
          },
          '&.login': {
            'color': 'background.500',
            '&:hover': {
              'opacity': '0.8',
            },
          },
        },
      },
      // Login and registration pages
      '.login-form, .registration-form': {
        'width': '80%',
        'background': 'background.500',
        'label': {
          'color': 'white',
          'fontSize': '1.2rem',
        },
        'input': {
          'background': 'white',
          'padding': '1.7rem',
          'margin': '0.5rem 0',
        },
        'a': {
          'color': 'grey',
          'fontSize': '1rem',
          '_hover': {
            'color': 'brand.100',
          },
        },
      },
      // Account info and profile pages
      '.account-form, .profile-form': {
        'width': '80%',
        'maxWidth': '30rem',
        'label': {
          'color': 'grey',
        },
        'input': {
          'background': 'white',
          'border': 'none',
          'boxShadow': 'none',
          '_focus': {
            'boxShadow': 'none',
          },
        },
        '.submit-button': {
          'fontWeight': 'light',
          'padding': '1.7rem',
          'margin': '1.5rem 0 0',
          'width': '100%',
        },
      },
      // Profile page
      '.profile-form': {
        'textarea': {
          'border': 'none',
          'resize': 'none',
          '_focus': {
            'boxShadow': 'none',
          },
        },
        '.tag-container': {
          'display': 'flex',
          'flexWrap': 'wrap',
          'gap': '0.5rem',
          'margin': '1rem 0 0',
        },
        '.tag-close-button': {
          'padding': '0',
          'margin': '0 0 0 0.2rem',
        },
      },
      '.avatar': {
        'margin': '0 0 1rem',
      },
      '.profile': {
        'background': 'white',
        'borderRadius': '0.5rem',
        'padding': '3rem',
        'width': '80%',
        'maxWidth': '30rem',
        '.profile-section': {
          'margin': '1.2rem 0 0',
          'h1': {
            'margin': '0 0 0.5rem',
          },
          'h2': {
            'color': 'grey',
            'fontSize': '1.2rem',
            'fontWeight': 'normal',
            'margin': '0 0 0.5rem',
          },
        },
      },
      // User list page
      '.tabs': {
        'gap': '0.2rem',
      },
      '.tag-panel': {
        'p': {
          'textAlign': 'center',
          'margin': '1rem 0',
        },
      },
      // Search bar
      '.search-bar': {
        'display': 'flex',
        'margin': '0 0 1rem',
        '.search-icon': {
          'color': 'grey',
          'height': '100%',
        },
        'input': {
          'background': 'white',
          'padding': '1.7rem 2.2rem',
        },
        '.clear-button': {
          'height': '100%',
          'button': {
            'background': 'transparent',
            'color': 'grey',
            '_active': {
              'color': 'brand.500',
            },
            '_hover': {
              'boxShadow': 'none',
            },
          },
        },
      },
      // Friend list page
      '.friends-list': {
        'width': '90%',
        'maxWidth': '30rem',
        'h1': {
          'margin': '0 0 1rem',
        },
        'p': {
          'margin': '1rem 0',
        },
      },
      '.profile-card': {
        'background': 'white',
        'alignItems': 'center',
        'border': '1px solid lightgrey',
        'borderRadius': '0.5rem',
        'gap': '1rem',
        'padding': '1rem',
        'width': '100%',
        '_hover': {
          'boxShadow': '0 0 2px 0.5px lightgrey',
          'cursor': 'pointer',
        },
        'div': {
          'display': 'flex',
          'alignItems': 'center',
          'gap': '1rem',
        },
        'img': {
          'borderRadius': '50%',
          'height': '3rem',
          'width': '3rem',
        },
        'h2': {
          'fontColor': 'text',
          'fontSize': '1.2rem',
          'fontWeight': 'normal',
          'margin': '0',
        },
        '.contact-buttons': {
          'gap': '0.5rem',
          'justifyContent': 'end',
          'button': {
            'backgroundColor': 'transparent',
            '_hover': {
              'cursor': 'pointer',
              'zIndex': 1,
            },
          },
        },
      },
      // Item list page
      '.item-list': {
        'width': '90%',
        '.search-bar': {
          'width': '100%',
          'maxWidth': '30rem',
        },
      },
      // Modal
      '.modal': {
        '.modal-header': {
          'position': 'relative',
          'background': 'background.500',
          'color': 'white',
          'padding': '1rem 2rem',
          'p': {
            'margin': '0 1rem 0 0',
          },
        },
        '.close-button': {
          'color': 'white',
          'position': 'absolute',
          'right': '1rem',
          'top': '1rem',
          'zIndex': 999,
        },
        '.modal-body': {
          'padding': '1rem',
          'gap': '1rem',
          'a': {
            'color': 'grey',
            'fontSize': '1rem',
            ':hover': {
              'color': 'brand.500',
            },
            'svg': {
              'margin': '0 0 0 0.5rem',
            },
          },
        },
        '.modal-footer': {
          'gap': '1rem',
          'justifyContent': 'end',
          'margin': '0 0 1rem',
          'button': {
            'fontWeight': 'light',
            'width': '10rem',
          },
        },
      },
      // Item card
      '.item-card': {
        'borderRadius': '0.5rem',
        'cursor': 'pointer',
        'transition': 'transform 0.2s',
        'padding': '1rem',
        'width': '100%',
        '_hover': {
          'transform': 'scale(1.02)',
        },
        '.item-card-body': {
          'padding': '1rem',
          'h2': {
            'fontSize': '1.2rem',
            'margin': '1rem 0',
          },
          'p': {
            'color': 'grey',
            'fontSize': '1rem',
            'margin': '0',
          },
        },
        '.action-buttons': {
          'gap': '1rem',
          'justifyContent': 'end',
        },
      },
    },
  },
  components: {},
});

export default theme;

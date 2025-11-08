import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00b0ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0069c0',
    },
    background: {
      default: '#f6f7f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b6b6b',
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: 14,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#00b0ff',
          color: '#fff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00b0ff',
          color: '#fff',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;

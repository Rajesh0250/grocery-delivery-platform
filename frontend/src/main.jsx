import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: { mode: 'light', primary: { main: '#2e7d32' }, secondary: { main: '#ff8f00' } },
  typography: { fontFamily: 'Inter, Roboto, sans-serif' }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

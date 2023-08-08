import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import App from './components/App';
import LogIn from './views/authorization/log-in/LogIn';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LogIn />
  </StrictMode>
);

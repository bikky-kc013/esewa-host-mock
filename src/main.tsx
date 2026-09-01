import './host/forceLightTheme'; // MUST be first — patches matchMedia before ESewaThemeProvider reads it
// UA is already spoofed synchronously in index.html <script> before any import
// Install Host bridge BEFORE importing any esewa-ui-library code (library evaluates UA at import)
import { installHostBridge } from './host/bridge';
installHostBridge();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'esewa-ui-library/dist/index.css';
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Install mock BEFORE any app code - respects import.meta.env.DEV
if (import.meta.env.DEV) {
  await import('../mockEsewaHost');
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../mockEsewaHost'; // ensures HMR keeps it - safe due to guard

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

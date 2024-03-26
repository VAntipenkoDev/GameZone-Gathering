import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  throw new Error('Not root element');
}

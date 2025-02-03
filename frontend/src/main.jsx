import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { ColorProvider } from './AdminComponents/ColorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ColorProvider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // o tu componente principal de rutas
import './index.css';

const container = document.getElementById('root');

// Verificamos si ya existe una raíz para no duplicarla
if (!container._reactRootContainer) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
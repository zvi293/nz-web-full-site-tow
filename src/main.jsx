import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const rootElement = document.getElementById('root');

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* When the page was pre-rendered at build time (#root already has markup),
   hydrate it instead of throwing the static HTML away. Falls back to a
   normal client render for dev / non-prerendered output. */
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree);
} else {
  createRoot(rootElement).render(tree);
}

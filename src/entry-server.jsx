/* Server entry — used only at build time by prerender.mjs to turn
   each route into fully-rendered static HTML (so crawlers never see
   an empty SPA shell). It is NOT shipped to the browser. */
import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { ROUTES, getRouteByPath, canonicalFor } from './App.jsx';
import { renderSeo } from './seo.js';

export { ROUTES, getRouteByPath, canonicalFor };

export function render(pathname) {
  const route = getRouteByPath(pathname);
  const html = renderToString(
    <React.StrictMode>
      <App initialPath={route.path} />
    </React.StrictMode>
  );
  return { html, route, head: renderSeo(route) };
}

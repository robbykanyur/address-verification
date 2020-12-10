import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import App from './app'


ReactDOM.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>, document.getElementById('root')
);

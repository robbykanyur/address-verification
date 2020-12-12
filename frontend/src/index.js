import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import LoadingIndicator from './Components/LoadingIndicator'

import App from './app'

ReactDOM.render(
  <MemoryRouter>
    <LoadingIndicator />
    <App />
  </MemoryRouter>, document.getElementById('root')
);

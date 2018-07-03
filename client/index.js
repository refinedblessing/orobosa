import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const render = Component => ReactDOM.render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('root'),
);

render(App);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept('./components/App.jsx', () => render(App));


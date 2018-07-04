import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import store from './store';


const render = Component => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Component />
    </Provider>
  </AppContainer>,
  document.getElementById('root'),
);

render(App);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept('./components/App.jsx', () => render(App));


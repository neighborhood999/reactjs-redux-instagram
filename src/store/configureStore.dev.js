import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
// import { persistState } from 'redux-devtools';
// import DevTools from '../utilitys/DevTools';
import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(browserHistory);
const enhancer = compose(
  applyMiddleware(thunk, router, logger),
  typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

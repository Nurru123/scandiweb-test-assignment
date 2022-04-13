import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import store from './Redux/store';
import { Provider } from "react-redux";


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider  store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();

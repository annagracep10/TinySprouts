import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AlertProvider } from './AlertContext.jsx';
import AlertBox from './components/AlertBox.jsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:9090/graphql', 
  cache: new InMemoryCache(),
});

// Step 2: Wrap your application with ApolloProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}> 
      <AlertProvider>
        <App />
        <AlertBox />
      </AlertProvider>
    </ApolloProvider>
  </React.StrictMode>
);

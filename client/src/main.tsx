// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'sonner';
import './index.css';
import i18n from './i18n';
import store from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <Toaster
          theme="system"
          richColors
          closeButton
          position="bottom-center"
          toastOptions={{ duration: 2500 }}
        />
        <App />
      </I18nextProvider>
    </ReduxProvider>
  </React.StrictMode>
);

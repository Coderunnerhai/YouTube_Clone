import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from "./components/MainRoutes";
import { UserProvider } from "./components/UserContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
      <MainRoutes />
    </UserProvider>
  </BrowserRouter>
);


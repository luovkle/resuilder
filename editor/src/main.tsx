import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./services/queries";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithRedirectCallback } from "./components";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithRedirectCallback>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </Auth0ProviderWithRedirectCallback>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PdfProvider } from "./context/PdfContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PdfProvider>
        <App />
      </PdfProvider>
    </BrowserRouter>
  </React.StrictMode>
);

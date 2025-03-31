import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster as SonnerToaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <SonnerToaster
      position="bottom-right"
      richColors
      offset={100}
      closeButton
      toastOptions={{
        duration: 5 * 1000, // 5secs
      }}
    />
  </StrictMode>
);

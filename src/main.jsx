import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import App from "./App.jsx";
import "../firebase.js";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
            <ToastContainer theme="dark" position="top-right" autoClose={3000} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
  </StrictMode>,
);

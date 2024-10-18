import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./index.css";

import App from "./App"; // Ensure this path is correct
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Ensure the path is correct for the store

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PrimeReactProvider>
        <App /> {/* This assumes App contains your routes */}
    </PrimeReactProvider>
  </Provider>
);

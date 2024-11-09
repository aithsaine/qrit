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
import Pusher from "pusher-js";
import Echo from "laravel-echo";
const root = ReactDOM.createRoot(document.getElementById("root"));

if (!window.Pusher) {
  window.Pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    forceTLS: true
  });

}
if (!window.Echo) {
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  });
}
if (!window.Pusher) {
  console.log("noooooo pusher")
} if (!window.Echo) {
  console.log("noooooo echo")
}


root.render(
  <Provider store={store}>
    <PrimeReactProvider>
        <App /> {/* This assumes App contains your routes */}
    </PrimeReactProvider>
  </Provider>
);
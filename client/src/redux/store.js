import { legacy_createStore } from "redux";
import mainReducer from "./mainReducer";

export const store = legacy_createStore(mainReducer)
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./session";

const store = configureStore({ reducer });

export default store;

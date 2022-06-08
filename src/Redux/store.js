import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice";

export default configureStore({
	reducer : {
		app : appReducer
	},
	middleware : (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	})
});
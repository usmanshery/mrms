import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import httpMethods from "./api";

export const uploaderCall = createAction("apiCall");

const uploader = (state) => (next) => async (action) => {
	let { dispatch } = state;
	if (action.type !== uploaderCall.type) return next(action);

	const { onSuccess, onFailure, url, callParams } = action.payload;

	if (callParams.method === httpMethods.post) {
		axios
			.post(url, callParams.data, {})
			.then((response) => {
				if (onSuccess) dispatch({ type: onSuccess, payload: response });
			})
			.catch((err) => {
				if (onFailure) {
					dispatch({ type: onFailure, payload: err });
				}
			});
	}
};

export default uploader;

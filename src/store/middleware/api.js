import { createAction } from "@reduxjs/toolkit";

export const apiCall = createAction("apiCall");
export const httpHeaders = { "Content-Type": "application/json" };
export const httpMethods = {
	get: "GET",
	put: "PUT",
	post: "POST",
	delete: "DELETE",
};

/*
	Required:
	-	url
	-	method
	-	headers
	-	body
	-	onSuccess
	-	onFailure
*/

const debug = false;

const api = (state) => (next) => async (action) => {
	let { dispatch } = state;
	log("action", action);
	if (action.type !== apiCall.type) return next(action);

	const { onSuccess, onFailure, url, callParams, cb } = action.payload;
	log("url", action.payload.url);
	log("url", callParams);

	fetch(url, { ...callParams })
		.then((response) => response.json())
		.then((response) => {
			log("response", response);
			if (cb && typeof cb === "function") {
				cb(response);
			}
			if (onSuccess) dispatch({ type: onSuccess, payload: response });
		})
		.catch((err) => {
			log("error", err);
			if (onFailure) {
				dispatch({ type: onFailure, payload: err });
			}
		});
};

function log(type, data) {
	if (debug) console.log("MIDDLEWARE<API> -> " + type + ": ", data);
}

export default api;

import { onFailure } from "../session";
import { onPageLoad, onUserLogin, onUserLogout, onUserAdd, onUserUpdate, onUserSearch, onUserView, onUserEdit, onUserPopCallback } from "../session";
import { apiCall, httpHeaders, httpMethods } from "../middleware/api";

// values for toast notifications
export const userModuleNotifications = {
	loginSuccess: "Login Success",
	loginFailure: "Login Failure",

	logoutSuccess: "Logout Success",
	logoutFailure: "Logout Failure",

	regSuccess: "User Registered Successfuly",
	regFailure: "Could Not Add New User",

	updateSuccess: "User Updated Successfuly",
	updateFailure: "Could Not Update The User",

	searchSuccess: "Search Results Updated",
	searchFailure: "Search Failed",
};

export const userModuleActions = {
	regNew: "Register User",
	updateExisting: "Update User",
	viewOnly: "View User Details",
};

// urls
const loginUrl = "users/login";
const logoutUrl = "users/logout";
const registerUrl = "users/insert";
const updateUrl = "users/updateUserById";
const searchUserUrl = "users/searchUser";
const resumeSessionUrl = "users/getUserSession";


// -- user
export const loginUserAction = (username, password) =>
	apiCall({
		url: loginUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			credentials: "include",
			body: JSON.stringify({
				username,
				password
			}),
		},
		onSuccess: onUserLogin.type,
		onFailure: onFailure.type,
	});

export const logoutUserAction = () =>
	apiCall({
		url: logoutUrl,
		callParams: {
			method: httpMethods.get,
			headers: httpHeaders,
			credentials: "include",
		},
		onSuccess: onUserLogout.type,
		onFailure: onFailure.type,
	});

export const registerUserAction = (profile) =>
	apiCall({
		url: registerUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			credentials: "include",
			body: JSON.stringify({
				profile,
			}),
		},
		onSuccess: onUserAdd.type,
		onFailure: onFailure.type,
	});

export const updateUserAction = (userId, profile) =>
	apiCall({
		url: updateUrl,
		callParams: {
			method: httpMethods.put,
			headers: httpHeaders,
			credentials: "include",
			body: JSON.stringify({
				id: userId,
				profile,
			}),
		},
		onSuccess: onUserUpdate.type,
		onFailure: onFailure.type,
	});

export const searchUserAction = (profile) =>
	apiCall({
		url: searchUserUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			credentials: "include",
			body: JSON.stringify({
				profile,
			}),
		},
		onSuccess: onUserSearch.type,
		onFailure: onFailure.type,
	});

export const removeUserCbAction = (callbackAction) => onUserPopCallback({ callbackAction });

export const viewUserAction = (userId, userData) => onUserView({ userId, userData });

export const editUserAction = (userId, userData) => onUserEdit({ userId, userData });

export const pageLoadAction = () =>
	apiCall({
		url: resumeSessionUrl,
		callParams: {
			method: httpMethods.get,
			headers: httpHeaders,
			credentials: "include",
		},
		onSuccess: onPageLoad.type,
		onFailure: onPageLoad.type,
	});
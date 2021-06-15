import { onFailure, onStationCaseLoad, onStationCaseEdit, onStationCaseUpdated, onStationStaffLoad } from "../session";
import { apiCall, httpHeaders, httpMethods } from "../middleware/api";

// values for toast notifications
export const stationModuleNotifications = {
	regSuccess: "Station Added Successfuly",
	regFailure: "Could Not Add New Station",

	caseAddSuccess: "New Case Added Successfuly",
	caseAddFailure: "Couldn't Add New Case",

	caseUpdateSuccess: "Case Updated Successfuly",
	caseUpdateFailure: "Case Update Failed",

	searchSuccess: "Search Results Updated",
	searchFailure: "Search Failed",
};

export const stationModuleActions = {
	regNew: "Register Station",
	updateExisting: "Update Profile",
	viewOnly: "View Only",
};

// urls
const caseLoadUrl = "stations/loadCases";
const staffLoadUrl = "stations/loadStaff";
const updateCaseUrl = "stations/updateCase";

// -- cases
export const loadCasesAction = () =>
	apiCall({
		url: caseLoadUrl,
		callParams: {
			method: httpMethods.get,
			headers: httpHeaders,
			credentials: "include",
		},
		onSuccess: onStationCaseLoad.type,
		onFailure: onFailure.type,
	});

export const loadStaffAction = () =>
	apiCall({
		url: staffLoadUrl,
		callParams: {
			method: httpMethods.get,
			headers: httpHeaders,
			credentials: "include",
		},
		onSuccess: onStationStaffLoad.type,
		onFailure: onFailure.type,
	});

export const editCaseAction = (caseId) => onStationCaseEdit({ caseId });

export const stationCaseUpdatedAction = (caseId, caseCategory, caseDetails, station) =>
	apiCall({
		url: updateCaseUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				caseId,
				caseCategory,
				caseDetails,
				station,
			}),
		},
		onSuccess: onStationCaseUpdated.type,
		onFailure: onFailure.type,
	});

import { onFailure } from "../session";
import {
	onPatientRegister,
	onPatientRegisterBackup,
	onPatientPopCallback,
	onPatientSearch,
	onPatientClose,
	onPatientView,
	onPatientEdit,
	onCaseEdit,
	onCaseNew,
	onCaseAdded,
	onCaseUpdated,
} from "../session";
import { apiCall, httpHeaders, httpMethods } from "../middleware/api";

// values for toast notifications
export const patientModuleNotifications = {
	regSuccess: "Patient Added Successfuly",
	regFailure: "Could Not Add New Patient",

	caseAddSuccess: "New Case Added Successfuly",
	caseAddFailure: "Couldn't Add New Case",

	caseUpdateSuccess: "Case Updated",
	caseUpdateFailure: "Case Update Failed",

	searchSuccess: "Search Results Updated",
	searchFailure: "Search Failed",
};

export const patientModuleActions = {
	regNew: "Register Patient",
	updateExisting: "Update Profile",
	viewOnly: "View Only",
};

// urls
const registerUrl = "patients/insertprofile";
const searchProfileUrl = "patients/searchprofile";

const insertCaseUrl = "patients/insertCase";
const updateCaseUrl = "patients/updateCase";
// const searchCasesUrl = "patients/searchcases";

// -- patient
export const registerPatientAction = (profile) =>
	apiCall({
		url: registerUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				profile,
			}),
		},
		onSuccess: onPatientRegister.type,
		onFailure: onFailure.type,
	});

export const searchPatientProfileAction = (profile) =>
	apiCall({
		url: searchProfileUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				profile,
			}),
		},
		onSuccess: onPatientSearch.type,
		onFailure: onFailure.type,
	});

export const patientRegistrationDataBackupAction = (backup) => onPatientRegisterBackup({ backup });

export const removePatientCbAction = (callbackAction) => onPatientPopCallback({ callbackAction });

export const viewPatientAction = (patientId, patientData) => onPatientView({ patientId, patientData });

export const editPatientAction = (patientId, patientData) => onPatientEdit({ patientId, patientData });

export const insertCaseAction = (patientId, caseCategory, caseDetails) =>
	apiCall({
		url: insertCaseUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				patientId,
				caseCategory,
				caseDetails,
			}),
		},
		onSuccess: onCaseAdded.type,
		onFailure: onFailure.type,
	});

export const updateCaseAction = (caseId, caseCategory, caseDetails) =>
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
			}),
		},
		onSuccess: onCaseUpdated.type,
		onFailure: onFailure.type,
	});

export const editCaseAction = (caseId) => onCaseEdit({ caseId });

export const newCaseAction = (newCaseCategory) => onCaseNew({ newCaseCategory });

export const closePatientAction = () => onPatientClose({});

// export const registerPatientBackup = (backup) => onPatientRegisterBackup({ backup });

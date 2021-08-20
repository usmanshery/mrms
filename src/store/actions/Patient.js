import { onFailure } from "../session";
import {
	onPatientRegister,
	onPatientUpdate,
	onPatientPopCallback,
	onPatientSearch,
	onPatientClose,
	onPatientView,
	onPatientEdit,
	onCaseEdit,
	onCaseNew,
	onCaseAdded,
	onCaseUpdated,
	onCaseSearch,
	onCaseSearchProfileLoad,
	onFileDeleted,
	onFileUploaded,
	onPatientValueBackup,
} from "../session";
import { apiCall, httpHeaders, httpMethods } from "../middleware/api";
// import { uploaderCall } from "../middleware/uploader";

// values for toast notifications
export const patientModuleNotifications = {
	regSuccess: "Patient Added Successfuly",
	regFailure: "Could Not Add New Patient",

	updateSuccess: "Patient Profile Updated Successfuly",
	updateFailure: "Patient Profile Update Failed",

	caseAddSuccess: "New Case Added Successfuly",
	caseAddFailure: "Couldn't Add New Case",

	caseUpdateSuccess: "Case Updated",
	caseUpdateFailure: "Case Update Failed",

	searchSuccess: "Search Results Updated",
	searchFailure: "Search Failed",

	uploadSuccess: "File(s) uploaded successfuly",
	uploadFailure: "File(s) upload failed",

	uploadRemoveSuccess: "File deleted successfuly",
	uploadRemoveFailure: "File deletion failed",
};

export const patientModuleActions = {
	regNew: "Register Patient",
	updateExisting: "Update Profile",
	viewOnly: "View Only",
};

export const patientModuleSearchTypes = {
	patient: "Patient Search",
	case: "Case Search",
};

// urls
const registerUrl = "patients/insertprofile";
const updateUrl = "patients/updateProfileById";
const searchProfileUrl = "patients/searchprofile";

const insertCaseUrl = "patients/insertCase";
const updateCaseUrl = "patients/updateCase";
const searchCasesUrl = "patients/searchcase";

const deleteFileUrl = "patients/removeAttachment";
const uploadFileUrl = "patients/uploadAttachment";

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

export const updatePatientAction = (patientId, profile) =>
	apiCall({
		url: updateUrl,
		callParams: {
			method: httpMethods.put,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				id: patientId,
				profile,
			}),
		},
		onSuccess: onPatientUpdate.type,
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

export const updateCaseAction = (caseId, caseCategory, caseDetails, cb) =>
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
		cb,
		onSuccess: onCaseUpdated.type,
		onFailure: onFailure.type,
	});

export const searchPatientCaseAction = (searchParams) =>
	apiCall({
		url: searchCasesUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				...searchParams,
			}),
		},
		onSuccess: onCaseSearch.type,
		onFailure: onFailure.type,
	});

export const editCaseAction = (caseId) => onCaseEdit({ caseId });

export const newCaseAction = (newCaseCategory) => onCaseNew({ newCaseCategory });

export const caseSearchProfileLoadAction = (patientId) => apiCall({
	url: searchProfileUrl,
	callParams: {
		method: httpMethods.post,
		headers: httpHeaders,
		// credentials: "include",
		body: JSON.stringify({
			profile: {
				_id: patientId
			},
		}),
	},
	onSuccess: onCaseSearchProfileLoad.type,
	onFailure: onFailure.type,
});

export const closePatientAction = () => onPatientClose({});

export const deleteFileAction = (fileId, caseId) =>
	apiCall({
		url: deleteFileUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				fileId,
				caseId,
			}),
		},
		onSuccess: onFileDeleted.type,
		onFailure: onFailure.type,
	});

export const uploadFileAction = (data) =>
	apiCall({
		url: uploadFileUrl,
		callParams: {
			method: httpMethods.post,
			// headers: httpHeaders,
			// credentials: "include",
			body: data,
		},
		onSuccess: onFileUploaded.type,
		onFailure: onFailure.type,
	});

export const patientValueBackupAction = (map) => onPatientValueBackup(map);

// export const registerPatientBackup = (backup) => onPatientRegisterBackup({ backup });

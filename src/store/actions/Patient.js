import { onPatientRegister, onPatientRegisterBackup, onFailure } from "../session";
import { apiCall, httpHeaders, httpMethods } from "../middleware/api";

// urls
const registerUrl = "patients/insertprofile";

// -- patient
export const registerPatient = (profile) => {
	return apiCall({
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
};

export const registerPatientBackup = (backup) => onPatientRegisterBackup({ backup });

// export const registerPatientBackup = (backup) => onPatientRegisterBackup({ backup });

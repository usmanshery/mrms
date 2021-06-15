import { onFailure, onAdminCaseLoad, onAdminCaseEdit, onAdminCaseUpdated } from "../session";
import { apiCall, httpHeaders, httpMethods } from "../middleware/api";

// values for toast notifications
export const adminModuleNotifications = {
	caseUpdateSuccess: "Case Updated Successfuly",
	caseUpdateFailure: "Case Update Failed",
};

// urls
const caseLoadUrl = "admin/loadCases";
const updateCaseUrl = "admin/updateCase";

// -- pending cases for approval
export const loadCasesAction = () =>
	apiCall({
		url: caseLoadUrl,
		callParams: {
			method: httpMethods.get,
			headers: httpHeaders,
			credentials: "include",
		},
		onSuccess: onAdminCaseLoad.type,
		onFailure: onFailure.type,
	});

export const editCaseAction = (caseId) => onAdminCaseEdit({ caseId });

export const adminCaseUpdatedAction = (caseId, approval) =>
	apiCall({
		url: updateCaseUrl,
		callParams: {
			method: httpMethods.post,
			headers: httpHeaders,
			// credentials: "include",
			body: JSON.stringify({
				caseId,
				approved: approval,
			}),
		},
		onSuccess: onAdminCaseUpdated.type,
		onFailure: onFailure.type,
	});

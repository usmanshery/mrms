import { createSlice } from "@reduxjs/toolkit";
import { patientModuleNotifications } from "./actions/Patient";
import { navModules, patientPages } from "./actions/Navigation";
import { notificationType } from "./misc/global";

const initialState = {
	loading: false,
	loggedIn: false,
	notifications: [],
	activeModule: navModules.patient,
	patientModule: {
		activePage: patientPages.test,
		// new patient data being added
		newPatientData: undefined,
		// search results
		searchResults: undefined,
		// under process patient profile
		activePatientId: undefined,
		activePatientCaseId: undefined,
		activePatientData: undefined,
		activePatientEditable: false,
		activePatientNewCase: undefined,
		// callbacks
		callbackActions: [],
	},
};

const slice = createSlice({
	name: "session",
	initialState,
	reducers: {
		onModuleSelect: (state, action) => {
			let selectedModule = action.payload.module;
			return {
				...state,
				activeModule: selectedModule,
			};
		},

		// patient module specific
		onPatientPageSelect: (state, action) => {
			let selectedPage = action.payload.page;
			if (selectedPage === state.patientModule.activePage) return state;
			if (selectedPage === patientPages.view || selectedPage === patientPages.update) {
				if (!state.patientModule.activePatientId) return state;
			}
			let activePatientEditable = state.patientModule.activePatientEditable;
			if (selectedPage === patientPages.view) {
				activePatientEditable = false;
			}
			if (selectedPage === patientPages.update) {
				activePatientEditable = true;
			}
			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePage: selectedPage,
					activePatientEditable,
				},
			};
		},

		onPatientRegister: (state, action) => {
			let activePatientId = action.payload.profile._id;
			let activePatientData = action.payload.profile;

			if (action.payload.success) {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						callbackActions: [...state.patientModule.callbackActions, patientModuleNotifications.regSuccess],
						activePage: patientPages.update,
						activePatientId,
						activePatientData,
						activePatientEditable: true,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: patientModuleNotifications.regSuccess,
						},
					],
				};
			} else {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						callbackActions: [...state.patientModule.callbackActions, patientModuleNotifications.regFailure],
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.red,
							message: action.payload.error,
						},
					],
				};
			}
		},

		onPatientSearch: (state, action) => {
			if (action.payload.success) {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						searchResults: action.payload.profiles,
						callbackActions: [...state.patientModule.callbackActions, patientModuleNotifications.searchSuccess],
					},
				};
			} else {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						callbackActions: [...state.patientModule.callbackActions, patientModuleNotifications.searchFailure],
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.red,
							message: action.payload.error,
						},
					],
				};
			}
		},

		onPatientView: (state, action) => {
			let activePatientId = action.payload.patientId;
			let activePatientData = action.payload.patientData;
			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePage: patientPages.view,
					activePatientId,
					activePatientData,
					activePatientEditable: false,
					activePatientNewCase: undefined,
					activePatientCaseId: undefined,
				},
			};
		},

		onPatientEdit: (state, action) => {
			let activePatientId = action.payload.patientId;
			let activePatientData = action.payload.patientData;

			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePage: patientPages.update,
					activePatientId,
					activePatientData,
					activePatientEditable: true,
					activePatientNewCase: undefined,
					activePatientCaseId: undefined,
				},
			};
		},

		onCaseAdded: (state, action) => {
			console.log("on case added session", action.payload.caseDoc);
			if (action.payload.success) {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						activePatientCaseId: action.payload.caseDoc._id,
						activePatientData: {
							...state.patientModule.activePatientData,
							cases: [...state.patientModule.activePatientData.cases, action.payload.caseDoc],
						},
						activePatientNewCase: undefined,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: patientModuleNotifications.caseAddSuccess,
						},
					],
				};
			} else {
				return {
					...state,
					notifications: [
						...state.notifications,
						{
							type: notificationType.red,
							message: patientModuleNotifications.caseAddFailure,
						},
					],
				};
			}
		},

		onCaseUpdated: (state, action) => {
			if (action.payload.success) {
				let { category, caseDoc } = action.payload;
				return {
					...state,
					patientModule: {
						...state.patientModule,
						activePatientCaseId: caseDoc._id,
						activePatientData: {
							...state.patientModule.activePatientData,
							cases: [
								...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id !== caseDoc._id),
								{
									...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id === caseDoc._id)[0],
									[category]: caseDoc,
								},
							],
						},
						activePatientNewCase: undefined,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: patientModuleNotifications.caseUpdateSuccess,
						},
					],
				};
			} else {
				return {
					...state,
					notifications: [
						...state.notifications,
						{
							type: notificationType.red,
							message: patientModuleNotifications.caseUpdateFailure,
						},
					],
				};
			}
		},

		onCaseEdit: (state, action) => {
			let caseId = action.payload.caseId;

			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePatientCaseId: caseId,
				},
			};
		},

		onCaseNew: (state, action) => {
			let activePatientNewCase = action.payload.newCaseCategory;
			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePatientNewCase,
				},
			};
		},

		onPatientClose: (state, action) => {
			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePatientId: undefined,
					activePatientData: undefined,
					activePatientCaseId: undefined,
				},
			};
		},

		// keep form state when new patient is unmounted
		onPatientRegisterBackup: (state, action) => {
			return {
				...state,
				patientModule: {
					...state.patientModule,
					newPatientData: action.payload.backup,
				},
			};
		},

		// pop callback from callback actions for patient component
		onPatientPopCallback: (state, action) => {
			return {
				...state,
				patientModule: {
					...state.patientModule,
					callbackActions: state.patientModule.callbackActions.filter((cbAction) => cbAction !== action.payload.callbackAction),
				},
			};
		},

		// in case of any error
		onFailure: (state, action) => {
			console.log("Failure occured");
			console.log("Detail:", action);
			return state;
		},

		// clear notifications
		onNotificationPop: (state, action) => {
			return {
				...state,
				notifications: state.notifications.filter((notification) => action.payload.currentNotifications.includes(notification)),
			};
		},
	},
});

export const { onFailure } = slice.actions;
export const { onNotificationPop } = slice.actions;
export const { onModuleSelect, onPatientPageSelect } = slice.actions;
export const {
	onVerifyPatientInfo,
	onPatientRegister,
	onPatientSearch,
	onPatientRegisterBackup,
	onPatientPopCallback,
	onPatientClose,
	onPatientView,
	onPatientEdit,
	onCaseEdit,
	onCaseNew,
	onCaseAdded,
	onCaseUpdated,
} = slice.actions;
export default slice.reducer;

// temporary: move to notification handler
// Dispatchable actions

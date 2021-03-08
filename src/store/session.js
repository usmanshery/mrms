import { createSlice } from "@reduxjs/toolkit";
const citiesCollection = require("./pk.json").map((cityDetails) => {
	return cityDetails.city + ", " + cityDetails.admin_name;
});

const initialState = {
	loading: false,
	loggedIn: false,
	activeModule: undefined,
	patientModule: {
		activePage: undefined,
		// new patient data being added
		newPatientData: undefined,
		// search params and resulted selection
		searchParams: undefined,
		activePatientId: undefined,
		activeCaseId: undefined,
		activePatientData: undefined,
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
			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePage: selectedPage,
					activePatientId: undefined,
					activeCaseId: undefined,
					activePatientData: undefined,
				},
			};
		},

		onPatientRegister: (state, action) => {
			console.log("patient registered, response:", action);
			return state;
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

		// in case of any error
		onFailure: (state, action) => {
			console.log("Failure occured");
			console.log("Detail:", action);
			return state;
		},
	},
});

export const { onFailure } = slice.actions;
export const { onModuleSelect, onPatientPageSelect } = slice.actions;
export const { onVerifyPatientInfo, onPatientRegister, onPatientRegisterBackup } = slice.actions;
export default slice.reducer;

export const cities = citiesCollection;

export var objFilter = function (obj, predicate) {
	let result = {},
		key;

	for (key in obj) {
		if (predicate(key, obj[key])) {
			result[key] = obj[key];
		}
	}

	return result;
};
// Dispatchable actions

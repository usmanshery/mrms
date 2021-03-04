import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	loggedIn: false,
	activeModule: undefined,
	patientModule: {
		activePage: undefined,
		activeId: undefined,
		data: undefined,
	},
};

const slice = createSlice({
	name: "session",
	initialState,
	reducers: {
		onVerifyPatientInfo: (state, action) => {
			// console.log(action);
			return state;
		},

		onPatientRegister: (state, action) => {},

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
				},
			};
		},
	},
});

export const { onModuleSelect, onPatientPageSelect } = slice.actions;
export const { onVerifyPatientInfo, onPatientRegister } = slice.actions;
export default slice.reducer;

export const navModules = {
	home: "home",
	patient: "Patient",
};
export const patientPages = {
	search: "Search Patients",
	view: "View Patient Details", // all but read-only
	all: "Edit Patient Details",
	profile: "Edit Patient Profile",
	cases: "View Patient Case History",
};

// Dispatchable actions

// -- navs
export const changeActiveModule = (module) => onModuleSelect({ module });

export const changePatientPage = (page) => onModuleSelect({ page });

// export const verifyPatientInfoAction = (contactNo) => onVerifyPatientInfo({ contactNo });
export const registerPatient = (profile) => onPatientRegister({ profile });

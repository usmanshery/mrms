import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	loggedIn: false,
	activeModule: null,
	personalDetails: {},
};

const slice = createSlice({
	name: "session",
	initialState,
	reducers: {
		onVerifyPatientInfo: (state, action) => {
			// console.log(action);
			return state;
		},

		onPatientRegister: (state, action) => {

		}
	},
});

export const { onVerifyPatientInfo, onPatientRegister } = slice.actions;
export default slice.reducer;

// Dispatchable actions
// export const verifyPatientInfoAction = (contactNo) => onVerifyPatientInfo({ contactNo });
export const registerPatient = (profile) => onPatientRegister({ profile });
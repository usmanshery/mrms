import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	loggedIn: false,
	activeModule: null,
};

const slice = createSlice({
	name: "session",
	initialState,
	reducers: {
		onPageLoad: (state, action) => {
			// /*
			// 	when page loads, first of all we need to check if we are logged in or not
			// */
			// let activeModule;
			// // if not logged in
			// if (!action.payload.success) {
			// 	cookies.set('activeModule', nav.modules.login);
			// 	activeModule = nav.modules.login;
			// 	return {
			// 		...state,
			// 		loading: false,
			// 		loggedIn: false,
			// 		activeModule,
			// 		userData: {}
			// 	};
			// }

			// // if logged in
			// activeModule = cookies.get('activeModule');

			// if (!activeModule) {
			// 	cookies.set('activeModule', nav.modules.video);
			// 	activeModule = nav.modules.video;
			// }

			// let { name, email, admin, key, bucketFolder } = action.payload;
			// if (activeModule === nav.modules.user && !admin) {
			// 	activeModule = nav.modules.video;
			// 	cookies.set('activeModule', nav.modules.video);
			// }

			// if (activeModule === nav.modules.campaign && admin) {
			// 	activeModule = nav.modules.video;
			// 	cookies.set('activeModule', nav.modules.video);
			// }

			// return {
			// 	...state,
			// 	loading: false,
			// 	loggedIn: true,
			// 	activeModule,
			// 	userData: {
			// 		name,
			// 		email,
			// 		admin,
			// 		key,
			// 		bucketFolder
			// 	}
			// };
			return state;
		},

		onLogin: (state, action) => {
			// if (!action.payload.success) {
			// 	return {
			// 		...state,
			// 		loading: false,
			// 		loggedIn: false,
			// 		userData: {}
			// 	};
			// }

			// let { name, email, admin, key, bucketFolder } = action.payload;
			// let activeModule = admin ? nav.modules.user : nav.modules.campaign;
			// cookies.set('activeModule', activeModule);

			// return {
			// 	...state,
			// 	loading: false,
			// 	loggedIn: true,
			// 	activeModule,
			// 	userData: {
			// 		name,
			// 		email,
			// 		admin,
			// 		key,
			// 		bucketFolder
			// 	}
			// };
			return state;
		},

		onLogout: (state, action) => {
			// if (action.payload.success) {
			// 	cookies.set('activeModule', nav.modules.login);
			// 	return {
			// 		loading: false,
			// 		loggedIn: false,
			// 		activeModule: nav.modules.login,
			// 		userFilter: filter.userFilters.All,
			// 		campaignFilter: filter.campaignFilters.All,
			// 		userData: {
			// 			name: null,
			// 			email: null,
			// 			admin: false,
			// 			key: null,
			// 			bucketFolder: null
			// 		}
			// 	};
			// }
			// return state;
			return state;
		},

		onNevigate: (state, action) => {
			// // validate payload maybe
			// if (!nav.validate(action.payload.to))
			// 	return state;
			// // validate admin rights
			// if (state.admin && !nav.validateAdminRight(action.payload.to))
			// 	return state;

			// let activeModule = action.payload.to;
			// cookies.set('activeModule', activeModule);

			// return {
			// 	...state,
			// 	activeModule
			// }
			return state;
		},

		onVerifyPatientInfo: (state, action) => {
			// console.log(action);
			return state;
		},
	},
});

export const { onVerifyPatientInfo } = slice.actions;
export default slice.reducer;

// Dispatchable actions
// export const verifyPatientInfoAction = (contactNo) => onVerifyPatientInfo({ contactNo });

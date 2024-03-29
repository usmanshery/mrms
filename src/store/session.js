import { createSlice } from "@reduxjs/toolkit";
import { adminModuleNotifications } from "./actions/Admin";
import { patientModuleNotifications, patientModuleSearchTypes } from "./actions/Patient";
import { stationModuleNotifications } from "./actions/Station";
import { userModuleNotifications } from "./actions/User";
import { navModules, adminPages, patientPages, userPages, stationPages } from "./actions/Navigation";
import { notificationType } from "./misc/global";

const initialState = {
	loading: false,
	loggedIn: false, // false
	loggedUserData: {},
	notifications: [],
	activeModule: navModules.casting,
	loginModal: false,
	uploadFileModal: false,
	adminModule: {
		activePage: adminPages.pendingCases,
		pendingCases: undefined,
		activeCaseId: undefined,
		activeCase: undefined,
	},
	patientModule: {
		activePage: patientPages.search,
		// new patient data being added
		newPatientData: undefined,
		// search results
		searchResults: undefined,
		searchType: undefined,
		// under process patient profile
		activePatientId: undefined,
		activePatientData: undefined,
		activePatientEditable: false,

		newCase: undefined,

		activeCaseId: undefined,
		activeCase: undefined,
	},
	userModule: {
		activePage: userPages.search,
		searchResults: undefined,
		activeUserId: undefined,
		activeUserData: undefined,
		activeUserEditable: false,
	},
	stationModule: {
		activePage: stationPages.list,
		openCases: undefined,
		activeCaseId: undefined,
		activeCaseCategory: undefined,
		activeCase: undefined,
	},
};

const slice = createSlice({
	name: "session",
	initialState,
	reducers: {
		onPageLoad: (state, action) => {
			/*
				when page loads, first of all we need to check if we are logged in or not
			*/
			// if not logged in
			if (!action.payload.success) {
				return {
					...state,
					loading: false,
					loggedIn: false,
					loggedUserData: {},
				};
			}

			// if logged in
			console.log(action.payload);
			let { name, username, sex, userLevel } = action.payload.profile;
			return {
				...state,
				loading: false,
				loggedIn: true,
				loggedUserData: {
					name,
					username,
					sex,
					userLevel,
				},
			};
		},

		// session related
		onUserLogin: (state, action) => {
			if (action.payload.success) {
				let profile = action.payload.profile;
				return {
					...state,
					loggedIn: true,
					loginModal: false,
					loggedUserData: {
						...profile,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: userModuleNotifications.loginSuccess,
						},
					],
				};
			} else {
				let errorMessage = action.payload.error;

				return {
					...state,
					loggedIn: false,
					notifications: [
						...state.notifications,
						{
							type: notificationType.red,
							message: errorMessage,
						},
					],
				};
			}
		},

		onUserLogout: (state, action) => {
			if (action.payload.success) {
				return {
					...state,
					loggedIn: false,
					loggedUserData: {},
					activeModule: navModules.casting,
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: userModuleNotifications.loginSuccess,
						},
					],
				};
			} else {
				let errorMessage = action.payload.error;

				return {
					...state,
					loggedIn: false,
					loggedUserData: {},
					activeModule: navModules.casting,
					notifications: [
						...state.notifications,
						{
							type: notificationType.red,
							message: errorMessage,
						},
					],
				};
			}
		},

		onModuleSelect: (state, action) => {
			let selectedModule = action.payload.module;
			if (selectedModule === navModules.casting || selectedModule === navModules.modification || selectedModule === navModules.fitting) {
				return {
					...state,
					activeModule: selectedModule,
					stationModule: {
						activePage: stationPages.list,
						openCases: undefined,
						activeCaseId: undefined,
						activeCaseCategory: undefined,
					},
				};
			}
			if (selectedModule === navModules.patient) {
				return {
					...state,
					activeModule: selectedModule,
					patientModule: {
						activePage: patientPages.search,
						// new patient data being added
						newPatientData: undefined,
						// search results
						searchResults: undefined,
						searchType: undefined,
						// under process patient profile
						activePatientId: undefined,
						activePatientData: undefined,
						activePatientEditable: false,

						newCase: undefined,

						activeCaseId: undefined,
						activeCase: undefined,
					},
				};
			}
			if (selectedModule === navModules.admin) {
				return {
					...state,
					activeModule: selectedModule,
					adminModule: {
						activePage: adminPages.pendingCases,
						pendingCases: undefined,
						activeCaseId: undefined,
						activeCase: undefined,
					},
				};
			}
			return {
				...state,
				activeModule: selectedModule,
			};
		},

		// admin module specific
		onAdminPageSelect: (state, action) => {
			let selectedPage = action.payload.page;
			if (selectedPage === state.adminModule.activePage) return state;
			if (selectedPage === adminPages.caseEdit) {
				if (!state.adminModule.activeCaseId) return state;
			}
			return {
				...state,
				adminModule: {
					...state.adminModule,
					activePage: selectedPage,
					activeCaseId: undefined,
					activeCase: undefined,
				},
			};
		},

		onAdminCaseLoad: (state, action) => {
			if (action.payload.success) {
				return {
					...state,
					adminModule: {
						...state.adminModule,
						pendingCases: action.payload.cases,
						activeCaseId: undefined,
						activeCase: undefined,
					},
				};
			}
			return state;
		},

		onAdminCaseUpdated: (state, action) => {
			if (action.payload.success) {
				let { caseDoc } = action.payload;
				return {
					...state,
					adminModule: {
						...state.adminModule,
						activePage: adminPages.pendingCases,
						pendingCases: {
							prosthetic: [...state.adminModule.pendingCases.prosthetic.filter((_case) => _case._id !== caseDoc._id)],
						},
						activeCaseId: undefined,
						activeCase: undefined,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: adminModuleNotifications.caseUpdateSuccess,
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
							message: action.payload.error ? action.payload.error : adminModuleNotifications.caseUpdateFailure,
						},
					],
				};
			}
		},

		onAdminCaseEdit: (state, action) => {
			let caseId = action.payload.caseId;

			return {
				...state,
				adminModule: {
					...state.adminModule,
					activePage: adminPages.caseEdit,
					activeCaseId: caseId,
					activeCase: state.adminModule.pendingCases.prosthetic.filter((_case) => _case._id === caseId)[0],
				},
			};
		},

		// user module specific
		onUserPageSelect: (state, action) => {
			let selectedPage = action.payload.page;
			if (selectedPage === state.userModule.activePage) return state;
			if (selectedPage === userPages.view || selectedPage === userPages.update) {
				if (!state.userModule.activeUserId) return state;
			}
			let activeUserEditable = state.userModule.activeUserEditable;
			if (selectedPage === userPages.view) {
				activeUserEditable = false;
			}
			if (selectedPage === userPages.update) {
				activeUserEditable = true;
			}
			return {
				...state,
				userModule: {
					...state.userModule,
					activePage: selectedPage,
					activeUserEditable,
				},
			};
		},

		onUserAdd: (state, action) => {
			if (action.payload.success) {
				let activeUserId = action.payload.profile._id;
				let activeUserData = action.payload.profile;
				return {
					...state,
					userModule: {
						...state.userModule,
						activePage: userPages.update,
						activeUserId,
						activeUserData,
						activeUserEditable: true,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: userModuleNotifications.regSuccess,
						},
					],
				};
			} else {
				return {
					...state,
					userModule: {
						...state.userModule,
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

		onUserUpdate: (state, action) => {
			if (action.payload.success) {
				let activeUserId = action.payload.profile._id;
				let activeUserData = action.payload.profile;
				return {
					...state,
					userModule: {
						...state.userModule,
						activePage: userPages.update,
						activeUserId,
						activeUserData,
						activeUserEditable: true,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: userModuleNotifications.updateSuccess,
						},
					],
				};
			} else {
				return {
					...state,
					userModule: {
						...state.userModule,
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

		onUserSearch: (state, action) => {
			if (action.payload.success) {
				return {
					...state,
					userModule: {
						...state.userModule,
						searchResults: action.payload.profiles,
					},
				};
			} else {
				return {
					...state,
					userModule: {
						...state.userModule,
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

		onUserView: (state, action) => {
			let activeUserId = action.payload.userId;
			let activeUserData = action.payload.userData;
			return {
				...state,
				userModule: {
					...state.userModule,
					activePage: userPages.view,
					activeUserId,
					activeUserData,
					activeUserEditable: false,
				},
			};
		},

		onUserEdit: (state, action) => {
			let activeUserId = action.payload.userId;
			let activeUserData = action.payload.userData;
			return {
				...state,
				userModule: {
					...state.userModule,
					activePage: userPages.update,
					activeUserId,
					activeUserData,
					activeUserEditable: true,
				},
			};
		},

		onUserPopCallback: (state, action) => {
			return state;
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
			if (action.payload.success) {
				let activePatientId = action.payload.profile._id;
				let activePatientData = action.payload.profile;
				return {
					...state,
					patientModule: {
						...state.patientModule,
						activePage: patientPages.update,
						activePatientId,
						activePatientData,
						activePatientEditable: true,
						activeCaseId: undefined,
						activeCase: undefined,
						newCase: undefined,
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

		onPatientUpdate: (state, action) => {
			if (action.payload.success) {
				let activePatientId = action.payload.profile._id;
				let activePatientData = action.payload.profile;
				return {
					...state,
					patientModule: {
						...state.patientModule,
						activePage: patientPages.update,
						activePatientId,
						activePatientData: {
							...state.patientModule.activePatientData,
							...activePatientData,
						},
						activePatientEditable: true,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: patientModuleNotifications.updateSuccess,
						},
					],
				};
			} else {
				return {
					...state,
					patientModule: {
						...state.patientModule,
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
			// console.log("on pt search session: ", action.payload);
			if (action.payload.success) {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						searchResults: action.payload.profiles,
						searchType: patientModuleSearchTypes.patient,
					},
				};
			} else {
				return {
					...state,
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
					newCase: undefined,
					activeCaseId: undefined,
					activeCase: undefined,
				},
			};
		},

		onPatientEdit: (state, action) => {
			// console.log("on pt edit session: ", action.payload);
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
					newCase: undefined,
					activeCaseId: undefined,
					activeCase: undefined,
				},
			};
		},

		onCaseAdded: (state, action) => {
			// console.log("on case added session", action.payload);
			if (action.payload.success) {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						activeCaseId: action.payload.caseDoc._id,
						activeCase: {
							_id: action.payload.caseArrayId,
							category: action.payload.category,
							[action.payload.category]: action.payload.caseDoc,
							attachments: [],
						},
						activePatientData: {
							...state.patientModule.activePatientData,
							cases: [
								...state.patientModule.activePatientData.cases,
								{
									_id: action.payload.caseArrayId,
									category: action.payload.category,
									[action.payload.category]: action.payload.caseDoc,
									attachments: [],
								},
							],
						},
						newCase: undefined,
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
			if (state.activeModule === navModules.admin) return state;
			if (action.payload.success) {
				let { category, caseDoc } = action.payload;
				return {
					...state,
					patientModule: {
						...state.patientModule,
						activeCaseId: caseDoc._id,
						activeCase: {
							...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id === caseDoc._id)[0],
							[category]: caseDoc,
						},
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
						newCase: undefined,
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

		onCaseSearch: (state, action) => {
			// console.log("on case search: ", action.payload);
			if (action.payload.success) {
				return {
					...state,
					patientModule: {
						...state.patientModule,
						searchResults: action.payload.cases,
						searchType: patientModuleSearchTypes.case,
					},
				};
			} else {
				return {
					...state,
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

		onCaseEdit: (state, action) => {
			let caseId = action.payload.caseId;

			return {
				...state,
				patientModule: {
					...state.patientModule,
					activeCaseId: caseId,
					activeCase: {
						...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id === caseId)[0],
					},
				},
			};
		},

		onCaseNew: (state, action) => {
			let newCase = action.payload.newCaseCategory;
			return {
				...state,
				patientModule: {
					...state.patientModule,
					newCase,
					activeCaseId: undefined,
					activeCase: undefined,
				},
			};
		},

		onCaseSearchProfileLoad: (state, action) => {
			// console.log("session: ", action.payload);
			// return state;
			let activePatientId = action.payload.profiles[0]._id;
			let activePatientData = action.payload.profiles[0];
			return {
				...state,
				patientModule: {
					...state.patientModule,
					activePage: patientPages.update,
					activePatientId,
					activePatientData,
					newCase: undefined,
					activeCaseId: state.patientModule.backup.activeCaseId,
					activeCase: {
						...activePatientData.cases.filter((_case) => _case[_case.category]._id === state.patientModule.backup.activeCaseId)[0],
					},
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
					activeCaseId: undefined,
					activeCase: undefined,
				},
			};
		},

		onFileDeleted: (state, action) => {
			// whatever
			let deletedFileId = action.payload.fileId;
			let caseId = action.payload.caseId;
			// admin module values to update
			if (state.activeModule === navModules.admin) {
				if (action.payload.success) {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.green,
								message: patientModuleNotifications.uploadRemoveSuccess,
							},
						],
						adminModule: {
							...state.adminModule,
							activeCase: {
								...state.adminModule.activeCase,
								attachments: {
									...state.adminModule.activeCase.attachments.filter((attachment) => attachment.fileId !== deletedFileId),
								},
							},
							pendingCases: {
								prosthetic: [
									...state.adminModule.pendingCases.prosthetic.filter((_case) => _case._id !== state.adminModule.activeCaseId),
									{
										...state.adminModule.pendingCases.prosthetic.filter((_case) => _case._id === state.adminModule.activeCaseId)[0],
										attachments: {
											...state.adminModule.pendingCases.prosthetic
												.filter((_case) => _case._id === state.adminModule.activeCaseId)[0]
												.attachments.filter((attachment) => attachment.fileId !== deletedFileId),
										},
									},
								],
							},
						},
					};
				} else {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.red,
								message: patientModuleNotifications.uploadRemoveFailure,
							},
						],
					};
				}
			} else {
				console.log("Doing the update for patient module");
				console.log(action.payload);
				// by default do it for patient module only :XD
				if (action.payload.success) {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.green,
								message: patientModuleNotifications.uploadRemoveSuccess,
							},
						],
						patientModule: {
							...state.patientModule,
							activeCase: {
								...state.patientModule.activeCase,
								attachments: [...state.patientModule.activeCase.attachments.filter((attachment) => attachment.fileId !== deletedFileId)],
							},
							activePatientData: {
								...state.patientModule.activePatientData,
								cases: [
									...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id !== caseId),
									{
										...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id === caseId)[0],
										attachments: [
											...state.patientModule.activePatientData.cases
												.filter((_case) => _case[_case.category]._id === caseId)[0]
												.attachments.filter((attachment) => attachment.fileId !== deletedFileId),
										],
									},
								],
							},
						},
					};
				} else {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.red,
								message: patientModuleNotifications.uploadRemoveFailure,
							},
						],
					};
				}
			}

			// else{}
		},

		onFileUploaded: (state, action) => {
			// whatever
			const caseId = action.payload.caseId;
			if (state.activeModule === navModules.admin) {
				if (action.payload.success) {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.green,
								message: patientModuleNotifications.uploadRemoveSuccess,
							},
						],
						adminModule: {
							...state.adminModule,
							activeCase: {
								...state.adminModule.activeCase,
								attachments: [
									...state.adminModule.activeCase.attachments.filter(
										(attachment) => action.payload.metaData.filter((newAttachmentObj) => newAttachmentObj.fileId === attachment.fileId).length === 0
									),
									...action.payload.metaData.map((attachmentObj) => {
										return {
											fileId: attachmentObj.fileId,
											fileName: attachmentObj.fileName,
											url: attachmentObj.url,
										};
									}),
								],
							},
							pendingCases: {
								prosthetic: [
									...state.adminModule.pendingCases.prosthetic.filter((_case) => _case._id !== state.adminModule.activeCaseId),
									{
										...state.adminModule.pendingCases.prosthetic.filter((_case) => _case._id === state.adminModule.activeCaseId)[0],
										attachments: [
											...state.adminModule.pendingCases.prosthetic
												.filter((_case) => _case._id === state.adminModule.activeCaseId)[0]
												.attachments.filter((attachment) => action.payload.metaData.filter((newAttachmentObj) => newAttachmentObj.fileId === attachment.fileId).length === 0),
											...action.payload.metaData.map((attachmentObj) => {
												return {
													fileId: attachmentObj.fileId,
													fileName: attachmentObj.fileName,
													url: attachmentObj.url,
												};
											}),
										],
									},
								],
							},
						},
					};
				} else {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.red,
								message: action.payload.error ? action.payload.error : patientModuleNotifications.uploadFailure,
							},
						],
					};
				}
			} else {
				// do it for patient module without check for now
				if (action.payload.success) {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.green,
								message: patientModuleNotifications.uploadSuccess,
							},
						],
						patientModule: {
							...state.patientModule,
							activeCase: {
								...state.patientModule.activeCase,
								attachments: [
									...state.patientModule.activeCase.attachments.filter(
										(attachment) => action.payload.metaData.filter((newAttachmentObj) => newAttachmentObj.fileId === attachment.fileId).length === 0
									),
									...action.payload.metaData.map((attachmentObj) => {
										return {
											fileId: attachmentObj.fileId,
											fileName: attachmentObj.fileName,
											url: attachmentObj.url,
										};
									}),
								],
							},
							activePatientData: {
								...state.patientModule.activePatientData,
								cases: [
									...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id !== caseId),
									{
										...state.patientModule.activePatientData.cases.filter((_case) => _case[_case.category]._id === caseId)[0],
										attachments: [
											...state.patientModule.activePatientData.cases
												.filter((_case) => _case[_case.category]._id === caseId)[0]
												.attachments.filter((attachment) => action.payload.metaData.filter((newAttachmentObj) => newAttachmentObj.fileId === attachment.fileId).length === 0),
											...action.payload.metaData.map((attachmentObj) => {
												return {
													fileId: attachmentObj.fileId,
													fileName: attachmentObj.fileName,
													url: attachmentObj.url,
												};
											}),
										],
									},
								],
							},
						},
					};
				} else {
					return {
						...state,
						notifications: [
							...state.notifications,
							{
								type: notificationType.red,
								message: action.payload.error ? action.payload.error : patientModuleNotifications.uploadFailure,
							},
						],
					};
				}
			}
		},

		onPatientValueBackup: (state, action) => {
			return {
				...state,
				patientModule: {
					...state.patientModule,
					backup: {
						...state.patientModule.backup,
						...action.payload,
					},
				},
			};
		},

		// station module specific
		onStationPageSelect: (state, action) => {
			let selectedPage = action.payload.page;
			if (selectedPage === state.stationModule.activePage) return state;
			if (selectedPage === stationPages.activeCase) {
				if (!state.stationModule.activeCaseId) return state;
			}
			return {
				...state,
				stationModule: {
					...state.stationModule,
					activePage: selectedPage,
				},
			};
		},

		onStationCaseLoad: (state, action) => {
			// console.log(action.payload.cases);
			if (action.payload.success) {
				return {
					...state,
					stationModule: {
						...state.stationModule,
						openCases: action.payload.cases,
					},
				};
			}
			return state;
		},

		onStationStaffLoad: (state, action) => {
			// console.log(action.payload.staff);
			if (action.payload.success) {
				return {
					...state,
					stationModule: {
						...state.stationModule,
						staff: action.payload.staff,
					},
				};
			}
			return state;
		},

		onStationCaseUpdated: (state, action) => {
			if (action.payload.success) {
				let { category, caseDoc } = action.payload;
				// console.log(category, caseDoc);
				return {
					...state,
					stationModule: {
						...state.stationModule,
						activePage: stationPages.list,
						openCases: {
							...state.stationModule.openCases,
							[category]: [...state.stationModule.openCases[category].filter((_case) => _case._id !== caseDoc._id)],
						},
						activeCaseId: undefined,
						activeCaseCategory: undefined,
						activeCase: undefined,
					},
					notifications: [
						...state.notifications,
						{
							type: notificationType.green,
							message: stationModuleNotifications.caseUpdateSuccess,
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
							message: action.payload.error ? action.payload.error : patientModuleNotifications.caseUpdateFailure,
						},
					],
				};
			}
		},

		onStationCaseEdit: (state, action) => {
			let caseId = action.payload.caseId;
			// console.log(caseId);
			let activeCaseCategory;
			if (state.stationModule.openCases.orthotic.filter((_case) => _case._id === caseId).length === 1) activeCaseCategory = "orthotic";
			if (state.stationModule.openCases.prosthetic.filter((_case) => _case._id === caseId).length === 1) activeCaseCategory = "prosthetic";

			return {
				...state,
				stationModule: {
					...state.stationModule,
					activePage: stationPages.activeCase,
					activeCaseId: caseId,
					activeCaseCategory,
					activeCase: state.stationModule.openCases[activeCaseCategory].filter((_case) => _case._id === caseId)[0],
				},
			};
		},

		// pop callback from callback actions for patient component
		onPatientPopCallback: (state, action) => {
			return {
				...state,
				patientModule: {
					...state.patientModule,
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

		// toggle modals
		onToggleModal: (state, action) => {
			let modalName = action.payload.modal;
			let value = action.payload.value;
			return {
				...state,
				[modalName]: value === undefined ? !state[modalName] : value,
			};
		},
	},
});

export const { onFailure } = slice.actions;
export const { onNotificationPop } = slice.actions;
export const { onModuleSelect, onAdminPageSelect, onPatientPageSelect, onUserPageSelect, onStationPageSelect, onToggleModal } = slice.actions;
export const { onPageLoad, onUserLogin, onUserLogout, onUserAdd, onUserUpdate, onUserSearch, onUserView, onUserEdit, onUserPopCallback } = slice.actions;
export const { onStationCaseLoad, onStationCaseEdit, onStationCaseUpdated, onStationStaffLoad } = slice.actions;
export const { onAdminCaseLoad, onAdminCaseEdit, onAdminCaseUpdated } = slice.actions;
export const {
	onPatientRegister,
	onPatientUpdate,
	onPatientSearch,
	onPatientPopCallback,
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
} = slice.actions;
export default slice.reducer;

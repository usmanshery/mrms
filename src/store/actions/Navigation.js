import { onModuleSelect, onAdminPageSelect,  onPatientPageSelect, onUserPageSelect, onStationPageSelect, onToggleModal } from "../session";

export const navModules = {
	admin: "Admin",
	patient: "Patient",
	user: "User",
	casting: "Casting",
	modification: "Modification",
	fitting: "Fitting",
};

export const adminPages = {
	pendingCases: "Prosthetic Case Approval",
	caseEdit: "Process Case",
};

export const patientPages = {
	add: "Register New Patient",
	search: "Search Patients",
	view: "View Patient Details", // all but read-only
	update: "Update Patient Details",
	test: "Testing New Forms",
};

export const userPages = {
	add: "Register New User",
	search: "Search Users",
	view: "View User Details", // all but read-only
	update: "Update User Details",
	test: "Testing New Forms",
};

export const stationPages = {
	list: "Open Cases",
	activeCase: "Active Case",
};

export const changeActiveModule = (module) => onModuleSelect({ module });

export const changeAdminPage = (page) => onAdminPageSelect({ page });

export const changePatientPage = (page) => onPatientPageSelect({ page });

export const changeUserPage = (page) => onUserPageSelect({ page });

export const changeStationPage = (page) => onStationPageSelect({ page });

export const toggleModal = (modal, value) => onToggleModal({modal, value});
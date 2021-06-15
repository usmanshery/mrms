import { onModuleSelect, onPatientPageSelect } from "../session";

export const navModules = {
	home: "home",
	patient: "Patient",
};

export const patientPages = {
	add: "Register New Patient",
	search: "Search Patients",
	view: "View Patient Details", // all but read-only
	update: "Update Patient Details",
	test: "Testing New Forms",
};

export const changeActiveModule = (module) => onModuleSelect({ module });

export const changePatientPage = (page) => onPatientPageSelect({ page });

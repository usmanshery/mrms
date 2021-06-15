import React from "react";
import { useSelector } from "react-redux";
import { navModules } from "../../store/actions/Navigation";
import { accordianWrapper } from "../../store/misc/global";

import OrthoticForm from "../forms/OrthoticProfile";
import ProstheticForm from "../forms/ProstheticProfile";

// Note: Further we could place check if state doesn't really support showing this component and this should return some empty message etc
// to change this, place a check where we are taking in the case category

function PatientCaseDetailForm(props) {
	/*
		Props for behavior:
		- readOnly | bool (false) | if set true, this value will be set to the case component
	*/
	const caseCategory = useSelector((state) => {
		// in patient module use
		if (state.activeModule === navModules.patient) {
			// if new case
			if (state.patientModule.newCase) {
				return state.patientModule.newCase;
			}
			if (state.patientModule.activeCase) {
				return state.patientModule.activeCase.category;
			}
		}
		// in admin module use
		if (state.activeModule === navModules.admin) {
			return "prosthetic";
		}
		return undefined;
	});

	const isNew = useSelector((state) => state.patientModule.newCase !== undefined);

	let caseForm = undefined;
	if (caseCategory === "prosthetic") {
		caseForm = <ProstheticForm readOnly={props.readOnly} />;
	}
	if (caseCategory === "orthotic") {
		caseForm = <OrthoticForm readOnly={props.readOnly} />;
	}
	if (caseCategory === "mechanical") {
		caseForm = <h1>Mechanical one</h1>;
	}

	if (caseForm === undefined) return <></>;

	const title = isNew ? "New Prosthetic Case" : "Patient Case Detail";
	return accordianWrapper(title, caseForm);
}

export default PatientCaseDetailForm;

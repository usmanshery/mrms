import React, { Component } from "react";
import { connect } from "react-redux";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PatientForm from "./forms/PatientProfile";
import OrthoticForm from "./forms/OrthoticProfile";
import ProstheticForm from "./forms/ProstheticProfile";

import { patientPages } from "../store/session";
import "./styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activePatientPage: state.patientModule.activePage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

class PatientComponent extends Component {
	constructor(props) {
		super(props);
		this.getProfile = this.getProfile.bind(this);
	}

	getProfile() {
		return (
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>Personal Data</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<PatientForm />
				</AccordionDetails>
			</Accordion>
		);
	}

	cases() {}

	form() {}

	render() {
		// if (this.props.activePatientPage === patientPages)
		const profile = this.getProfile();
		return (
			<div className="rootDiv" style={{ border: "3px solid red" }}>
				{profile}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientComponent);

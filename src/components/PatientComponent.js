import React, { Component } from "react";
import { connect } from "react-redux";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PatientForm from "./forms/PatientProfile";
import PatientSearchForm from "./forms/PatientSearch";
// import OrthoticForm from "./forms/OrthoticProfile";
// import ProstheticForm from "./forms/ProstheticProfile";

import { registerPatient } from "../store/actions/Patient";

import { patientPages } from "../store/actions/Navigation";
import "./styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activePage: state.patientModule.activePage,
		activePatientId: state.patientModule.activePatientId,
		activeCaseId: state.patientModule.activeCaseId,
		activePatientData: state.patientModule.activePatientData,
		newPatientData: state.patientModule.newPatientData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerPatientProfile: (profile) => {
			return dispatch(registerPatient(profile));
		},
	};
};

class PatientComponent extends Component {
	constructor(props) {
		super(props);

		this.getProfile = this.getProfile.bind(this);
		this.getSearch = this.getSearch.bind(this);

		this.registerNewPatient = this.registerNewPatient.bind(this);

		// manage behaviour
		let editing = true; // by default all fields can be edited
		let loadData = {
			// name: "Shery",
			// fathername: "Shery's Father",
			sex: "Male",
			age: 27,
			phone: "03046468474",
			address: "Pinid yo",
			city: "Rawalpindi, Punjab",
		};

		if (this.props.activePage === patientPages.view) {
			editing = false;
		}

		if (this.props.activePage === patientPages.add) {
			if (this.props.newPatientData) {
				loadData.name = this.props.newPatientData.name;
				loadData.fathername = this.props.newPatientData.fathername;
				loadData.sex = this.props.newPatientData.sex;
				loadData.age = this.props.newPatientData.age;
				loadData.phone = this.props.newPatientData.phone;
				loadData.rank = this.props.newPatientData.rank;
				loadData.armynumber = this.props.newPatientData.armynumber;
				loadData.unit = this.props.newPatientData.unit;
				loadData.address = this.props.newPatientData.address;
				loadData.city = this.props.newPatientData.city;
			}
		} else {
			if (this.props.activePatientId) {
				loadData.name = this.props.activePatientData.name;
				loadData.fathername = this.props.activePatientData.fathername;
				loadData.sex = this.props.activePatientData.sex;
				loadData.age = this.props.activePatientData.age;
				loadData.phone = this.props.activePatientData.phone;
				loadData.rank = this.props.activePatientData.rank;
				loadData.armynumber = this.props.activePatientData.armynumber;
				loadData.unit = this.props.activePatientData.unit;
				loadData.address = this.props.activePatientData.address;
				loadData.city = this.props.activePatientData.city;
			}
		}

		this.state = {
			editing,
			loadData,
		};
	}

	registerNewPatient(data) {
		// clean data and any final validation/ checks
		const profile = {
			...data,
		};
		this.props.registerPatientProfile(profile);
	}

	getProfile() {
		return (
			<Accordion expanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>Personal Data</Typography>
				</AccordionSummary>
				<AccordionDetails className="formTopline">
					<PatientForm
						loadData={this.state.loadData}
						// updating={this.props.activePage !== patientPages.add}
						triggerName={this.props.activePage === patientPages.add ? "Register Patient" : "Update Profile"}
						triggerCallback={this.registerNewPatient}
					/>
				</AccordionDetails>
			</Accordion>
		);
	}

	getCases() {}

	getForm() {}

	getSearch() {
		return (
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>Search Patients</Typography>
				</AccordionSummary>
				<AccordionDetails className="formTopline">
					<PatientSearchForm />
				</AccordionDetails>
			</Accordion>
		);
	}

	render() {
		let profile = undefined;
		let search = undefined;

		if (this.props.activePage && this.props.activePage !== patientPages.search) {
			if (this.props.activePage === patientPages.add) {
				profile = this.getProfile();
			} else {
				if (!this.props.activePatientId) {
					profile = <h1>No Patient Selected</h1>;
				} else {
					profile = this.getProfile();
				}
			}
		} else {
			search = this.getSearch();
		}

		return (
			<div className="rootDiv">
				{profile}
				{search}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientComponent);

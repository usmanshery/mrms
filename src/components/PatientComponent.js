import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row } from "react-bootstrap";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PatientForm from "./forms/PatientProfile";
import PatientCasesForm from "./forms/PatientCases";
import ULO2Form from "./forms/MULO2";

import PatientSearchComponent from "./patient/PatientSearchComponent";
// import OrthoticForm from "./forms/OrthoticProfile";
// import ProstheticForm from "./forms/ProstheticProfile";
import PatientProfilesTable from "./tables/PatientProfileTable";

// import { objFilter } from "../store/session";
import { patientModuleActions } from "../store/actions/Patient";

import {
	registerPatientAction,
	patientRegistrationDataBackupAction,
	removePatientCbAction,
	patientModuleNotifications,
	searchPatientProfileAction,
} from "../store/actions/Patient";

import { patientPages } from "../store/actions/Navigation";
import "./styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activePage: state.patientModule.activePage,
		activePatientId: state.patientModule.activePatientId,
		activePatientCaseId: state.patientModule.activePatientCaseId,
		activePatientData: state.patientModule.activePatientData,
		newPatientData: state.patientModule.newPatientData,
		callbackActions: state.patientModule.callbackActions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerPatientProfile: (profile) => dispatch(registerPatientAction(profile)),
		backupRegData: (backup) => dispatch(patientRegistrationDataBackupAction(backup)),
		removePatientCallback: (callbackAction) => dispatch(removePatientCbAction(callbackAction)),
		searchPatientProfile: (profile) => dispatch(searchPatientProfileAction(profile)),
	};
};

class PatientComponent extends Component {
	constructor(props) {
		super(props);

		this.getAddProfile = this.getAddProfile.bind(this);
		this.getProfileView = this.getProfileView.bind(this);
		this.getSearch = this.getSearch.bind(this);

		this.getTestForm = this.getTestForm.bind(this);

		this.clearForm = this.clearForm.bind(this);

		// manage behaviour
		let editing = true; // by default all fields can be edited
		// let loadData = {};
		let loadData = {
			name: "Shery",
			fathername: "Shery's Father",
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
			profileFormKey: "x",
		};
	}

	componentDidUpdate(prevState) {
		// make it componentDidReceiveProps like
		if (prevState.callbackActions === this.props.callbackActions) return;

		if (this.props.callbackActions.includes(patientModuleNotifications.regSuccess)) {
			this.props.removePatientCallback(patientModuleNotifications.regSuccess);
			this.clearForm();
		}
		if (this.props.callbackActions.includes(patientModuleNotifications.regFailure)) {
			this.props.removePatientCallback(patientModuleNotifications.regFailure);
		}
	}

	// local functions
	clearForm() {
		this.setState({
			loadData: {},
			profileFormKey: this.state.profileFormKey === "x" ? "y" : "x",
		});
	}

	// jsx functions
	getAddProfile() {
		return (
			<Accordion expanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>Add New Patient</Typography>
				</AccordionSummary>
				<AccordionDetails className="formTopline">
					<PatientForm
						key={this.state.profileFormKey}
						action={patientModuleActions.regNew}
						// loadData={this.state.loadData}
						triggerName={this.props.activePage === patientPages.add ? "Register Patient" : "Update Profile"}
						triggerCallback={this.registerNewPatient}
					/>
				</AccordionDetails>
			</Accordion>
		);
	}

	getProfileView(title, readOnly = false) {
		return (
			<Accordion expanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>{title}</Typography>
				</AccordionSummary>
				<AccordionDetails className="formTopline">
					<Container fluid>
						{/* profile details */}
						<Row>
							<PatientForm
								title={"Personal Details"}
								key={this.state.profileFormKey}
								action={readOnly ? patientModuleActions.viewOnly : patientModuleActions.updateExisting}
								readOnly={readOnly}
							/>
						</Row>
						<Row>
							<hr style={{ width: "100%" }} />
						</Row>
						{/* cases */}
						<Row>
							<PatientCasesForm />
						</Row>
					</Container>
				</AccordionDetails>
			</Accordion>
		);
	}

	getSearch() {
		return (
			<>
				<PatientSearchComponent />
				<PatientProfilesTable />
			</>
		);
	}

	getTestForm() {
		return <ULO2Form />;
	}

	// render
	render() {
		let component = <></>;
		if (this.props.activePage && this.props.activePage === patientPages.search) {
			component = this.getSearch();
		}

		if (this.props.activePage && this.props.activePage === patientPages.add) {
			component = this.getAddProfile();
		}

		if (this.props.activePage && this.props.activePage === patientPages.view) {
			if (!this.props.activePatientId) {
				component = <h1>No Patient Selected</h1>;
			} else {
				component = this.getProfileView("View Patient Profile", true);
			}
		}

		if (this.props.activePage && this.props.activePage === patientPages.update) {
			if (!this.props.activePatientId) {
				component = <h1>No Patient Selected</h1>;
			} else {
				component = this.getProfileView("Update Patient Profile");
			}
		}

		if (this.props.activePage && this.props.activePage === patientPages.test) {
			component = this.getTestForm();
		}

		return <div className="rootDiv">{component}</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientComponent);

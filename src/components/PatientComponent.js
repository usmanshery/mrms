import React, { Component } from "react";
import { connect } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";

import PatientForm from "./forms/PatientProfile";
import PatientCasesList from "./forms/PatientCasesList";

// import ULO2Form from "./forms/MULO2";
import AdviceForm from "./forms/AdviseForm";

// import PatientSearchComponent from "./patient/PatientSearchComponent";
import PatientProfileSearchForm from "./forms/PatientProfileSearch";
import PatientCaseSearchForm from "./forms/PatientCaseSearch";
import PatientCaseDetailForm from "./forms/PatientCaseDetail";
import PatientProfilesTable from "./tables/PatientProfileTable";
import PatientCasesTable from "./tables/PatientCasesTable";

// import { objFilter } from "../store/session";
import { patientModuleActions } from "../store/actions/Patient";

import { patientPages } from "../store/actions/Navigation";
import "./styles/MainComponent.css";
import { withStyles } from "@material-ui/core";
import { accordianWrapper, rowWrapper } from "../store/misc/global";

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
	return {};
};

const customStyles = (theme) => ({
	bottomMargin: { marginBottom: "10px" },
});

class PatientComponent extends Component {
	constructor(props) {
		super(props);

		this.getAddProfile = this.getAddProfile.bind(this);
		this.getProfileView = this.getProfileView.bind(this);
		this.getSearch = this.getSearch.bind(this);

		this.getTestForm = this.getTestForm.bind(this);
	}

	getAddProfile() {
		let content = (
			<PatientForm
				action={patientModuleActions.regNew}
				triggerName={this.props.activePage === patientPages.add ? "Register Patient" : "Update Profile"}
				triggerCallback={this.registerNewPatient}
			/>
		);
		return rowWrapper(content);
	}

	getProfileView(title, readOnly = false) {
		if (!this.props.activePatientId) {
			return <h1>No Patient Selected</h1>;
		}
		/*
			 patient detail is made up of following components:
			 - Personal Detail Component (independent component)
			 - Cases List (independent component)
			 - Case Component (complete and independent component)
		*/

		return (
			<>
				{/* Patient Personal Detail Component */}
				{rowWrapper(<PatientForm readOnly={readOnly} action={readOnly ? patientModuleActions.viewOnly : patientModuleActions.updateExisting} />)}
				{/* Cases List Component */}
				{rowWrapper(<PatientCasesList readOnly={readOnly} />)}
				{/* Case Component (Active Case) */}
				{rowWrapper(<PatientCaseDetailForm readOnly={readOnly} />)}
			</>
		);
	}

	getSearch() {
		return (
			<>
				{/* Search Forms (2) */}
				{rowWrapper(
					accordianWrapper(
						"Search",
						<Container fluid>
							<Row>
								<Col className="col-8">
									<PatientProfileSearchForm />
								</Col>
								<Col className="col-4">
									<PatientCaseSearchForm />
								</Col>
							</Row>
						</Container>
					)
				)}
				{/* Profile Search Result */}
				{rowWrapper(accordianWrapper("Patient Profile Search Results", <PatientProfilesTable />))}
				{/* Case Search Result */}
				{rowWrapper(accordianWrapper("Patient Case Search Results", <PatientCasesTable searchOnly />))}
			</>
		);
	}

	getTestForm() {
		// return <h1>Empty</h1>;
		return <AdviceForm />;
	}

	// render
	render() {
		let component = <></>;

		// Search component
		if (this.props.activePage && this.props.activePage === patientPages.search) {
			component = this.getSearch();
		}

		// New Patient Register
		if (this.props.activePage && this.props.activePage === patientPages.add) {
			component = this.getAddProfile();
		}

		// View Patient Details
		if (this.props.activePage && this.props.activePage === patientPages.view) {
			component = this.getProfileView("View Patient Profile", true);
		}

		// Update Patient Details
		if (this.props.activePage && this.props.activePage === patientPages.update) {
			component = this.getProfileView("Update Patient Profile");
		}

		// Test Component
		if (this.props.activePage && this.props.activePage === patientPages.test) {
			component = this.getTestForm();
		}

		return (
			<div className="rootDiv">
				<Container fluid>{component}</Container>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(customStyles)(PatientComponent));

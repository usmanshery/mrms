/*
	Provides complete sub-component
	- actionProvider will be patient
	- shows user search form
	- handles search input, dispatches search actions
*/

import React, { Component } from "react";
import { connect } from "react-redux";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Col, Container, Row } from "react-bootstrap";

import PatientProfileSearchForm from "../forms/PatientProfileSearch";
import PatientCasesSearchForm from "../forms/PatientCaseSearch";

import {
	registerPatientAction,
	patientRegistrationDataBackupAction,
	removePatientCbAction,
	searchPatientProfileAction,
} from "../../store/actions/Patient";

import "../styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activePage: state.patientModule.activePage,
		activePatientId: state.patientModule.activePatientId,
		activeCaseId: state.patientModule.activeCaseId,
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

class PatientSearchComponent extends Component {
	constructor(props) {
		super(props);

		this.performProfileSearch = this.performProfileSearch.bind(this);
		this.performCaseSearch = this.performCaseSearch.bind(this);

		this.state = {
			accordianExpanded: true,
		};

		this.toggleAccordianExpanded = () =>
			this.setState({
				accordianExpanded: !this.state.accordianExpanded,
			});
	}

	// triggers
	performProfileSearch(searchParams) {
		this.props.searchPatientProfile(searchParams);
	}

	performCaseSearch(searchData) {}

	// local functions
	clearForm() {
		this.setState({
			profileFormKey: this.state.profileFormKey === "x" ? "y" : "x",
		});
	}

	// render
	render() {
		return (
			<div className="rootDiv">
				<Accordion expanded={this.state.accordianExpanded} onChange={this.toggleAccordianExpanded}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
						<Typography>Search Patients</Typography>
					</AccordionSummary>
					<AccordionDetails className="formTopline">
						<Container fluid>
							<Row>
								<Col className="col-6">
									<PatientProfileSearchForm triggerName={"Search"} triggerCallback={this.performProfileSearch} />
								</Col>
								<Col className="col-6">
									<PatientCasesSearchForm triggerName={"Search"} triggerCallback={this.performCaseSearch} />
								</Col>
							</Row>
						</Container>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientSearchComponent);

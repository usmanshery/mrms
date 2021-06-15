import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Modal } from "react-bootstrap";
import { TextField, FormControl, FormHelperText, Button, Typography, Toolbar } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { insertCaseAction, updateCaseAction } from "../../store/actions/Patient";
import { defaultOrthoticFormValues, defaultOrthoticFormErrors, defaultOrthoticFormLabelValues } from "../../store/misc/formValues";
import { objFilter, validation, rowWrapper } from "../../store/misc/global";

import AFOForm from "./MAFO";
import KAFOForm from "./MKAFO";
import LLORForm from "./MLLOR";
import LLPRForm from "./MLLPR";
import ULOForm from "./MULO";
import ULO2Form from "./MULO2";
import CaseAttachmentsList from "./CaseAttachmentsList";

import { navModules, toggleModal } from "../../store/actions/Navigation";
import { stationCaseUpdatedAction } from "../../store/actions/Station";
import { adminCaseUpdatedAction } from "../../store/actions/Admin";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;
	let measurementOnly = props.measurementOnly === undefined ? false : props.measurementOnly;

	if (state.activeModule === navModules.patient) {
		let isNew = state.patientModule.newCase === undefined ? false : true;
		// not new case
		if (state.patientModule.newCase === undefined) {
			return {
				readOnly,
				measurementOnly,
				isNew,
				activePatientId: state.patientModule.activePatientId,
				activeCaseId: state.patientModule.activeCaseId,
				activeCase: state.patientModule.activeCase,
				// activePatientData: state.patientModule.activePatientData,	// enable this if needed
			};
		} else {
			// new case
			return {
				readOnly,
				measurementOnly,
				isNew,
				activePatientId: state.patientModule.activePatientId,
			};
		}
	}

	return {
		activePatientId: state.patientModule.activePatientId,
		activePatientCaseId: state.patientModule.activePatientCaseId,
		activePatientData: state.patientModule.activePatientData,
		activePatientEditable: state.patientModule.activePatientEditable,
		// station related
		openCases: state.stationModule.openCases,
		staff: state.stationModule.staff ? state.stationModule.staff.map((staff) => staff.username) : [],
		activeCaseId: state.stationModule.activeCaseId,
		activeCaseCategory: state.stationModule.activeCaseCategory,
		stationName: state.activeModule.toLowerCase(),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		insertCase: (patientId, caseDetails) => dispatch(insertCaseAction(patientId, "orthotic", caseDetails)),
		updateCase: (caseId, caseDetails) => dispatch(updateCaseAction(caseId, "orthotic", caseDetails)),
		updateStationCase: (caseId, caseDetails, station) => dispatch(stationCaseUpdatedAction(caseId, "orthotic", caseDetails, station)),
		updateAdminCase: (caseId, approval) => dispatch(adminCaseUpdatedAction(caseId, approval)),
		toggleUplaodFileModal: () => dispatch(toggleModal("uploadFileModal", true)),
	};
};

class OrthoticForm extends Component {
	/*
		Props for behavior:
		- readOnly | bool (false) | if set true, form value change will not be triggered
		- measurementOnly | bool (false) | if set true, only display the measurement form
	*/
	constructor(props) {
		super(props);

		/*
			 orthotic profile is made up of following components:
			 - Case Attachments (independent component)
			 - Case Level Details (local fields)
			 - Measurement Form (dependent component)
		*/

		this.triggerAction = this.triggerAction.bind(this);
		this.setFormValue = this.setFormValue.bind(this);
		this.loadValues = this.loadValues.bind(this);
		this.togglePopups = this.togglePopups.bind(this);

		// labels for inputs
		this.labels = { ...defaultOrthoticFormLabelValues };
		this.state = this.loadValues();
	}

	componentDidUpdate(prevState) {
		// make it componentDidReceiveProps like
		if (
			prevState.isNew === this.props.isNew ||
			(prevState.activePatientCaseId === this.props.activePatientCaseId && prevState.activeCaseId === this.props.activeCaseId)
		)
			return;

		this.setState(this.loadValues());
	}

	// loads form and error values from DB or defaults
	loadValues() {
		// if active case exists, fetch its data
		let activeCaseData;
		if (this.props.isNew) {
			activeCaseData = { ...defaultOrthoticFormValues };
		} else {
			if (this.props.station) {
				activeCaseData = this.props.openCases.orthotic.filter((_case) => _case._id === this.props.activeCaseId)[0];
				activeCaseData = { ...defaultOrthoticFormValues, ...activeCaseData };
			} else if (this.props.admin) {
				activeCaseData = this.props.pendingCases.orthotic.filter((_case) => _case._id === this.props.activeAdminCaseId)[0];
				activeCaseData = { ...defaultOrthoticFormValues, ...activeCaseData };
			} else {
				activeCaseData = { ...defaultOrthoticFormValues, ...this.props.activeCase.orthotic };
			}
		}
		return {
			form: activeCaseData,
			staffDetailsPopup: false,
			// errors to show against validation
			errors: { ...defaultOrthoticFormErrors },
		};
	}

	setFormValue(ref, value, spread = false) {
		if (this.readOnly) return;

		let error = false;
		if (this.props.station) {
			// if required, set following for error validation
			if (ref === "applianceType") {
				if (validation.isNull(value)) error = "Appliance Type Must Be Selected";
			}
			if (ref === "staffUsername") {
				if (validation.isNull(value)) error = "Staff Username is Required";
			}
			if (ref === "staffPassword") {
				if (validation.isNull(value)) error = "Staff Password is Required";
			}
		} else {
			// validate for error
			// if required, set following for error validation
			if (ref === "applianceType") {
				if (validation.isNull(value)) error = "Appliance Type Must Be Selected";
			}
		}

		this.setState({
			form: {
				...this.state.form,
				[ref]: !spread
					? value
					: {
							...this.state.form[ref],
							...value,
					  },
			},
			errors: {
				...this.state.errors,
				[ref]: error,
			},
		});
	}

	// check for unique values and if correct, register the profile
	triggerAction() {
		// if any errors
		Object.filter = objFilter;
		if (Object.keys(Object.filter(this.state.errors, (key, value) => value !== false)).length > 0) {
			console.log("Skipping submission due to errors");
			console.log("The state: ", this.state.errors);
			return;
		}

		// if missing any required values
		let requiredFields;
		if (this.props.station) {
			requiredFields = ["applianceType", "staffUsername", "staffPassword"];
		} else {
			requiredFields = ["applianceType"];
		}

		let flaggedKeys = Object.keys(
			Object.filter(this.state.form, (key, value) => requiredFields.includes(key) && (value === undefined || value === null || value === ""))
		);
		// highlite errors for these
		if (flaggedKeys.length > 0) {
			let updatedErrors = {};
			flaggedKeys.forEach((key) => {
				updatedErrors[key] = "This field is required";
			});
			this.setState({
				errors: {
					...this.state.errors,
					...updatedErrors,
				},
			});
			return;
		}

		if (this.props.isNew) {
			// register it as new case, add patient id with the case
			let formData = {
				...this.state.form,
				[this.state.form.applianceType]: {},
			};
			this.props.insertCase(this.props.activePatientId, formData);
		} else if (this.props.station) {
			// dispatch update with case id and updated details
			let formData = this.state.form;
			this.props.updateStationCase(this.props.activeCaseId, formData, this.props.stationName);
			this.togglePopups("staffDetailsPopup");
		} else if (this.props.admin) {
			// dispatch update with case id and updated details
			// this.props.updateAdminCase(this.props.activeAdminCaseId, param);
		} else {
			// dispatch update with case id and updated details
			let formData = this.state.form;
			this.props.updateCase(this.props.activeCaseId, formData);
			// further if update was successful, merge the details with the case data
		}
	}

	// models
	togglePopups(popupId, toggleValue) {
		this.setState({
			[popupId]: toggleValue ? toggleValue : !this.state[popupId],
		});
	}
	/*
			 case detail is made up of following components:
			 - Case Attachments (independent component)
			 - Case Advise Form (dependent)
			 - Case Properties (dependent)
			 - Case Measurement Form (dependent)
		*/
	render() {
		let measurementForm = undefined;
		let attachmentComponent = undefined;
		let triggerAction = undefined;

		// add measurement form
		if (!this.props.isNew) {
			const formType = this.state.form.applianceType;
			if (formType === "AFO") {
				measurementForm = rowWrapper(<AFOForm setFormValue={this.setFormValue} readOnly={this.readOnly} />, true);
			}
			if (formType === "KAFO") {
				measurementForm = rowWrapper(<KAFOForm setFormValue={this.setFormValue} readOnly={this.readOnly} />, true);
			}
			if (formType === "LLOR") {
				measurementForm = rowWrapper(<LLORForm setFormValue={this.setFormValue} readOnly={this.readOnly} />, true);
			}
			if (formType === "LLPR") {
				measurementForm = rowWrapper(<LLPRForm setFormValue={this.setFormValue} readOnly={this.readOnly} />, true);
			}
			if (formType === "ULO") {
				measurementForm = rowWrapper(<ULOForm setFormValue={this.setFormValue} readOnly={this.readOnly} />, true);
			}
			if (formType === "ULO2") {
				measurementForm = rowWrapper(<ULO2Form setFormValue={this.setFormValue} readOnly={this.readOnly} />, true);
			}

			// finish here if only measurement form is to be displayed
			if (this.measurementOnly) {
				return <Container>{measurementForm}</Container>;
			}

			attachmentComponent = rowWrapper(<CaseAttachmentsList readOnly={this.readOnly} />, true);
		}

		let caseFields = rowWrapper(
			<Container>
				{/* Individual Heading */}
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							{"Case Overview"}
						</Typography>
					</Toolbar>
				</Row>
				{/* Type of applience, Side */}
				<Row>
					{/* Type of applience */}
					<Col className="col-6">
						<FormControl error={this.state.errors.applianceType !== false} variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("applianceType", value)}
								options={this.labels.applianceTypeOptions}
								value={this.state.form.applianceType}
								renderInput={(params) => <TextField {...params} label={this.labels.applianceType} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.applianceType}</FormHelperText>
						</FormControl>
					</Col>
					{/* Side */}
					<Col className="col-6">
						<FormControl error={this.state.errors.side !== false} variant="standard" fullWidth>
							<Autocomplete
								multiple
								onChange={(event, value) => this.setFormValue("side", value)}
								options={this.labels.sideOptions}
								value={this.state.form.side}
								renderInput={(params) => <TextField {...params} label={this.labels.side} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.side}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Deformity level, Cause */}
				<Row>
					{/* Deformity Level */}
					<Col className="col-6">
						<FormControl error={this.state.errors.deformityLevel !== false} variant="standard" fullWidth>
							<Autocomplete
								freeSolo
								multiple
								onChange={(event, value) => this.setFormValue("deformityLevel", value)}
								options={this.labels.deformityLevelOptions}
								value={this.state.form.deformityLevel}
								renderInput={(params) => <TextField {...params} label={this.labels.deformityLevel} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.deformityLevel}</FormHelperText>
						</FormControl>
					</Col>
					{/* Cause */}
					<Col className="col-6">
						<FormControl error={this.state.errors.cause !== false} variant="standard" fullWidth>
							<Autocomplete
								multiple
								onChange={(event, value) => this.setFormValue("cause", value)}
								options={this.labels.causeOptions}
								value={this.state.form.cause}
								renderInput={(params) => <TextField {...params} label={this.labels.cause} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.cause}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Trauma, Disease */}
				<Row>
					{/* Trauma */}
					<Col className="col-6">
						<FormControl error={this.state.errors.trauma !== false} variant="standard" fullWidth>
							<Autocomplete
								freeSolo
								multiple
								onChange={(event, value) => this.setFormValue("trauma", value)}
								options={this.labels.traumaOptions}
								value={this.state.form.trauma}
								renderInput={(params) => <TextField {...params} label={this.labels.trauma} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.trauma}</FormHelperText>
						</FormControl>
					</Col>
					{/* Disease */}
					<Col className="col-6">
						<FormControl error={this.state.errors.disease !== false} variant="standard" fullWidth>
							<Autocomplete
								freeSolo
								multiple
								onChange={(event, value) => this.setFormValue("disease", value)}
								options={this.labels.diseaseOptions}
								value={this.state.form.disease}
								renderInput={(params) => <TextField {...params} label={this.labels.disease} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.disease}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Deformity/ Disability */}
				<Row>
					{/* Deformity/ Disability */}
					<Col>
						<FormControl error={this.state.errors.deformity_disability !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.deformity_disability}
								value={this.state.form.deformity_disability}
								onChange={(event) => this.setFormValue("deformity_disability", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.deformity_disability}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Disability Detail */}
				<Row>
					{/* Disability Detail */}
					<Col className="col-12">
						<FormControl error={this.state.errors.disabilityDetail !== false} variant="standard" fullWidth>
							<TextField
								multiline
								margin="none"
								label={this.labels.disabilityDetail}
								value={this.state.form.disabilityDetail}
								onChange={(event) => this.setFormValue("disabilityDetail", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.disabilityDetail}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
			</Container>,
			true
		);

		// trigger action
		triggerAction = (
			<Container>
				<Row>
					<Col className="col-3 offset-9">
						<div className="form-submit-button">
							<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
								{this.props.isNew ? "Register Case" : "Update"}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		);

		// user data popup
		const userCredentialsPopup = (
			<Modal show={this.state.staffDetailsPopup} onHide={() => this.togglePopups("staffDetailsPopup")}>
				<Modal.Header closeButton>
					<Modal.Title>Enter Your Credentials</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormControl error={this.state.errors.staffUsername !== false} variant="standard" fullWidth>
						<Autocomplete
							onChange={(event, value) => this.setFormValue("staffUsername", value)}
							options={this.props.staff}
							value={this.state.form.staffUsername}
							renderInput={(params) => <TextField {...params} label={this.labels.staffUsername} variant="standard" />}
						/>
						<FormHelperText>{this.state.errors.staffUsername}</FormHelperText>
					</FormControl>
					<FormControl error={this.state.errors.staffPassword !== false} variant="standard" fullWidth>
						<TextField
							margin="none"
							type="password"
							label={this.labels.staffPassword}
							value={this.state.form.staffPassword}
							onChange={(event) => this.setFormValue("staffPassword", event.target.value)}
							variant="standard"
						/>
						<FormHelperText>{this.state.errors.staffPassword}</FormHelperText>
					</FormControl>
					<div>
						{/* style={{ float: "right", padding: "10px 20px 10px 20px" }} */}
						<Button variant="contained" color="primary" style={{ float: "right" }} onClick={this.triggerAction}>
							{"Send"}
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		);

		// return accordian with container rows for individual sub-components
		let content = (
			<Container>
				{attachmentComponent}
				{caseFields}
				{measurementForm}
				{triggerAction}
				{userCredentialsPopup}
			</Container>
		);
		return content;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrthoticForm);

import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col, Modal } from "react-bootstrap";
import { TextField, FormControl, FormHelperText, Button, Toolbar, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { insertCaseAction, updateCaseAction } from "../../store/actions/Patient";
import {
	defaultProstheticFormValues,
	defaultProstheticFormErrors,
	defaultProstheticFormLabelValues,
	defaultProfileFormLabelValues,
} from "../../store/misc/formValues";
import { rowWrapper, objFilter, validation } from "../../store/misc/global";

import TTPForm from "./MTTP";
import TFPForm from "./MTFP";
// import AdviceForm from "./AdviseForm";

import { navModules, toggleModal } from "../../store/actions/Navigation";
import { stationCaseUpdatedAction } from "../../store/actions/Station";
import { adminCaseUpdatedAction } from "../../store/actions/Admin";

import "./FormStyles.css";
import AdviseForm from "./AdviseForm";
import CaseAttachmentsList from "./CaseAttachmentsList";

const mapStateToProps = (state, props) => {
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
				patientCategory: state.patientModule.activePatientData.category,
				activeCaseId: state.patientModule.activeCaseId,
				activeCase: state.patientModule.activeCase.prosthetic,
				// activePatientId: state.patientModule.activePatientId,
				// activePatientData: state.patientModule.activePatientData, // enable this if needed
			};
		} else {
			// new case
			return {
				readOnly,
				measurementOnly,
				isNew,
				activePatientId: state.patientModule.activePatientId,
				patientCategory: state.patientModule.activePatientData.category,
			};
		}
	}

	if (state.activeModule === navModules.admin) {
		return {
			patientCategory: state.adminModule.activeCase.personalDetails.category,
			activeCaseId: state.adminModule.activeCase._id,
			activeCase: state.adminModule.activeCase,
			// activePatientData: state.patientModule.activePatientData, // enable this if needed
		};
	}

	return {
		activePatientId: state.patientModule.activePatientId,
		activePatientCaseId: state.patientModule.activePatientCaseId,
		activePatientData: state.patientModule.activePatientData,
		activePatientEditable: state.patientModule.activePatientEditable,
		// station related
		openCases: state.stationModule.openCases,
		staff: state.stationModule.staff ? state.stationModule.staff.map((staff) => staff.username) : [],
		activeStationCaseId: state.stationModule.activeCaseId,
		activeCaseCategory: state.stationModule.activeCaseCategory,
		stationName: state.activeModule.toLowerCase(),
		// admin related
		pendingCases: state.adminModule.pendingCases,
		activeAdminCaseId: state.adminModule.activeCaseId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		insertCase: (patientId, caseDetails) => dispatch(insertCaseAction(patientId, "prosthetic", caseDetails)),
		updateCase: (caseId, caseDetails) => dispatch(updateCaseAction(caseId, "prosthetic", caseDetails)),
		updateStationCase: (caseId, caseDetails, station) => dispatch(stationCaseUpdatedAction(caseId, "prosthetic", caseDetails, station)),
		updateAdminCase: (caseId, approval) => dispatch(adminCaseUpdatedAction(caseId, approval)),
		toggleUplaodFileModal: () => dispatch(toggleModal("uploadFileModal", true)),
	};
};

class ProstheticForm extends Component {
	/*
		Props for behavior:
		- readOnly | bool (false) | if set true, form value change will not be triggered
		- measurementOnly | bool (false) | if set true, only display the measurement form
	*/
	constructor(props) {
		super(props);

		/*
			 prosthetic profile is made up of following components:
			 - Case Attachments (independent component)
			 - Advise Form (optional, dependent component)
			 - Case Level Details (local fields)
			 - Measurement Form (dependent component)
		*/

		this.triggerAction = this.triggerAction.bind(this);
		this.setFormValue = this.setFormValue.bind(this);
		this.loadValues = this.loadValues.bind(this);
		this.togglePopups = this.togglePopups.bind(this);

		// labels for inputs
		this.labels = { ...defaultProstheticFormLabelValues };
		this.state = this.loadValues();
	}

	componentDidUpdate(prevState) {
		// make it componentDidReceiveProps like
		if (
			prevState.isNew === this.props.isNew ||
			(prevState.activeCaseId === this.props.activeCaseId && prevState.activeCaseId === this.props.activeStationCaseId)
		)
			return;
		this.setState(this.loadValues());
	}

	// loads form and error values from DB or defaults
	loadValues() {
		let activeCaseData;

		// New
		if (this.props.isNew) {
			activeCaseData = { ...defaultProstheticFormValues };
		} 
		// Station ?
		else if (this.props.station) {
			activeCaseData = this.props.openCases.prosthetic.filter((_case) => _case._id === this.props.activeStationCaseId)[0];
			activeCaseData = { ...defaultProstheticFormValues, ...activeCaseData };
		} 
		// Admin or Patient
		else {
			activeCaseData = { ...defaultProstheticFormValues, ...this.props.activeCase };
		}
		return {
			form: activeCaseData,
			staffDetailsPopup: false,
			// errors to show against validation
			errors: { ...defaultProstheticFormErrors },
		};
	}

	setFormValue(ref, value, spread = false) {
		if (this.readOnly) return;

		let error = false;
		if (this.props.station) {
			if (ref === "amputationType") {
				if (validation.isNull(value)) error = "Amputation Type Must Be Selected";
			}
			if (ref === "staffUsername") {
				if (validation.isNull(value)) error = "Staff Username is Required";
			}
			if (ref === "staffPassword") {
				if (validation.isNull(value)) error = "Staff Password is Required";
			}
			// } else if (this.props.admin) {
		} else {
			// validate for error
			// if required, set following for error validation
			if (ref === "amputationType") {
				if (validation.isNull(value)) error = "Amputation Type Must Be Selected";
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
			requiredFields = ["amputationType", "staffUsername", "staffPassword"];
		} else {
			requiredFields = ["amputationType"];
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
				patientCategory: this.props.patientCategory,
				[this.state.form.amputationType]: {},
				adviseForm:
					this.props.patientCategory === defaultProfileFormLabelValues.categoryOptions[0] ||
					this.props.patientCategory === defaultProfileFormLabelValues.categoryOptions[1]
						? {}
						: undefined,
			};
			this.props.insertCase(this.props.activePatientId, formData);
		} else if (this.props.station) {
			// dispatch update with case id and updated details
			let formData = this.state.form;
			this.props.updateStationCase(this.props.activeStationCaseId, formData, this.props.stationName);
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

	render() {
		let measurementForm = undefined;
		let attachmentComponent = undefined;
		let adviseFormComponent = undefined;
		let triggerAction = undefined;

		// add measurement form
		if (!this.props.isNew) {
			const formType = this.state.form.amputationType;
			if (formType === "TTP") {
				measurementForm = rowWrapper(
					<TTPForm
						// triggerAction={
						// 	this.props.station ? () => this.togglePopups("staffDetailsPopup") : this.props.admin ? (approval) => this.triggerAction(approval) : this.triggerAction
						// }
						// station={this.props.station}
						// admin={this.props.admin}
						setFormValue={this.setFormValue}
						readOnly={this.readOnly}
					/>,
					true
				);
			}
			if (formType === "TFP") {
				measurementForm = rowWrapper(<TFPForm setFormValue={this.setFormValue} readOnly={this.readOnly} />, true);
			}

			// finish here if only measurement form is to be displayed
			if (this.measurementOnly) {
				return <Container>{measurementForm}</Container>;
			}

			attachmentComponent = rowWrapper(<CaseAttachmentsList readOnly={this.readOnly} />, true);
			if (
				this.props.patientCategory === defaultProfileFormLabelValues.categoryOptions[0] ||
				this.props.patientCategory === defaultProfileFormLabelValues.categoryOptions[1]
			) {
				adviseFormComponent = rowWrapper(<AdviseForm setFormValue={this.setFormValue} />, true);
			}
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
				{/* Onset Date, Onset Place, Operational/Peace Area */}
				<Row>
					{/* Onset Date */}
					<Col className="col-2">
						<FormControl error={this.state.errors.onsetDate !== false} variant="standard" fullWidth>
							<TextField
								label={this.labels.onsetDate}
								type="date"
								value={this.state.form.onsetDate}
								onChange={(event) => this.setFormValue("onsetDate", event.target.value)}
								required
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<FormHelperText>{this.state.errors.onsetDate}</FormHelperText>
						</FormControl>
					</Col>
					{/* Onset Place */}
					<Col className="col-7">
						<FormControl error={this.state.errors.onsetPlace !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.onsetPlace}
								value={this.state.form.onsetPlace}
								onChange={(event) => this.setFormValue("onsetPlace", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.onsetPlace}</FormHelperText>
						</FormControl>
					</Col>
					{/* Operational/Peace area */}
					<Col className="col-3">
						<FormControl error={this.state.errors.area !== false} variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("area", value)}
								options={this.labels.areaOptions}
								renderInput={(params) => <TextField {...params} label={this.labels.area} variant="standard" />}
								value={this.state.form.area}
							/>
							<FormHelperText>{this.state.errors.area}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Cause, Diagnosis Disability */}
				<Row>
					{/* Cause */}
					<Col className="col-6">
						<FormControl error={this.state.errors.cause !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.cause}
								value={this.state.form.cause}
								onChange={(event) => this.setFormValue("cause", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.cause}</FormHelperText>
						</FormControl>
					</Col>
					{/* Diagnosis Disability */}
					<Col className="col-6">
						<FormControl error={this.state.errors.diagnosis_disability !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.diagnosis_disability}
								value={this.state.form.diagnosis_disability}
								onChange={(event) => this.setFormValue("diagnosis_disability", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.diagnosis_disability}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Disability Detail, Amputation Level */}
				<Row>
					{/* Disability Detail */}
					<Col className="col-6">
						<FormControl error={this.state.errors.disabilityDetail !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.disabilityDetail}
								value={this.state.form.disabilityDetail}
								onChange={(event) => this.setFormValue("disabilityDetail", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.disabilityDetail}</FormHelperText>
						</FormControl>
					</Col>
					{/* Amputation Level */}
					<Col className="col-6">
						<FormControl error={this.state.errors.amputationLevel !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.amputationLevel}
								value={this.state.form.amputationLevel}
								onChange={(event) => this.setFormValue("amputationLevel", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.amputationLevel}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Amputation Type, Side */}
				<Row>
					{/* Amputation Type */}
					<Col className="col-6">
						<FormControl error={this.state.errors.amputationType !== false} variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("amputationType", value)}
								options={this.labels.amputationTypeOptions}
								value={this.state.form.amputationType}
								renderInput={(params) => <TextField {...params} label={this.labels.amputationType} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.amputationType}</FormHelperText>
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
				{/* Prescription, Components Detail */}
				<Row>
					{/* Prescription */}
					<Col className="col-6">
						<FormControl error={this.state.errors.prescription !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.prescription}
								value={this.state.form.prescription}
								onChange={(event) => this.setFormValue("prescription", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.prescription}</FormHelperText>
						</FormControl>
					</Col>
					{/* Components Detail */}
					<Col className="col-6">
						<FormControl error={this.state.errors.componentsDetail !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.componentsDetail}
								value={this.state.form.componentsDetail}
								onChange={(event) => this.setFormValue("componentsDetail", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.componentsDetail}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Socket Type, Foot Type */}
				<Row>
					{/* Socket Type */}
					<Col className="col-6">
						<FormControl error={this.state.errors.socketType !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.socketType}
								value={this.state.form.socketType}
								onChange={(event) => this.setFormValue("socketType", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.socketType}</FormHelperText>
						</FormControl>
					</Col>
					{/* Foot Type */}
					<Col className="col-6">
						<FormControl error={this.state.errors.footType !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.footType}
								value={this.state.form.footType}
								onChange={(event) => this.setFormValue("footType", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.footType}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Linner Type, Knee Joint Type */}
				<Row>
					{/* Linner Type */}
					<Col className="col-6">
						<FormControl error={this.state.errors.linnerType !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.linnerType}
								value={this.state.form.linnerType}
								onChange={(event) => this.setFormValue("linnerType", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.linnerType}</FormHelperText>
						</FormControl>
					</Col>
					{/* Knee Joint Type */}
					<Col className="col-6">
						<FormControl error={this.state.errors.kneeJointType !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.kneeJointType}
								value={this.state.form.kneeJointType}
								onChange={(event) => this.setFormValue("kneeJointType", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.kneeJointType}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Modility Grade, K-Classification */}
				<Row>
					{/* Modility Grade */}
					<Col className="col-6">
						<FormControl error={this.state.errors.modilityGrade !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.modilityGrade}
								value={this.state.form.modilityGrade}
								onChange={(event) => this.setFormValue("modilityGrade", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.modilityGrade}</FormHelperText>
						</FormControl>
					</Col>
					{/* K-Classification */}
					<Col className="col-6">
						<FormControl error={this.state.errors.kClassification !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.kClassification}
								value={this.state.form.kClassification}
								onChange={(event) => this.setFormValue("kClassification", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.kClassification}</FormHelperText>
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
				{adviseFormComponent}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProstheticForm);

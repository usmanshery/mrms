import React, { Component } from "react";
import { connect } from "react-redux";
import { objFilter } from "../../store/misc/global";
import { insertCaseAction, updateCaseAction } from "../../store/actions/Patient";

import { TextField, FormControl, FormHelperText, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {
		activePatientId: state.patientModule.activePatientId,
		activePatientCaseId: state.patientModule.activePatientCaseId,
		activePatientData: state.patientModule.activePatientData,
		activePatientEditable: state.patientModule.activePatientEditable,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		insertCase: (patientId, caseDetails) => dispatch(insertCaseAction(patientId, "orthotic", caseDetails)),
		updateCase: (caseId, caseDetails) => dispatch(updateCaseAction(caseId, "orthotic", caseDetails)),
	};
};

/*
	this form will create basic user profile and submit the json object of basic user profile
	this class will have dispatch method to add new patient
	this class will have dispatch method to verify user information against existing users
*/

class OrthoticForm extends Component {
	constructor(props) {
		super(props);

		// if active case exists, fetch its data
		let activeCaseData = this.props.activePatientData.cases.filter((_case) => _case.orthotic._id === this.props.activePatientCaseId);
		if (activeCaseData.length === 0) {
			activeCaseData = undefined;
		}

		if (activeCaseData !== undefined) {
			activeCaseData = activeCaseData[0].orthotic;
		}

		this.state = {
			form: {
				// Row
				side: this.props.isNew ? [] : activeCaseData.side,
				deformityLevel: this.props.isNew ? [] : activeCaseData.deformityLevel,
				cause: this.props.isNew ? [] : activeCaseData.cause,
				trauma: this.props.isNew ? [] : activeCaseData.trauma,
				disease: this.props.isNew ? [] : activeCaseData.disease,
				deformity_disability: this.props.isNew ? "" : activeCaseData.deformity_disability,
				disabilityDetail: this.props.isNew ? "" : activeCaseData.disabilityDetail,
				treatmentObjectives: this.props.isNew ? [] : activeCaseData.treatmentObjectives,
				applianceType: this.props.isNew ? [] : activeCaseData.applianceType,
			},
			// errors to show against validation
			errors: {
				side: false,
				deformityLevel: false,
				cause: false,
				trauma: false,
				disease: false,
				deformity_disability: false,
				disabilityDetail: false,
				treatmentObjectives: false,
				applianceType: false,
			},
			profile: props.profile,
		};

		// labels for inputs
		this.labels = {
			side: "Side",
			sideOptions: ["Bilateral", "Left", "Right"],

			// other
			deformityLevel: "Level of Deformity",
			deformityLevelOptions: ["Hip", "Knee", "Ankle", "Foot"],

			cause: "Cause",
			causeOptions: ["Trauma", "Disease", "Tumor", "Congenital"],

			// other
			trauma: "Trauma",
			traumaOptions: ["Road Side Accident", "Mechanical Accident", "Gun Shot", "Fall", "Landmin", "Bomb Blast", "Burns"],

			// other
			disease: "Disease",
			diseaseOptions: ["Diahetes", "Vascular Disease", "Osteomyleitis", "CP", "Polio", "Arthritis", "TB", "Paraplegia", "Hemiphegia", "Spina Bifiba"],

			deformity_disability: "Deformity/ Disability",
			disabilityDetail: "Detail of Disability",

			// other
			treatmentObjectives: "Treatment Objectives",
			treatmentObjectivesOptions: ["Prevent/Correct Deformity", "Improve Ambulation", "Reduce Axial Load", "Fracture Treatment", "Protect Joint"],

			// other
			applianceType: "Type of Appliance",
			applianceTypeOptions: ["FO", "AFO", "KAFO", "HKAFO", "KO", "Hip O"],
		};

		this.triggerAction = this.triggerAction.bind(this);
	}

	setFormValue(ref, value) {
		if (!this.props.activePatientEditable) return;
		// validate for error
		let error = false;

		// if required, set following for error validation
		// if (ref === "<title>") {}

		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
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
			return;
		}

		if (this.props.isNew) {
			// register it as new case, add patient id with the case
			// prepare data
			let formData = this.state.form;
			// post data
			this.props.insertCase(this.props.activePatientId, formData);
		} else {
			// dispatch update with case id and updated details
			// prepare data
			let formData = this.state.form;
			// post data
			this.props.updateCase(this.props.activePatientCaseId, formData);
			// further if update was successful, merge the details with the case data
		}
	}

	render() {
		let triggerAction = undefined;
		if (this.props.activePatientEditable === true) {
			triggerAction = (
				<Row>
					<Col className="col-3 offset-9">
						<div className="form-submit-button">
							<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
								{this.props.isNew ? "Save" : "Update"}
							</Button>
						</div>
					</Col>
				</Row>
			);
		}

		return (
			<Container className="xgreenBackground">
				{/* Side, deformity level */}
				<Row>
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
				</Row>
				{/* Cause, Trauma */}
				<Row>
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
				</Row>
				{/* Deformity/ Disability, Disease */}
				<Row>
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
					{/* Deformity/ Disability */}
					<Col className="col-6">
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
				{/* Deformity/ Disability */}
				<Row>
					{/* Deformity/ Disability */}
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

				{triggerAction}
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrthoticForm);

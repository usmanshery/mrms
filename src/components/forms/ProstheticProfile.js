import React, { Component } from "react";
import { connect } from "react-redux";
import { onVerifyPatientInfo, registerPatient } from "../../store/session";

import { TextField, FormControl, FormHelperText, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verifyPatientInfo: (contactNo) => dispatch(onVerifyPatientInfo({ contactNo })),
		registerPatientProfile: (profile) => dispatch(registerPatient(profile)),
	};
};

class ProstheticForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				onsetDate: undefined,
				onsetPlace: "",
				area: "",
				cause: "",
				diagnosis_disability: "",
				disabilityDetail: "",
				amputationLevel: "",
				amputationType: "",
				side: [],
				prescription: "",
				componentsDetail: "",
				socketType: "",
				footType: "",
				linnerType: "",
				kneeJointType: "",
				modilityGrade: "",
				kClassification: ""
			},
			// errors to show against validation
			errors: {
				onsetDate: false,
				onsetPlace: false,
				area: false,
				cause: false,
				diagnosis_disability: false,
				disabilityDetail: false,
				amputationLevel: false,
				amputationType: false,
				side: [],
				prescription: false,
				componentsDetail: false,
				socketType: false,
				footType: false,
				linnerType: false,
				kneeJointType: false,
				modilityGrade: false,
				kClassification: false
			},
			profile: props.profile,
		};

		// labels for inputs
		this.labels = {
			onsetDate: "Date of Onset",
			onsetPlace: "Place of Onset",

			area: "Area",
			areaOptions: ["Operation", "Peace"],

			cause: "Cause",
			diagnosis_disability: "Diagnosis/ Disability",

			disabilityDetail: "Detail of Disability",
			amputationLevel: "Level of Amputation",

			amputationType: "Type of Amputation",

			side: "Side",
			sideOptions: ["Bilateral", "Unilateral", "Left", "Right"],

			prescription: "Prescription",
			componentsDetail: "Detail of Components",

			socketType: "Socket Type",
			footType: "Foot Type",

			linnerType: "Linner Type",
			kneeJointType: "Knee Joint Type",

			modilityGrade: "Modility Grade",
			kClassification: "K-Classification"
		};

		// validation functions
		this.validation = {
			isNull: (value) => value === undefined || value.length === 0,
			isUnderSize: (minLength) => (value = "") => value.length < minLength,
			isOverSize: (maxLength) => (value = "") => value.length > maxLength,
			isNotNumber: (value) => isNaN(value),
		};
	}

	setFormValue(ref, value) {
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

	render() {
		return (
			<Container>
				{/* Onset Date, Onset Place, Operational/Peace Area */}
				<Row>
					{/* Onset Date */}
					<Col className="col-2">
						<FormControl error={this.state.errors.onsetDate !== false} variant="standard" fullWidth>
							<TextField
								label={this.labels.onsetDate}
								type="date"
								value={this.state.form.onsetDate}
								onChange={event => this.setFormValue("onsetDate", event.target.value)}
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
							<TextField
								margin="none"
								label={this.labels.amputationType}
								value={this.state.form.amputationType}
								onChange={(event) => this.setFormValue("amputationType", event.target.value)}
								variant="standard"
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
				<Row>
					<Col className="col-3 offset-9">
						<div className="form-submit-button">
							<Button variant="contained" color="primary">
								Save Case
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
			/*
				Fields:
					side
					deformityLevel
					cause
					trauma
					disease
					deformity_disability
					disabilityDetail
					treatmentObjectives
					applianceType
				
				Setup other needed fields:
					
			*/
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProstheticForm);

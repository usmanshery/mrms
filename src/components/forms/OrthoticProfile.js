import React, { Component } from "react";
import { connect } from "react-redux";
import { onVerifyPatientInfo, registerPatient } from "../../store/session";

import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button } from "@material-ui/core";
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

/*
	this form will create basic user profile and submit the json object of basic user profile
	this class will have dispatch method to add new patient
	this class will have dispatch method to verify user information against existing users

*/

class OrthoticForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				// Row
				side: [],
				deformityLevel: [],
				cause: [],
				trauma: [],
				disease: [],
				deformity_disability: "",
				disabilityDetail: "",
				treatmentObjectives: [],
				applianceType: [],
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
			sideOptions: ["Bilateral", "Unilateral", "Left", "Right"],

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
			<Container className="xgreenBackground">
				{/* Name, Father's Name, Gender, Age */}
				<Row>
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
					{/* Deformity Level */}
					<Col className="col-6">
						<FormControl error={this.state.errors.deformityLevel !== false} variant="standard" fullWidth>
							<Autocomplete
								freeSolo
								multiple
								onChange={(event, value) => this.setFormValue("deformityLevel", value)}
								options={this.labels.deformityLevelOptions}
								renderInput={(params) => <TextField {...params} label={this.labels.deformityLevel} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.deformityLevel}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				<Row>
					{/* Cause */}
					<Col className="col-6">
						<FormControl error={this.state.errors.cause !== false} variant="standard" fullWidth>
							<Autocomplete
								multiple
								onChange={(event, value) => this.setFormValue("cause", value)}
								options={this.labels.causeOptions}
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
								renderInput={(params) => <TextField {...params} label={this.labels.trauma} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.trauma}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				<Row>
					{/* Disease */}
					<Col className="col-6">
						<FormControl error={this.state.errors.disease !== false} variant="standard" fullWidth>
							<Autocomplete
								freeSolo
								multiple
								onChange={(event, value) => this.setFormValue("disease", value)}
								options={this.labels.diseaseOptions}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrthoticForm);

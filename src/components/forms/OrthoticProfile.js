import React, { Component } from "react";
import { connect } from "react-redux";
import { onVerifyPatientInfo, registerPatient } from "../../store/session";

import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';

import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verifyPatientInfo: (contactNo) => dispatch(onVerifyPatientInfo({ contactNo })),
		registerPatientProfile: (profile) => dispatch(registerPatient(profile))
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
				side: "",
				deformityLevel: "",
				cause: "",
				trauma: "",
				disease: "",
				deformity_disability: "",
				disabilityDetail: "",
				treatmentObjectives: "",
				applianceType: ""
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
				applianceType: false
			},
			profile: props.profile
		};

		// labels for inputs
		this.labels = {
			side: "Side",
			sideOptions: ["Bilateral", "Unilateral", "Left", "Right"],
			deformityLevel: "Level of Deformity",
			deformityLevelOptions: ["Hip", "Knee", "Ankle", "Foot"],
			cause: "Cause",
			trauma: "Trauma",
			disease: "Disease",
			deformity_disability: "Deformity/ Disability",
			disabilityDetail: "Detail of Disability",
			treatmentObjectives: "Treatment Objectives",
			applianceType: "Type of Appliance"
		};

		// validation functions
		this.validation = {
			isNull: (value) => value === undefined || value.length === 0,
			isUnderSize: (minLength) => (value = "") => value.length < minLength,
			isOverSize: (maxLength) => (value = "") => value.length > maxLength,
			isNotNumber: (value) => isNaN(value),
		};
	}

	// componentDidMount() {
	// 	this.props.verifyPatientInfo("test contact number 123");
	// }

	setFormValue(ref, value) {
		// validate for error
		let error = false;

		if (ref === "name") {
			if (this.validation.isNull(value)) error = "Patient Name is Required";
			if (this.validation.isOverSize(5)(value))
				error = "Name Should Be Under 100 Characters";
		}
		if (ref === "fathername") {
			if (this.validation.isNull(value)) error = "This Field is Required";
			if (this.validation.isOverSize(5)(value))
				error = "Name Should Be Under 100 Characters";
		}
		if (ref === "phone") {
			if (this.validation.isNull(value))
				error = "Patient's Contact Number is Required";
		}
		if (ref === "sex") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "age") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "address") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "city") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}

		console.log("reference:", ref);
		console.log("value:", value);
		console.log("Error:", error);

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
	register() {
		this.props.registerPatientProfile({})
	}

	render() {
		return (
			<Container className="xgreenBackground">
				{/* Name, Father's Name, Gender, Age */}
				<Row>
					<Col className="col-4">
						<FormControl
							error={this.state.errors.side !== false}
							variant="standard"
							className="fullWidth"
						>
							<InputLabel>{this.labels.side}</InputLabel>
							<Select
								className="fullWidth"
								value={this.state.form.side}
								onChange={(event) => this.setFormValue("side", event.target.value)}
								required
							>
								{[<MenuItem value=""><em>Select</em></MenuItem>].concat(this.labels.sideOptions.map((value) => <MenuItem value={value}>{value}</MenuItem>))}
							</Select>
							<FormHelperText>{this.state.errors.side}</FormHelperText>
						</FormControl>
					</Col>
					<Col className="col-4">
						<Autocomplete
							freeSolo
							options={this.labels.deformityLevelOptions}
							renderInput={(params) => (
								<TextField {...params} label={this.labels.deformityLevel} variant="standard" />
							)}
						/>
					</Col>
					<Col className="col-4">
						<Autocomplete
							freeSolo
							options={this.labels.deformityLevelOptions}
							renderInput={(params) => (
								<TextField {...params} label={this.labels.deformityLevel} variant="standard" />
							)}
						/>
					</Col>
				</Row>
				{/* Address and City */}
				<Row>
					<Col>
						<TextField
							className={"fullWidth"}
							label={this.labels.address}
							value={this.state.form.address}
							onChange={(event) => this.setFormValue("address", event.target.value)}
							error={this.state.errors.address !== false}
							helperText={this.state.errors.address}
							required
							variant="standard"
						/>
					</Col>
				</Row>
				{/* Contact Number so far and a lot of space */}
				<Row>
					<Col className="col-4">
						<FormControl
							error={this.state.errors.city !== false}
							variant="standard"
							className="fullWidth"
						>
							<InputLabel>{this.labels.city}</InputLabel>
							<Select
								className="fullWidth"
								value={this.state.form.city}
								onChange={(event) => this.setFormValue("city", event.target.value)}
								required
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={"Lahore"}>Lahore</MenuItem>
								<MenuItem value={"Rawalpindi"}>Rawalpindi</MenuItem>
							</Select>
							<FormHelperText>{this.state.errors.city}</FormHelperText>
						</FormControl>
					</Col>
					<Col className="col-2">
						<TextField
							className={"fullWidth"}
							label={this.labels.phone}
							value={this.state.form.phone}
							onChange={(event) => this.setFormValue("phone", event.target.value)}
							error={this.state.errors.phone !== false}
							helperText={this.state.errors.phone}
							required
							variant="standard"
							type="number"
						/>
					</Col>
					<Col className="col-3 offset-3">
						<div className="form-submit-button">
							<Button variant="contained" color="primary">
								Register Patient
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
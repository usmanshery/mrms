import React, { Component } from "react";
import { connect } from "react-redux";
import { registerPatient } from "../../store/actions/Patient";
import { onVerifyPatientInfo, cities, objFilter } from "../../store/session";

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

class PatientSearchForm extends Component {
	constructor(props) {
		super(props);

		this.searchPersonal = this.searchPersonal.bind(this);

		this.state = {
			form: {
				name: "",
				fathername: "",
				sex: "",
				age: "",
				ageRange: "",
				phone: "",
				rank: "",
				armynumber: "",
				unit: "",
				city: "",
			},
			// errors to show against validation
			errors: {
				name: false,
				fathername: false,
				sex: false,
				age: false,
				ageRange: false,
				phone: false,
				rank: false,
				armynumber: false,
				unit: false,
				city: false,
			},
		};

		// labels for inputs
		this.labels = {
			name: "Patient Name",
			fathername: "Father's Name",

			sex: "Gender",
			sexOptions: ["Male", "Female", "Both"],

			phone: "Contact Number",
			age: "Age",
			ageRange: "Age Range (+-)",

			rank: "Rank",
			rankOptions: ["Lt", "Capt", "Maj", "Lt Col", "Col", "Brig", "Maj Gen", "Lt Gen", "Gen"],

			armynumber: "Army Number",
			unit: "Unit",

			city: "City",
			cityOptions: cities,
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

	searchPersonal() {
		Object.filter = objFilter;

		let params = Object.filter(this.state.form, (key, value) => value && value !== null && value !== "");
		if (Object.keys(params).length > 0) {
		} else {
			console.log("Sorry no search");
		}
	}

	searchCases() {}

	render() {
		return (
			<Container>
				<Row>Search (Patient Persoanl Details)</Row>
				{/* Name & Father's name */}
				<Row>
					{/* Name */}
					<Col className="col-6">
						<FormControl error={this.state.errors.name !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.name}
								value={this.state.form.name}
								onChange={(event) => this.setFormValue("name", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.name}</FormHelperText>
						</FormControl>
					</Col>
					{/* Father's Name */}
					<Col className="col-6">
						<FormControl error={this.state.errors.fathername !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.fathername}
								value={this.state.form.fathername}
								onChange={(event) => this.setFormValue("fathername", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.fathername}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Age, Age Range, Gender, Contact Number */}
				<Row>
					{/* Gender */}
					<Col className="col-3">
						<FormControl error={this.state.errors.sex !== false} variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("sex", value)}
								options={this.labels.sexOptions}
								renderInput={(params) => <TextField {...params} label={this.labels.sex} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.sex}</FormHelperText>
						</FormControl>
					</Col>
					{/* Phone */}
					<Col className="col-3">
						<FormControl error={this.state.errors.phone !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.phone}
								value={this.state.form.phone}
								onChange={(event) => this.setFormValue("phone", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.phone}</FormHelperText>
						</FormControl>
					</Col>
					{/* Age */}
					<Col className="col-3">
						<FormControl error={this.state.errors.age !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.age}
								value={this.state.form.age}
								onChange={(event) => this.setFormValue("age", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.age}</FormHelperText>
						</FormControl>
					</Col>
					{/* Age Range */}
					<Col className="col-3">
						<FormControl error={this.state.errors.ageRange !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.ageRange}
								value={this.state.form.ageRange}
								onChange={(event) => this.setFormValue("ageRange", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.ageRange}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Rank, Armynumber, Unit */}
				<Row>
					{/* Rank */}
					<Col className="col-2">
						<FormControl error={this.state.errors.rank !== false} variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("rank", value)}
								options={this.labels.rankOptions}
								renderInput={(params) => <TextField {...params} label={this.labels.rank} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.rank}</FormHelperText>
						</FormControl>
					</Col>
					{/* Armynumber */}
					<Col className="col-2">
						<FormControl error={this.state.errors.armynumber !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.armynumber}
								value={this.state.form.armynumber}
								onChange={(event) => this.setFormValue("armynumber", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.armynumber}</FormHelperText>
						</FormControl>
					</Col>
					{/* Unit */}
					<Col className="col-3">
						<FormControl error={this.state.errors.unit !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.unit}
								value={this.state.form.unit}
								onChange={(event) => this.setFormValue("unit", event.target.value)}
								variant="standard"
							/>
							<FormHelperText>{this.state.errors.unit}</FormHelperText>
						</FormControl>
					</Col>
					{/* City */}
					<Col className="col-5">
						<FormControl required error={this.state.errors.city !== false} variant="standard" fullWidth>
							<Autocomplete
								freeSolo
								required
								onChange={(event, value) => this.setFormValue("city", value)}
								options={this.labels.cityOptions}
								renderInput={(params) => <TextField {...params} label={this.labels.city} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.city}</FormHelperText>
						</FormControl>
					</Col>
				</Row>

				<Row>
					<Col className="col-3 offset-9">
						<div className="form-submit-button">
							<Button variant="contained" color="primary" onClick={() => this.searchPersonal()}>
								Search
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientSearchForm);
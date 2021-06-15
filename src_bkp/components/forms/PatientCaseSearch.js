import React, { Component } from "react";
import { connect } from "react-redux";

import { cities, objFilter } from "../../store/misc/global";

import { Autocomplete } from "@material-ui/lab";
import { Container, Row, Col } from "react-bootstrap";
import { TextField, FormControl, FormHelperText, Button } from "@material-ui/core";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

class PatientCasesSearchForm extends Component {
	constructor(props) {
		super(props);

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

		this.trigger =
			this.props.triggerName && this.props.triggerCallback ? (
				<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
					{this.props.triggerName}
				</Button>
			) : undefined;
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

	// check for unique values and if correct, register the profile
	triggerAction() {
		Object.filter = objFilter;
		// if missing any required values
		let usedKeys = Object.keys(Object.filter(this.state.form, (key, value) => value !== undefined && value !== null && value !== ""));
		if (usedKeys.length === 0) {
			return;
		}
		let filteredParameters = Object.filter(this.state.form, (key, value) => value !== undefined && value !== null && value !== "");

		this.props.triggerCallback(filteredParameters);
	}

	clearForm() {
		this.setState({
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
		});
	}

	render() {
		const triggerElement = this.trigger ? (
			<Row>
				<Col className="col-1 offset-8">
					<Button variant="contained" color="secondary" onClick={() => this.clearForm()}>
						Clear
					</Button>
				</Col>
				<Col className="col-3 ">{this.trigger}</Col>
			</Row>
		) : undefined;

		return (
			<Container>
				<Row>Search By Cases</Row>
				{/* Case Type, Case ID */}
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
				{/* Case Registration Date */}
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
				{triggerElement}
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientCasesSearchForm);

import React, { Component } from "react";
import { connect } from "react-redux";

import { objFilter, validation } from "../../store/misc/global";

import { Autocomplete } from "@material-ui/lab";
import { Container, Row, Col } from "react-bootstrap";
import { TextField, FormControl, FormHelperText, Button } from "@material-ui/core";

import { searchPatientProfileAction } from "../../store/actions/Patient";

import "./FormStyles.css";
import { defaultProfileSearchFormErrors, defaultProfileSearchFormLabelValues, defaultProfileSearchFormValues } from "../../store/misc/formValues";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchPatientProfile: (searchParams) => dispatch(searchPatientProfileAction(searchParams)),
	};
};

class PatientProfileSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				...defaultProfileSearchFormValues,
			},
			errors: {
				...defaultProfileSearchFormErrors,
			},
		};

		// labels for inputs
		this.labels = {
			...defaultProfileSearchFormLabelValues,
		};
	}

	setFormValue(ref, value) {
		if (ref === "phone") {
			if (validation.isOverSize(11)(value)) return;
			if (validation.isNotNumber(value)) return;
		}

		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
			errors: {
				...defaultProfileSearchFormErrors,
			},
		});
	}

	// check for unique values and if correct, register the profile
	triggerAction() {
		// static error testing

		Object.filter = objFilter;
		// if missing any required values
		let usedKeys = Object.keys(Object.filter(this.state.form, (key, value) => value !== undefined && value !== null && value !== ""));
		if (usedKeys.length === 0) {
			return;
		}
		if (usedKeys.length > 0) {
			if (!usedKeys.includes("age") && usedKeys.includes("ageRange")) {
				this.setState(
					{
						form: {
							...this.state.form,
							age: "",
							ageRange: "",
						},
						errors: {
							age: "Age must be selected with age range",
							ageRange: "___________________________",
						},
					},
					() => this.triggerAction()
				);
				return;
			}
			if (usedKeys.includes("age") && !usedKeys.includes("ageRange")) {
				this.setState(
					{
						form: {
							...this.state.form,
							age: "",
							ageRange: "",
						},
						errors: {
							age: "___________________________",
							ageRange: "Age Range must be selected with age",
						},
					},
					() => this.triggerAction()
				);
				return;
			}
		}

		let filteredParameters = Object.filter(this.state.form, (key, value) => value !== undefined && value !== null && value !== "");
		// console.log("Searching with these:", filteredParameters);
		this.props.searchPatientProfile(filteredParameters);
	}

	clearForm() {
		this.setState({
			form: {
				...defaultProfileSearchFormValues,
			},
		});
	}

	render() {
		const trigger = (
			<Row>
				<Col className="col-1 offset-8">
					<Button variant="contained" color="secondary" onClick={() => this.clearForm()}>
						Clear
					</Button>
				</Col>
				<Col className="col-3 ">
					<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
						Search
					</Button>
				</Col>
			</Row>
		);

		return (
			<Container>
				<Row>Search By Patient Profile</Row>
				{/* Name & Father's name */}
				<Row>
					{/* Name */}
					<Col className="col-6">
						<FormControl variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.name}
								value={this.state.form.name}
								onChange={(event) => this.setFormValue("name", event.target.value)}
								variant="standard"
							/>
						</FormControl>
					</Col>
					{/* Father's Name */}
					<Col className="col-6">
						<FormControl variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.fathername}
								value={this.state.form.fathername}
								onChange={(event) => this.setFormValue("fathername", event.target.value)}
								variant="standard"
							/>
						</FormControl>
					</Col>
				</Row>
				{/* Age, Age Range, Gender, Contact Number */}
				<Row>
					{/* Gender */}
					<Col className="col-3">
						<FormControl variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("sex", value)}
								options={this.labels.sexOptions}
								renderInput={(params) => <TextField {...params} label={this.labels.sex} variant="standard" />}
							/>
						</FormControl>
					</Col>
					{/* Phone */}
					<Col className="col-3">
						<TextField
							// className={"fullWidth"}
							label={this.labels.phone}
							value={this.state.form.phone}
							onChange={(event) => this.setFormValue("phone", event.target.value)}
							variant="standard"
						/>
					</Col>
					{/* Age */}
					<Col className="col-3">
						<FormControl error={this.state.errors.age !== false} variant="standard" fullWidth>
							<TextField
								margin="none"
								type="number"
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
								type="number"
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
								onChange={(event, value) => this.setFormValue("city", value)}
								options={this.labels.cityOptions}
								renderInput={(params) => <TextField {...params} label={this.labels.city} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.city}</FormHelperText>
						</FormControl>
					</Col>
				</Row>

				{trigger}
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfileSearchForm);

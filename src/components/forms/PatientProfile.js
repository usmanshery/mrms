import React, { Component } from "react";
import { connect } from "react-redux";
import { registerPatientBackup } from "../../store/actions/Patient";
import { onVerifyPatientInfo, cities, objFilter } from "../../store/session";

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
		registerPatientBackup: (backup) => dispatch(registerPatientBackup(backup)),
	};
};

/*
	this form will create basic user profile and submit the json object of basic user profile
	this class will have dispatch method to add new patient
	this class will have dispatch method to verify user information against existing users

*/

class PatientForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				// Row
				name: this.props.loadData.name ? this.props.loadData.name : "",
				fathername: this.props.loadData.fathername ? this.props.loadData.fathername : "",
				// Row
				sex: this.props.loadData.sex ? this.props.loadData.sex : "",
				age: this.props.loadData.age ? this.props.loadData.age : "",
				phone: this.props.loadData.phone ? this.props.loadData.phone : "",
				// Row
				rank: this.props.loadData.rank ? this.props.loadData.rank : "",
				armynumber: this.props.loadData.armynumber ? this.props.loadData.armynumber : "",
				unit: this.props.loadData.unit ? this.props.loadData.unit : "",
				// Row
				address: this.props.loadData.address ? this.props.loadData.address : "",
				city: this.props.loadData.city ? this.props.loadData.city : "",
			},
			// errors to show against validation
			errors: {
				name: false,
				fathername: false,
				contact: false,
				sex: false,
				age: false,
				phone: false,
				address: false,
				city: false,
			},
		};

		// labels for inputs
		this.labels = {
			name: "Patient's Name",
			fathername: "Father's Name",
			sex: "Gender",
			age: "Age",
			phone: "Contact Number",
			address: "Address",
			city: "Select City",
			cityOptions: cities,
		};

		// validation functions
		this.validation = {
			isNull: (value) => value === undefined || value === null || value.length === 0,
			isUnderSize: (minLength) => (value = "") => value.length < minLength,
			isOverSize: (maxLength) => (value = "") => value.length > maxLength,
			isNotNumber: (value) => isNaN(value),
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

		if (ref === "name") {
			if (this.validation.isNull(value)) error = "Patient Name is Required";
			if (this.validation.isOverSize(100)(value)) error = "Name Should Be Under 100 Characters";
		}
		if (ref === "fathername") {
			if (this.validation.isNull(value)) error = "This Field is Required";
			if (this.validation.isOverSize(100)(value)) error = "Name Should Be Under 100 Characters";
		}
		if (ref === "phone") {
			if (this.validation.isNull(value)) error = "Patient's Contact Number is Required";
			if (this.validation.isUnderSize(11)(value) || this.validation.isOverSize(11)(value)) error = "Contact Number Format: 11 Digit | Example: 03219988777";
			if (this.validation.isNotNumber(value)) return;
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

		// console.log("reference:", ref);
		// console.log("value:", value);
		// console.log("Error:", error);

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
			console.log("Not so fast bitch");
			return;
		}
		// if missing any required values
		let requiredFields = ["name", "fathername", "contact", "sex", "age", "phone", "address", "city"];
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

		this.props.triggerCallback(this.state.form);
	}

	// if page is being unloaded, save the state
	componentWillUnmount() {
		this.props.registerPatientBackup(this.state.form);
	}

	render() {
		const triggerElement = this.trigger ? (
			<Row>
				<Col className="col-3 offset-9">{this.trigger}</Col>
			</Row>
		) : undefined;

		return (
			<Container className="xgreenBackground">
				{/* Name, Father's Name, Gender, Age */}
				<Row>
					<Col className="col-4">
						<TextField
							className={"fullWidth"}
							label={this.labels.name}
							value={this.state.form.name}
							onChange={(event) => this.setFormValue("name", event.target.value)}
							error={this.state.errors.name !== false}
							helperText={this.state.errors.name}
							required
							variant="standard"
						/>
					</Col>
					<Col className="col-4">
						<TextField
							className={"fullWidth"}
							label={this.labels.fathername}
							value={this.state.form.fathername}
							onChange={(event) => this.setFormValue("fathername", event.target.value)}
							error={this.state.errors.fathername !== false}
							helperText={this.state.errors.fathername}
							required
							variant="standard"
						/>
					</Col>
					<Col className="col-2">
						<FormControl error={this.state.errors.sex !== false} variant="standard" className="fullWidth">
							<InputLabel>{this.labels.sex}</InputLabel>
							<Select className="fullWidth" value={this.state.form.sex} onChange={(event) => this.setFormValue("sex", event.target.value)} required>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={"Male"}>Male</MenuItem>
								<MenuItem value={"Female"}>Female</MenuItem>
							</Select>
							<FormHelperText>{this.state.errors.sex}</FormHelperText>
						</FormControl>
					</Col>
					<Col className="col-2">
						<TextField
							className={"fullWidth"}
							label={this.labels.age}
							value={this.state.form.age}
							onChange={(event) => this.setFormValue("age", event.target.value)}
							error={this.state.errors.age !== false}
							helperText={this.state.errors.age}
							required
							variant="standard"
							type="number"
						/>
					</Col>
				</Row>
				{/* Address */}
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
				{/* City, Contact Number so far and a lot of space */}
				<Row>
					<Col className="col-4">
						<FormControl error={this.state.errors.city !== false} variant="standard" fullWidth>
							<Autocomplete
								freeSolo
								inputValue={this.state.form.city}
								onChange={(event, value) => this.setFormValue("city", value)}
								options={this.labels.cityOptions}
								renderInput={(params) => <TextField required error={this.state.errors.city ? true : false} {...params} label={this.labels.city} variant="standard" />}
							/>
							<FormHelperText>{this.state.errors.city}</FormHelperText>
						</FormControl>
					</Col>
					<Col className="col-3">
						<TextField
							className={"fullWidth"}
							label={this.labels.phone}
							value={this.state.form.phone}
							onChange={(event) => this.setFormValue("phone", event.target.value)}
							error={this.state.errors.phone !== false}
							helperText={this.state.errors.phone}
							required
							variant="standard"
						/>
					</Col>
				</Row>
				{triggerElement}
			</Container>
			/*
				Fields:
					name
					father name
					contact
					age
					sex
					address (by parts, address, city (concatinated with province))
				
				Setup other needed fields:
					
			*/
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);

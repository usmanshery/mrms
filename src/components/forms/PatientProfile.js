import React, { Component } from "react";
import { connect } from "react-redux";
import { patientRegistrationDataBackupAction, patientModuleActions } from "../../store/actions/Patient";
import { cities, objFilter, validation } from "../../store/misc/global";
import { onVerifyPatientInfo } from "../../store/session";

import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Toolbar } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {
		activePatientId: state.patientModule.activePatientId,
		activePatientData: state.patientModule.activePatientData ? state.patientModule.activePatientData : {},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verifyPatientInfo: (contactNo) => dispatch(onVerifyPatientInfo({ contactNo })),
		backupRegData: (backup) => dispatch(patientRegistrationDataBackupAction(backup)),
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

		this.clearForm = this.clearForm.bind(this);

		this.state = {
			form: {
				// Row
				name: this.props.activePatientData.name ? this.props.activePatientData.name : "",
				fathername: this.props.activePatientData.fathername ? this.props.activePatientData.fathername : "",
				sex: this.props.activePatientData.sex ? this.props.activePatientData.sex : "",
				age: this.props.activePatientData.age ? this.props.activePatientData.age : "",
				// Row
				address: this.props.activePatientData.address ? this.props.activePatientData.address : "",
				// Row
				phone: this.props.activePatientData.phone ? this.props.activePatientData.phone : "",
				city: this.props.activePatientData.city ? this.props.activePatientData.city : "",
				// Row
				rank: this.props.activePatientData.rank ? this.props.activePatientData.rank : "",
				armynumber: this.props.activePatientData.armynumber ? this.props.activePatientData.armynumber : "",
				unit: this.props.activePatientData.unit ? this.props.activePatientData.unit : "",
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
				rank: false,
				armynumber: false,
				unit: false,
			},
			readOnly: this.props.readOnly ? this.props.readOnly : false,
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
			rank: "Rank",
			rankOptions: ["Lt", "Capt", "Maj", "Lt Col", "Col", "Brig", "Maj Gen", "Lt Gen", "Gen"],
			armynumber: "Army Number",
			unit: "Unit",
		};
	}

	setFormValue(ref, value) {
		if (this.state.readOnly) {
			return; // haha
		}
		// validate for error
		let error = false;
		// some things that are not compatible
		if (value === null) value = "";

		if (ref === "name") {
			if (validation.isNull(value)) error = "Patient Name is Required";
			if (validation.isOverSize(100)(value)) error = "Name Should Be Under 100 Characters";
		}
		if (ref === "fathername") {
			if (validation.isNull(value)) error = "This Field is Required";
			if (validation.isOverSize(100)(value)) error = "Name Should Be Under 100 Characters";
		}
		if (ref === "phone") {
			if (validation.isNull(value)) error = "Patient's Contact Number is Required";
			if (validation.isUnderSize(11)(value) || validation.isOverSize(11)(value)) error = "Contact Number Format: 11 Digit | Example: 03219988777";
			if (validation.isNotNumber(value)) return;
		}
		if (ref === "sex") {
			if (validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "age") {
			if (validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "address") {
			if (validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "city") {
			if (validation.isNull(value)) error = "This Field is Required";
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

		// this.props.triggerCallback(this.state.form);
		// clean data and any final validation/ checks
		// const profile = {
		// 	...data,
		// };
		// this.props.registerPatientProfile(profile);
	}

	clearForm() {
		this.setState({
			form: {
				name: "",
				fathername: "",
				sex: "",
				age: "",
				phone: "",
				rank: "",
				armynumber: "",
				unit: "",
				address: "",
				city: "",
			},
		});
	}

	render() {
		let triggerElement = undefined;
		if (this.props.action === patientModuleActions.regNew || this.props.action === patientModuleActions.updateExisting) {
			const triggerTitle = this.props.action === patientModuleActions.regNew ? "Register New Patient" : "Update Personal Details";
			triggerElement = (
				<Row>
					<Col className="col-2 offset-7">
						<Button variant="contained" color="secondary" onClick={() => this.clearForm()}>
							Clear Data
						</Button>
					</Col>
					<Col className="col-3 ">
						<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
							{triggerTitle}
						</Button>
					</Col>
				</Row>
			);
		}

		let titleRow = undefined;
		if (this.props.title) {
			titleRow = (
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							{this.props.title}
						</Typography>
					</Toolbar>
				</Row>
			);
		}

		return (
			<Container className="xgreenBackground">
				{titleRow}
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
				{/* Rank, Armynumber, Unit */}
				<Row>
					{/* Rank */}
					<Col className="col-3">
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
					<Col className="col-3">
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

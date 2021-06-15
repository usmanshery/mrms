import React, { Component } from "react";
import { connect } from "react-redux";

import { registerPatientAction, updatePatientAction, patientModuleActions } from "../../store/actions/Patient";
import { objFilter, validation, accordianWrapper } from "../../store/misc/global";

import { defaultProfileFormValues, defaultProfileFormErrors, defaultProfileFormLabelValues } from "../../store/misc/formValues";
import { navModules, patientPages } from "../../store/actions/Navigation";

import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Toolbar } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import ProfileImage from "@daym3l/react-profile-image";
import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state, props) => {
	let readOnly = props.readOnly === undefined ? false : props.readOnly;
	// generate props from state based on current module/page
	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			activePage: state.patientModule.activePage,
			activePatientId: state.patientModule.activePatientId,
			activePatientData: state.patientModule.activePatientData,
		};
	}

	if (state.activeModule === navModules.admin) {
		return {
			readOnly,
			activePage: patientPages.update,
			activePatientId: state.adminModule.activePatientId,
			activePatientData: state.adminModule.activeCase.personalDetails,
		};
	}

	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerPatientProfile: (profile) => dispatch(registerPatientAction(profile)),
		updatePatientProfile: (patientId, profile) => dispatch(updatePatientAction(patientId, profile)),
	};
};

/*
	this form will create basic user profile and submit the json object of basic user profile
	this class will have dispatch method to add new patient
	this class will have dispatch method to verify user information against existing users

*/

class PatientForm extends Component {
	/*
		Props for behavior:
		- readOnly | bool (false) | to make this component readonly
		- action | string value from patientModuleActions (nil) | update or new
	*/

	constructor(props) {
		super(props);

		this.clearForm = this.clearForm.bind(this);
		this.triggerAction = this.triggerAction.bind(this);
		this.setFormValue = this.setFormValue.bind(this);

		// labels for inputs
		this.labels = { ...defaultProfileFormLabelValues };

		// if active case exists, fetch its data
		let activePatientData;
		if (!this.props.activePatientData || this.props.activePage === patientPages.add) {
			activePatientData = { ...defaultProfileFormValues };
		} else {
			activePatientData = {
				...this.props.activePatientData,
			};
		}
		this.state = {
			form: activePatientData,
			// errors to show against validation
			errors: { ...defaultProfileFormErrors },
		};
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) {
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
		// if(ref === "category"){
		// 	if(value === "Dependent"){

		// 	}
		// }
		if (ref === "picture") {
			// value = Buffer.from(value.split(",")[1], "base64")
			// console.log(value.split(",")[0].split(";")[0].substr(11))
			// value = value.split(",")[1];
		}

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
			return;
		}
		// if missing any required values
		let requiredFields = ["name", "fathername", "contact", "sex", "age", "phone", "address", "city", "category"];
		if (this.state.form.category === "Dependent") requiredFields.push("dependent");
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

		// clean data and any final validation/ checks
		const profile = {
			...this.state.form,
			picture: this.state.form.picture,
		};
		if (profile.hasOwnProperty("cases")) {
			delete profile["cases"];
		}

		if (this.props.action === patientModuleActions.regNew) {
			this.props.registerPatientProfile(profile);
		}
		if (this.props.action === patientModuleActions.updateExisting) {
			this.props.updatePatientProfile(this.props.activePatientId, profile);
		}
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
			triggerElement = (
				<Row>
					<Col className="col-2 offset-3">
						<Button variant="contained" color="secondary" onClick={() => this.clearForm()}>
							Clear Data
						</Button>
					</Col>
					<Col className="col-3 ">
						<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
							{this.props.action === patientModuleActions.regNew ? "Register New Patient" : "Update Personal Details"}
						</Button>
					</Col>
				</Row>
			);
		}

		let content = (
			<Container>
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							{"Personal Details"}
						</Typography>
					</Toolbar>
				</Row>
				<Row>
					<Col className="col-10">
						<Container>
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
							{/* City, Contact Number, Category */}
							<Row>
								<Col className="col-4">
									<FormControl error={this.state.errors.city !== false} variant="standard" fullWidth>
										<Autocomplete
											freeSolo
											onChange={(event, value) => this.setFormValue("city", value)}
											options={this.labels.cityOptions}
											value={this.state.form.city}
											renderInput={(params) => <TextField required error={this.state.errors.city ? true : false} {...params} label={this.labels.city} variant="standard" />}
										/>
										<FormHelperText>{this.state.errors.city}</FormHelperText>
									</FormControl>
								</Col>
								<Col className="col-4">
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
								<Col className="col-4">
									<FormControl error={this.state.errors.category !== false} variant="standard" fullWidth>
										<Autocomplete
											options={this.labels.categoryOptions}
											value={this.state.form.category}
											renderInput={(params) => <TextField {...params} label={this.labels.category} variant="standard" />}
											required
											onChange={(event, value) => this.setFormValue("category", value)}
										/>
										<FormHelperText>{this.state.errors.category}</FormHelperText>
									</FormControl>
								</Col>
							</Row>
							{/* Optional field: Dependents */}
							{this.state.form.category === "Dependent" ? (
								<Row>
									<Col>
										<TextField
											className={"fullWidth"}
											label={this.labels.dependent}
											value={this.state.form.dependent}
											onChange={(event) => this.setFormValue("dependent", event.target.value)}
											error={this.state.errors.dependent !== false}
											helperText={this.state.errors.dependent}
											required
											variant="standard"
										/>
									</Col>
								</Row>
							) : undefined}
							{/* Rank, Armynumber, Unit */}
							<Row>
								{/* Rank */}
								<Col className="col-3">
									<FormControl error={this.state.errors.rank !== false} variant="standard" fullWidth>
										<Autocomplete
											options={this.labels.rankOptions}
											value={this.state.form.rank}
											renderInput={(params) => <TextField {...params} label={this.labels.rank} variant="standard" />}
											onChange={(event, value) => this.setFormValue("rank", value)}
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
						</Container>
					</Col>
					<Col className="col-2">
						{this.props.readOnly ? (
							<img src={this.state.form.pictureUrl} alt={"imageNotFound.png"} style={{ width: "150px", height: "180px" }} />
						) : (
							<ProfileImage
								camera
								defaultImage={this.state.form.pictureUrl}
								returnImage={(base64Image, fileImage) => this.setFormValue("picture", base64Image)}
								uploadBtnProps={{ variant: "contained", label: "Upload" }}
								cameraBtnProps={{ variant: "contained", label: "Camera", style: { marginBottom: "8px" } }}
							/>
						)}
					</Col>
				</Row>
				{triggerElement}
			</Container>
		);

		return accordianWrapper("Personal Details", content);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);

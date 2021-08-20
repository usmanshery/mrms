import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUserAction, updateUserAction, userModuleActions } from "../../store/actions/User";
import { objFilter, validation, verticalSpacer } from "../../store/misc/global";

import { defaultUserFormValues, defaultUserFormErrors, defaultUserFormLabelValues } from "../../store/misc/formValues";

import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Toolbar } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {
		activeUserId: state.userModule.activeUserId,
		activeUserData: state.userModule.activeUserData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerUserProfile: (profile) => dispatch(registerUserAction(profile)),
		updateUserProfile: (userId, profile) => dispatch(updateUserAction(userId, profile)),
	};
};

/*
	this form will create basic user profile and submit the json object of basic user profile
	this class will have dispatch method to add new patient
	this class will have dispatch method to verify user information against existing users

*/

class UserForm extends Component {
	constructor(props) {
		super(props);

		this.clearForm = this.clearForm.bind(this);
		this.triggerAction = this.triggerAction.bind(this);
		this.setFormValue = this.setFormValue.bind(this);

		// labels for inputs
		this.labels = { ...defaultUserFormLabelValues };

		// if active case exists, fetch its data
		let activeUserData;
		if (!this.props.activeUserData) {
			activeUserData = { ...defaultUserFormValues };
		} else {
			activeUserData = { ...this.props.activeUserData };
		}
		this.state = {
			form: activeUserData,
			// errors to show against validation
			errors: { ...defaultUserFormErrors },
			readOnly: this.props.readOnly ? this.props.readOnly : false,
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

		if (ref === "username") {
			if (validation.hasSpaces(value)) error = "Username Must Not Contain Spaces";
			if (validation.isUnderSize(3)(value) || validation.isOverSize(50)(value)) error = "Username Should Be 3 To 50 Characters Long";
			if (validation.isNull(value)) error = "Username is Required";
		}
		if (ref === "password") {
			if (validation.isUnderSize(8)(value)) error = "Password Must Contain Atleast 8 Characters";
			if (validation.isNull(value)) error = "Password is Required";
		}
		if (ref === "name") {
			if (validation.isNull(value)) error = "Name is Required";
			if (validation.isOverSize(100)(value)) error = "Name Should Be Under 100 Characters";
		}
		if (ref === "userLevel") {
			if (validation.isNull(value)) error = "User Level is Required";
		}
		if (ref === "sex") {
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
			return;
		}
		// if missing any required values
		let requiredFields = ["name", "username", "password", "sex", "userLevel"];
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
		};
		if (this.props.action === userModuleActions.regNew) {
			console.log(profile);
			this.props.registerUserProfile(profile);
		} else {
			this.props.updateUserProfile(this.props.activeUserId, profile);
		}
	}

	clearForm() {
		this.setState({
			form: {
				...defaultUserFormValues
			},
		});
	}

	render() {
		let triggerElement = undefined;
		if (this.props.action === userModuleActions.regNew || this.props.action === userModuleActions.updateExisting) {
			const triggerTitle = this.props.action === userModuleActions.regNew ? "Register New User" : "Update User Details";
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
			<Container>
				{titleRow}
				{/* Name, Gender, Username, Password */}
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
					<Col className="col-3">
						<TextField
							className={"fullWidth"}
							label={this.labels.username}
							value={this.state.form.username}
							onChange={(event) => this.setFormValue("username", event.target.value)}
							error={this.state.errors.username !== false}
							helperText={this.state.errors.username}
							required
							variant="standard"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							className={"fullWidth"}
							label={this.labels.password}
							value={this.state.form.password}
							onChange={(event) => this.setFormValue("password", event.target.value)}
							error={this.state.errors.password !== false}
							helperText={this.state.errors.password}
							required
							variant="standard"
							type="password"
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
				</Row>
				{/* User Level, User Roles */}
				<Row>
					<Col className="col-4">
						<FormControl error={this.state.errors.userLevel !== false} variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("userLevel", value)}
								options={this.labels.userLevelOptions}
								value={this.state.form.userLevel}
								renderInput={(params) => (
									<TextField required error={this.state.errors.userLevel ? true : false} {...params} label={this.labels.userLevel} variant="standard" />
								)}
							/>
							<FormHelperText>{this.state.errors.userLevel}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{verticalSpacer(10)}
				{triggerElement}
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

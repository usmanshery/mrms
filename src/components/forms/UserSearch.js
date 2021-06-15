import React, { Component } from "react";
import { connect } from "react-redux";

import { objFilter, verticalSpacer } from "../../store/misc/global";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import { Autocomplete } from "@material-ui/lab";
import { TextField, FormControl, Button } from "@material-ui/core";

import { Container, Row, Col } from "react-bootstrap";

import { searchUserAction } from "../../store/actions/User";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchUser: (profile) => dispatch(searchUserAction(profile)),
	};
};

class UserSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				name: "",
				username: "",
				sex: "",
				userLevel: "",
				userRole: "",
			},
		};

		// labels for inputs
		this.labels = {
			name: "Name",
			username: "Username",
			sex: "Gender",
			sexOptions: ["Male", "Female"],

			userLevel: "User Level",
			userLevelOptions: ["Admin", "Sub-Admin", "Worker"],

			userRole: "User Role",
			userRoleOptions: ["All"],
		};
	}

	setFormValue(ref, value) {
		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
		});
	}

	// check for unique values and if correct, register the profile
	triggerAction() {
		Object.filter = objFilter;

		let usedKeys = Object.keys(Object.filter(this.state.form, (key, value) => value !== undefined && value !== null && value !== ""));
		if (usedKeys.length === 0) {
			return;
		}

		let filteredParameters = Object.filter(this.state.form, (key, value) => value !== undefined && value !== null && value !== "");
		this.props.searchUser(filteredParameters);
	}

	clearForm() {
		this.setState({
			form: {
				name: "",
				username: "",
				sex: "",
				userLevel: "",
				userRole: "",
			},
		});
	}

	render() {
		const triggerElement = (
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
			<div className="rootDiv">
				<Accordion expanded={true}>
					<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
						<Typography>Search Patients</Typography>
					</AccordionSummary>
					<AccordionDetails className="formTopline">
						<Container fluid>
							{/* Name, Username, Sex */}
							<Row>
								{/* Name */}
								<Col className="col-4">
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
								{/* User Name */}
								<Col className="col-4">
									<FormControl variant="standard" fullWidth>
										<TextField
											margin="none"
											label={this.labels.username}
											value={this.state.form.username}
											onChange={(event) => this.setFormValue("username", event.target.value)}
											variant="standard"
										/>
									</FormControl>
								</Col>
								{/* Sex */}
								<Col className="col-4">
									<FormControl variant="standard" fullWidth>
										<Autocomplete
											onChange={(event, value) => this.setFormValue("sex", value)}
											options={this.labels.sexOptions}
											renderInput={(params) => <TextField {...params} label={this.labels.sex} variant="standard" />}
										/>
									</FormControl>
								</Col>
							</Row>
							{/* User Level, User Role */}
							<Row>
								{/* User Level */}
								<Col className="col-4">
									<FormControl variant="standard" fullWidth>
										<Autocomplete
											onChange={(event, value) => this.setFormValue("userLevel", value)}
											options={this.labels.userLevelOptions}
											renderInput={(params) => <TextField {...params} label={this.labels.userLevel} variant="standard" />}
										/>
									</FormControl>
								</Col>
								{/*  User Role */}
								<Col className="col-4">
									<FormControl variant="standard" fullWidth>
										<Autocomplete
											onChange={(event, value) => this.setFormValue("userRole", value)}
											options={this.labels.userRoleOptions}
											renderInput={(params) => <TextField {...params} label={this.labels.userRole} variant="standard" />}
										/>
									</FormControl>
								</Col>
							</Row>
							{verticalSpacer(10)}
							{triggerElement}
						</Container>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchForm);

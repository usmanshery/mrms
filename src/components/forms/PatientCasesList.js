import React, { Component } from "react";
import { connect } from "react-redux";
import { newCaseAction } from "../../store/actions/Patient";
import { accordianWrapper } from "../../store/misc/global";

import { Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Toolbar, Typography } from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";

import PatientCasesTable from "../tables/PatientCasesTable";

import "./FormStyles.css";

const mapStateToProps = (state, props) => {
	let readOnly = props.readOnly === undefined ? false : props.readOnly;
	return {
		// behavioral props
		readOnly,
		// other values from state
		activePatientId: state.patientModule.activePatientId,
		activePatientCaseId: state.patientModule.activePatientCaseId,
		activePatientData: state.patientModule.activePatientData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewCase: (category) => dispatch(newCaseAction(category)),
	};
};

class PatientCasesList extends Component {
	/*
		Props for behavior:
		- readOnly | bool (false) | if new case option is to be hidden
	*/

	constructor(props) {
		super(props);

		this.createNewCase = this.createNewCase.bind(this);
		this.setFormValue = this.setFormValue.bind(this);

		this.state = {
			form: {
				category: "",
			},
			errors: {
				category: false,
			},
		};
		this.labels = {
			category: "Select Category",
		};
	}

	createNewCase() {
		if (!this.state.form.category || this.state.category === null || this.state.category === "") {
			this.setState({
				errors: {
					category: "Required",
				},
			});
			return;
		}

		// now we are ready to add new case
		this.props.createNewCase(this.state.form.category);
	}

	setFormValue(ref, value) {
		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
			errors: {
				category: false,
			},
		});
	}

	render() {
		let newCaseForm = undefined;
		if (!this.props.readOnly) {
			newCaseForm = (
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							Register New Case
						</Typography>
					</Toolbar>
					<Col className="offset-6 col-2">
						<FormControl error={this.state.errors.category !== false} variant="standard" className="fullWidth">
							<InputLabel>{this.labels.category}</InputLabel>
							<Select className="fullWidth" value={this.state.form.category} onChange={(event) => this.setFormValue("category", event.target.value)} required>
								<MenuItem value=""></MenuItem>
								<MenuItem value={"prosthetic"}>Prosthetic</MenuItem>
								<MenuItem value={"orthotic"}>Orthotic</MenuItem>
								<MenuItem value={"mechanical"}>Mechanical</MenuItem>
							</Select>
							<FormHelperText>{this.state.errors.category}</FormHelperText>
						</FormControl>
					</Col>
					<Col className="col-1">
						<Button variant="contained" color="secondary" onClick={() => this.createNewCase()}>
							Register
						</Button>
					</Col>
				</Row>
			);
		}
		let content = (
			<Container>
				{/* First row, show title, add new etc */}
				{newCaseForm}
				{/* Second row, show existing cases table */}
				<Row>
					<PatientCasesTable readOnly={this.readOnly} />
				</Row>
			</Container>
		);

		return accordianWrapper("Patient Cases", content);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCasesList);

import React, { Component } from "react";
import { connect } from "react-redux";

import { objFilter } from "../../store/misc/global";
import { defaultCaseSearchFormValues, defaultCaseSearchFormLabelValues, defaultCaseSearchFormErrors } from "../../store/misc/formValues";

import { Autocomplete } from "@material-ui/lab";
import { Container, Row, Col } from "react-bootstrap";
import { TextField, FormControl, FormHelperText, Button } from "@material-ui/core";

import { searchPatientCaseAction } from "../../store/actions/Patient";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchPatientCase: (searchParams) => dispatch(searchPatientCaseAction(searchParams)),
	};
};

class PatientCaseSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				...defaultCaseSearchFormValues,
			},
			errors: {
				...defaultCaseSearchFormErrors,
			},
		};

		// labels for inputs
		this.labels = {
			...defaultCaseSearchFormLabelValues,
		};
	}

	setFormValue(ref, value) {
		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
			errors: {
				...this.state.errors,
				[ref]: false,
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
		let formValues = this.state.form;
		if (usedKeys.length > 0) {
			if (!usedKeys.includes("startDate") && usedKeys.includes("endDate")) {
				formValues.startDate = undefined;
				formValues.endDate = undefined;
				this.setState({
					errors: {
						startDate: "Start Date must be selected with End Date",
						endDate: "___________________________",
					},
				});
			}
			if (usedKeys.includes("startDate") && !usedKeys.includes("endDate")) {
				this.setState({
					errors: {
						endDate: "___________________________",
						startDate: "End Date must be selected with Start Date",
					},
				});
				formValues.startDate = undefined;
				formValues.endDate = undefined;
			}
		}

		let filteredParameters = Object.filter(formValues, (key, value) => value !== undefined && value !== null && value !== "");

		if (Object.keys(filteredParameters).length === 0) return;

		if (filteredParameters.caseType !== undefined) {
			filteredParameters.caseType = filteredParameters.caseType.toLowerCase();
		}

		let correctedValues = {
			id: filteredParameters.caseId,
			type: filteredParameters.caseType,
			date:
				filteredParameters.startDate === undefined || filteredParameters.endDate === undefined
					? undefined
					: [filteredParameters.startDate, filteredParameters.endDate],
		};

		// console.log("Searching case with these:", correctedValues);
		this.props.searchPatientCase(correctedValues);
	}

	clearForm() {
		this.setState({
			form: {
				...defaultCaseSearchFormValues,
			},
		});
	}

	render() {
		const trigger = (
			<Row>
				{/* Admin Approval Cases (shows both pending and approved/rejected cases) */}
				<Col className="col-6">
					<Button variant="contained"  onClick={() => this.props.searchPatientCase({ approval: true })}>
						Approval Cases
					</Button>
				</Col>
				<Col className="col-3">
					<Button variant="contained" color="secondary" onClick={() => this.clearForm()}>
						Clear
					</Button>
				</Col>
				<Col className="col-3">
					<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
						Search
					</Button>
				</Col>
			</Row>
		);

		return (
			<Container>
				<Row>Search By Cases</Row>
				{/* work on this: implement fields, call the server with keys and parse return data as cases in the search case table next door -> */}

				{/* Case ID */}
				<Row>
					{/* Case ID */}
					<Col className="col">
						<FormControl variant="standard" fullWidth>
							<TextField
								margin="none"
								label={this.labels.caseId}
								value={this.state.form.caseId}
								onChange={(event) => this.setFormValue("caseId", event.target.value)}
								variant="standard"
							/>
						</FormControl>
					</Col>
				</Row>
				{/* Case Type */}
				<Row>
					{/* Case Type */}
					<Col className="col">
						<FormControl variant="standard" fullWidth>
							<Autocomplete
								onChange={(event, value) => this.setFormValue("caseType", value)}
								options={this.labels.caseTypeOptions}
								value={this.state.form.caseType}
								renderInput={(params) => <TextField {...params} label={this.labels.caseType} variant="standard" />}
							/>
						</FormControl>
					</Col>
				</Row>
				{/* Duration Limit */}
				<Row>
					{/* Start Date */}
					<Col className="col-6">
						<FormControl error={this.state.errors.startDate !== false} variant="standard" fullWidth>
							<TextField
								label={this.labels.startDate}
								type="date"
								value={this.state.form.startDate}
								onChange={(event) => this.setFormValue("startDate", event.target.value)}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<FormHelperText>{this.state.errors.startDate}</FormHelperText>
						</FormControl>
					</Col>
					{/* End Date */}
					<Col className="col-6">
						<FormControl error={this.state.errors.endDate !== false} variant="standard" fullWidth>
							<TextField
								label={this.labels.endDate}
								type="date"
								value={this.state.form.endDate}
								onChange={(event) => this.setFormValue("endDate", event.target.value)}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<FormHelperText>{this.state.errors.endDate}</FormHelperText>
						</FormControl>
					</Col>
				</Row>

				{trigger}
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientCaseSearchForm);

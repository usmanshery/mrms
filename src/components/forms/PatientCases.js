import React, { Component } from "react";
import { connect } from "react-redux";
import { newCaseAction } from "../../store/actions/Patient";
import { accordianWrapper } from "../../store/misc/global";

import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	Button,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";

import OrthoticForm from "../forms/OrthoticProfile";
import ProstheticForm from "../forms/ProstheticProfile";
import PatientCasesTable from "../tables/PatientCasesTable";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {
		activePatientId: state.patientModule.activePatientId,
		activePatientCaseId: state.patientModule.activePatientCaseId,
		activePatientData: state.patientModule.activePatientData,
		activePatientNewCase: state.patientModule.activePatientNewCase,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewCase: (category) => dispatch(newCaseAction(category)),
	};
};

/*
	show all cases
	allow user to select a case and load its details
	or create new case
*/

class PatientCasesForm extends Component {
	constructor(props) {
		super(props);

		// this.clearForm = this.clearForm.bind(this);

		this.state = {
			form: {
				category: "",
			},
			errors: {
				category: false,
			},
			isNew: false,
		};
		this.labels = {
			category: "Select Category",
		};

		this.createNewCase = this.createNewCase.bind(this);
		this.setFormValue = this.setFormValue.bind(this);
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
		// validate for error
		// let error = false;

		// some things that are not compatible
		if (value === null) value = "";

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
		let caseForm = undefined;
		if (this.props.activePatientNewCase) {
			if (this.props.activePatientNewCase === "prosthetic") {
				caseForm = (
					<>
						<Row>
							<Toolbar>
								<Typography variant="h5" id="tableTitle" component="div">
									{"Prosthetic Case (New)"}
								</Typography>
							</Toolbar>
						</Row>
						<Row>
							<ProstheticForm isNew patientCategory={this.props.activePatientData.category} />
						</Row>
					</>
				);
			}
			if (this.props.activePatientNewCase === "orthotic") {
				caseForm = (
					<>
						<Row>
							<Toolbar>
								<Typography variant="h5" id="tableTitle" component="div">
									{"Orthotic Case (New)"}
								</Typography>
							</Toolbar>
						</Row>
						<Row>
							<OrthoticForm isNew />
						</Row>
					</>
				);
			}
			if (this.props.activePatientNewCase === "mechanical") {
				caseForm = (
					<>
						<Row>
							<Toolbar>
								<Typography variant="h5" id="tableTitle" component="div">
									{"Mechanical Case (New)"}
								</Typography>
							</Toolbar>
						</Row>
						<Row>
							<h1>Mechanical one</h1>
						</Row>
					</>
				);
			}
		}

		if (this.props.activePatientCaseId) {
			// get active case category
			// console.log(this.props.activePatientCaseId);
			let activeCaseCategory = this.props.activePatientData.cases.filter(
				(_case) => _case[_case.category] && _case[_case.category]._id === this.props.activePatientCaseId
			)[0].category;
			if (activeCaseCategory === "prosthetic") {
				caseForm = (
					<>
						<Row>
							<Toolbar>
								<Typography variant="h5" id="tableTitle" component="div">
									{"Prosthetic Case [" + this.props.activePatientCaseId + "]"}
								</Typography>
							</Toolbar>
						</Row>
						<Row>
							<ProstheticForm />
						</Row>
					</>
				);
			}
			if (activeCaseCategory === "orthotic") {
				caseForm = (
					<>
						<Row>
							<Toolbar>
								<Typography variant="h5" id="tableTitle" component="div">
									{"Orthotic Case [" + this.props.activePatientCaseId + "]"}
								</Typography>
							</Toolbar>
						</Row>
						<Row>
							<OrthoticForm />
						</Row>
					</>
				);
			}
			if (activeCaseCategory === "mechanical") {
				caseForm = (
					<>
						<Row>
							<Toolbar>
								<Typography variant="h5" id="tableTitle" component="div">
									{"Mechanical Case [" + this.props.activePatientCaseId + "]"}
								</Typography>
							</Toolbar>
						</Row>
						<Row>
							<h1>Mechanical one</h1>
						</Row>
					</>
				);
			}
		}

		let content = (
			<Container>
				{/* First row, show title, add new etc */}
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							Cases
						</Typography>
					</Toolbar>
					<Col className="col-7"></Col>
					<Col className="col-2">
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
							New
						</Button>
					</Col>
				</Row>
				{/* Second row, show existing cases table */}
				<Row>
					<PatientCasesTable />
				</Row>
				<Row>
					<hr style={{ width: "100%" }} />
				</Row>
				{/* Show active or new case */}
				{caseForm}
			</Container>
		);

		return accordianWrapper("Patient Cases", content);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCasesForm);

import React, { Component } from "react";
import { connect } from "react-redux";
import { newCaseAction } from "../../store/actions/Patient";
// import { cities, objFilter } from "../../store/session";

import { Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, Toolbar, Typography } from "@material-ui/core";
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
		// const triggerElement =
		// 	this.trigger && !this.state.readOnly ? (
		// 		<Row>
		// 			<Col className="col-2 offset-7">
		// 				<Button variant="contained" color="secondary" onClick={() => this.clearForm()}>
		// 					Clear Data
		// 				</Button>
		// 			</Col>
		// 			<Col className="col-3 ">{this.trigger}</Col>
		// 		</Row>
		// 	) : undefined;

		let caseFormHeading = undefined;
		let caseForm = undefined;
		if (this.props.activePatientNewCase) {
			if (this.props.activePatientNewCase === "prosthetic") {
				caseForm = <ProstheticForm isNew />;
				caseFormHeading = "Prosthetic Case (New)";
			}
			if (this.props.activePatientNewCase === "orthotic") {
				caseForm = <OrthoticForm isNew />;
				caseFormHeading = "Orthotic Case (New)";
			}
			if (this.props.activePatientNewCase === "mechanical") {
				// caseForm = <OrthoticForm isNew/>;
				caseForm = <h1>Mechanical one</h1>;
				caseFormHeading = "Mechanical Case (New)";
			}
		}

		if (this.props.activePatientCaseId) {
			// get active case category
			let activeCaseCategory = this.props.activePatientData.cases.filter((_case) => _case[_case.category]._id === this.props.activePatientCaseId)[0]
				.category;
			if (activeCaseCategory === "prosthetic") {
				caseForm = <ProstheticForm />;
				caseFormHeading = "Prosthetic Case [" + this.props.activePatientCaseId + "]";
			}
			if (activeCaseCategory === "orthotic") {
				caseForm = <OrthoticForm />;
				caseFormHeading = "Orthotic Case [" + this.props.activePatientCaseId + "]";
			}
			if (activeCaseCategory === "mechanical") {
				// caseForm = <OrthoticForm isNew/>;
				caseForm = <h1>Mechanical one</h1>;
				caseFormHeading = "Mechanical Case [" + this.props.activePatientCaseId + "]";
			}
		}

		return (
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
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							{caseFormHeading}
						</Typography>
					</Toolbar>
				</Row>
				<Row>{caseForm}</Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientCasesForm);

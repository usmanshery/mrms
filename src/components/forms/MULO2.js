import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControlLabel, Checkbox, Typography, Toolbar } from "@material-ui/core";
import { ULO2FormBooleanFields, defaultULO2FormValues, defaultULO2LableValues } from "../../store/misc/formValues";
import { verticalSpacer } from "../../store/misc/global";
import { Container, Row, Col } from "react-bootstrap";

import { navModules } from "../../store/actions/Navigation";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;

	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			formValues: state.patientModule.activeCase[state.patientModule.activeCase.category].ULO2,
		};
	}

	if (state.activeModule === navModules.admin) {
		console.log(state.adminModule);
		return {
			readOnly,
			formValues: state.adminModule.activeCase.ULO2,
		};
	}
	if (state.activeModule === navModules.casting || state.activeModule === navModules.modification || state.activeModule === navModules.fitting) {
		return {
			readOnly,
			formValues: state.stationModule.activeCase.ULO2,
		};
	}
	return {
		activePatientCaseId: state.patientModule.activePatientCaseId,
		activePatientData: state.patientModule.activePatientData,
		activePatientEditable: state.patientModule.activePatientEditable,
		// if station
		openCases: state.stationModule.openCases,
		activeCaseId: state.stationModule.activeCaseId,
		activeCaseCategory: state.stationModule.activeCaseCategory,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

class ULO2Form extends Component {
	constructor(props) {
		super(props);

		let activeCaseData = { ...defaultULO2FormValues, ...this.props.formValues };

		// clean boolean values
		for (var key in activeCaseData) {
			if (activeCaseData.hasOwnProperty(key)) {
				if (ULO2FormBooleanFields.includes(key)) {
					activeCaseData[key] = activeCaseData[key] === "true";
				}
			}
		}

		// initialize the state
		this.state = {
			form: activeCaseData,
		};

		// labels for inputs
		this.labels = { ...defaultULO2LableValues };

		this.setFormValue = this.setFormValue.bind(this);
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) return;
		this.props.setFormValue("ULO2", { [ref]: value }, true);

		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
		});
	}

	render() {
		return (
			<Container style={{ background: "white" }} className="xgreenBackground">
				{/* Form heading */}
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							{"ULO-2 Measurement Form"}
						</Typography>
					</Toolbar>
				</Row>
				{/* Three sets of inputs */}
				<Row>
					{/* Section 1 */}
					<Col className="col-6">
						<Container style={{ background: "white", backgroundImage: "url('ULO2_1.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(150)}
							<Row>
								<Col className="col-3">
									<TextField
										value={this.state.form.s1r1f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(80)}
							<Row>
								<Col className="offset-2 col-3">
									<TextField
										value={this.state.form.s1r2f1}
										onChange={(event) => this.setFormValue("s1r2f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-4 col-3">
									<TextField
										value={this.state.form.s1r2f2}
										onChange={(event) => this.setFormValue("s1r2f2", event.target.value)}
										style={{ background: "white", marginTop: "20px" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(70)}
							<Row>
								<Col className="offset-2 col-3">
									<TextField
										value={this.state.form.s1r3f1}
										onChange={(event) => this.setFormValue("s1r3f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-4 col-3">
									<TextField
										value={this.state.form.s1r3f2}
										onChange={(event) => this.setFormValue("s1r3f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(100)}
						</Container>
					</Col>
					{/* Section 2 */}
					<Col className="col-6">
						<Container style={{ background: "white", backgroundImage: "url('ULO2_2.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(290)}
							<Row>
								<Col className="col-3">
									<TextField
										value={this.state.form.s2r1f1}
										onChange={(event) => this.setFormValue("s2r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-4 col-3">
									<TextField
										value={this.state.form.s2r1f2}
										onChange={(event) => this.setFormValue("s2r1f2", event.target.value)}
										style={{ background: "white", marginTop: "17px" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(70)}
							<Row>
								<Col className="col-3">
									<TextField
										value={this.state.form.s2r2f1}
										onChange={(event) => this.setFormValue("s2r2f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-4 col-3">
									<TextField
										value={this.state.form.s2r2f2}
										onChange={(event) => this.setFormValue("s2r2f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(100)}
						</Container>
					</Col>
				</Row>
				{/* Instructions field */}
				{verticalSpacer(20)}
				<Row>
					<Col>
						<TextField
							label={this.labels.instructions}
							value={this.state.form.instructions}
							onChange={(event) => this.setFormValue("instructions", event.target.value)}
							multiline
							rows={5}
							style={{ width: "100%" }}
							variant="outlined"
						/>
					</Col>
				</Row>
				{verticalSpacer(20)}
				{/* different dates */}
				<Row>
					<Col className="col-2">
						<TextField
							label={this.labels.admission}
							value={this.state.form.admission}
							onChange={(event) => this.setFormValue("admission", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							label={this.labels.casting}
							value={this.state.form.casting}
							onChange={(event) => this.setFormValue("casting", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							label={this.labels.fitting}
							value={this.state.form.fitting}
							onChange={(event) => this.setFormValue("fitting", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							label={this.labels.delivery}
							value={this.state.form.delivery}
							onChange={(event) => this.setFormValue("delivery", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							label={this.labels.replace}
							value={this.state.form.replace}
							onChange={(event) => this.setFormValue("replace", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							label={this.labels.followup}
							value={this.state.form.followup}
							onChange={(event) => this.setFormValue("followup", event.target.value)}
							variant="outlined"
						/>
					</Col>
				</Row>
				{verticalSpacer(20)}

				{/* Set 1 random */}
				<Row>
					<Col className="col-3 checkboxSection">
						<h5>Orthosis type</h5>
					</Col>
					<Col className="col-6 checkboxSection">
						<h5>Replacement cause</h5>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.co} onClick={(event) => this.setFormValue("co", event.target.checked)} />}
							label={this.labels.co}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.volumeChange} onClick={(event) => this.setFormValue("volumeChange", event.target.checked)} />}
							label={this.labels.volumeChange}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.accident} onClick={(event) => this.setFormValue("accident", event.target.alignmentProblem)} />}
							label={this.labels.accident}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.ctlso} onClick={(event) => this.setFormValue("ctlso", event.target.checked)} />}
							label={this.labels.ctlso}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.volumeChangeOther} onClick={(event) => this.setFormValue("volumeChangeOther", event.target.checked)} />}
							label={this.labels.volumeChangeOther}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.falseInfo} onClick={(event) => this.setFormValue("falseInfo", event.target.checked)} />}
							label={this.labels.falseInfo}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.tlso} onClick={(event) => this.setFormValue("tlso", event.target.checked)} />}
							label={this.labels.tlso}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={
								<Checkbox checked={this.state.form.componentsBreakdown} onClick={(event) => this.setFormValue("componentsBreakdown", event.target.checked)} />
							}
							label={this.labels.componentsBreakdown}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.wear} onClick={(event) => this.setFormValue("wear", event.target.checked)} />}
							label={this.labels.wear}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.lso} onClick={(event) => this.setFormValue("lso", event.target.checked)} />}
							label={this.labels.lso}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.alignmentProblem} onClick={(event) => this.setFormValue("alignmentProblem", event.target.checked)} />}
							label={this.labels.alignmentProblem}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.stolenLost} onClick={(event) => this.setFormValue("stolenLost", event.target.checked)} />}
							label={this.labels.stolenLost}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="offset-3 col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.growth} onClick={(event) => this.setFormValue("growth", event.target.checked)} />}
							label={this.labels.growth}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ULO2Form);

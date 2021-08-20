import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, Typography, Toolbar } from "@material-ui/core";
import { ULOFormBooleanFields, defaultULOFormValues, defaultULOLableValues } from "../../store/misc/formValues";
import { verticalSpacer } from "../../store/misc/global";
import { Container, Row, Col } from "react-bootstrap";

import { navModules } from "../../store/actions/Navigation";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;

	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			formValues: state.patientModule.activeCase[state.patientModule.activeCase.category].ULO,
		};
	}
	if (state.activeModule === navModules.admin) {
		console.log(state.adminModule);
		return {
			readOnly,
			formValues: state.adminModule.activeCase.ULO,
		};
	}
	if (state.activeModule === navModules.casting || state.activeModule === navModules.modification || state.activeModule === navModules.fitting) {
		return {
			readOnly,
			formValues: state.stationModule.activeCase.ULO,
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

class ULOForm extends Component {
	constructor(props) {
		super(props);

		let activeCaseData = { ...defaultULOFormValues, ...this.props.formValues };

		// clean boolean values
		for (var key in activeCaseData) {
			if (activeCaseData.hasOwnProperty(key)) {
				if (ULOFormBooleanFields.includes(key)) {
					activeCaseData[key] = activeCaseData[key] === "true";
				}
			}
		}

		// initialize the state
		this.state = {
			form: activeCaseData,
		};

		// labels for inputs
		this.labels = { ...defaultULOLableValues };

		this.setFormValue = this.setFormValue.bind(this);
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) return;
		this.props.setFormValue("ULO", { [ref]: value }, true);

		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
		});
	}

	render() {
		return (
			<Container style={{ background: "white" }}>
				{/* Form heading */}
				<Row>
					<Toolbar>
						<Typography variant="h5" id="tableTitle" component="div">
							{"ULO Measurement Form"}
						</Typography>
					</Toolbar>
				</Row>
				{/* Three sets of inputs */}
				<Row>
					{/* Section 1 */}
					<Col className="col-6">
						<Container style={{ background: "white", backgroundImage: "url('ULO_1.png')", backgroundRepeat: "no-repeat" }}>
							<Row>
								<Col className="offset-9 col-3">
									<FormControl component="fieldset">
										<RadioGroup value={this.state.form.side} onClick={(event) => this.setFormValue("side", event.target.value)}>
											<FormControlLabel value="left" control={<Radio />} label="Left" />
										</RadioGroup>
									</FormControl>
								</Col>
							</Row>
							{verticalSpacer(70)}
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
								<Col className="col-3">
									<TextField
										value={this.state.form.s1r1f2}
										onChange={(event) => this.setFormValue("s1r1f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-3 col-3">
									<TextField
										value={this.state.form.s1r1f3}
										onChange={(event) => this.setFormValue("s1r1f3", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(10)}
							<Row>
								<Col className="offset-8 col-3">
									<TextField
										value={this.state.form.s1r2f1}
										onChange={(event) => this.setFormValue("s1r2f1", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(30)}
							<Row>
								<Col className="offset-8 col-3">
									<TextField
										value={this.state.form.s1r3f1}
										onChange={(event) => this.setFormValue("s1r3f1", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(10)}
							<Row>
								<Col className="col-3">
									<TextField
										value={this.state.form.s1r4f1}
										onChange={(event) => this.setFormValue("s1r4f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="col-3">
									<TextField
										value={this.state.form.s1r4f2}
										onChange={(event) => this.setFormValue("s1r4f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							<Row>
								<Col className="offset-8 col-3">
									<TextField
										value={this.state.form.s1r5f1}
										onChange={(event) => this.setFormValue("s1r5f1", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="offset-3 col-3">
									<TextField
										value={this.state.form.s1r6f1}
										onChange={(event) => this.setFormValue("s1r6f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-2 col-3">
									<TextField
										value={this.state.form.s1r6f2}
										onChange={(event) => this.setFormValue("s1r6f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(55)}
						</Container>
					</Col>
					{/* Section 2 */}
					<Col className="col-6">
						<Container style={{ background: "white", backgroundImage: "url('ULO_2.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(!0)}
							<Row>
								<Col className="col-3">
									<FormControl component="fieldset">
										<RadioGroup value={this.state.form.side} onClick={(event) => this.setFormValue("side", event.target.value)}>
											<FormControlLabel value="right" control={<Radio />} label="Right" />
										</RadioGroup>
									</FormControl>
								</Col>
							</Row>
							{verticalSpacer(70)}
							<Row>
								<Col className="col-3">
									<TextField
										value={this.state.form.s2r1f3}
										onChange={(event) => this.setFormValue("s2r1f3", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
								<Col className="offset-3 col-3">
									<TextField
										value={this.state.form.s2r1f2}
										onChange={(event) => this.setFormValue("s2r1f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="col-3">
									<TextField
										value={this.state.form.s2r1f1}
										onChange={(event) => this.setFormValue("s2r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(10)}
							<Row>
								<Col className="offset-1 col-3">
									<TextField
										value={this.state.form.s2r2f1}
										onChange={(event) => this.setFormValue("s2r2f1", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(30)}
							<Row>
								<Col className="offset-1 col-3">
									<TextField
										value={this.state.form.s2r3f1}
										onChange={(event) => this.setFormValue("s2r3f1", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(10)}
							<Row>
								<Col className="offset-6 col-3">
									<TextField
										value={this.state.form.s2r4f1}
										onChange={(event) => this.setFormValue("s2r4f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="col-3">
									<TextField
										value={this.state.form.s2r4f2}
										onChange={(event) => this.setFormValue("s2r4f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							<Row>
								<Col className="offset-1 col-3">
									<TextField
										value={this.state.form.s2r5f1}
										onChange={(event) => this.setFormValue("s2r5f1", event.target.value)}
										style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="offset-1 col-3">
									<TextField
										value={this.state.form.s2r6f1}
										onChange={(event) => this.setFormValue("s2r6f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-2 col-3">
									<TextField
										value={this.state.form.s2r6f2}
										onChange={(event) => this.setFormValue("s2r6f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(55)}
						</Container>
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
						<h5>Orthosis Type</h5>
					</Col>
					<Col className="col-6 checkboxSection">
						<h5>Replacement Cause</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>Type of Construction</h5>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.so} onClick={(event) => this.setFormValue("so", event.target.checked)} />}
							label={this.labels.so}
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
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.conventional} onClick={(event) => this.setFormValue("conventional", event.target.checked)} />}
							label={this.labels.conventional}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.sewho} onClick={(event) => this.setFormValue("sewho", event.target.checked)} />}
							label={this.labels.sewho}
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
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							checked={this.state.form.flipFlop}
							control={<Checkbox checked={this.state.form.plastic} onClick={(event) => this.setFormValue("plastic", event.target.checked)} />}
							label={this.labels.plastic}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.ewho} onClick={(event) => this.setFormValue("ewho", event.target.checked)} />}
							label={this.labels.ewho}
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
							control={<Checkbox checked={this.state.form.eo} onClick={(event) => this.setFormValue("eo", event.target.checked)} />}
							label={this.labels.eo}
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
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.who} onClick={(event) => this.setFormValue("who", event.target.checked)} />}
							label={this.labels.who}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.growth} onClick={(event) => this.setFormValue("growth", event.target.checked)} />}
							label={this.labels.growth}
						/>
					</Col>
				</Row>
				{verticalSpacer(10)}

				{/* Set 3 random */}
				<Row>
					<Col className="col-6 checkboxSection">
						<h5>Wrist Joint Characteristics</h5>
					</Col>
					<Col className="col-6 checkboxSection">
						<h5>Elbow Joint Characteristics</h5>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-6 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.unknown1} onClick={(event) => this.setFormValue("unknown1", event.target.checked)} />}
							label={this.labels.unknown1}
						/>
					</Col>
					<Col className="col-6 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.unknown4} onClick={(event) => this.setFormValue("unknown4", event.target.checked)} />}
							label={this.labels.unknown4}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.unknown2} onClick={(event) => this.setFormValue("unknown2", event.target.checked)} />}
							label={this.labels.unknown2}
						/>
					</Col>
					<Col className="col-6 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.unknown5} onClick={(event) => this.setFormValue("unknown5", event.target.checked)} />}
							label={this.labels.unknown5}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.unknown3} onClick={(event) => this.setFormValue("unknown3", event.target.checked)} />}
							label={this.labels.unknown3}
						/>
					</Col>
					<Col className="col-6 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.unknown6} onClick={(event) => this.setFormValue("unknown6", event.target.checked)} />}
							label={this.labels.unknown6}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ULOForm);

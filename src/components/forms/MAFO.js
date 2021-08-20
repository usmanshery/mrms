import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, Toolbar, Typography } from "@material-ui/core";
import { AFOFormBooleanFields, defaultAFOFormValues, defaultAFOLableValues } from "../../store/misc/formValues";
import { verticalSpacer } from "../../store/misc/global";
import { Container, Row, Col } from "react-bootstrap";

import { navModules } from "../../store/actions/Navigation";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;

	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			formValues: state.patientModule.activeCase[state.patientModule.activeCase.category].AFO,
		};
	}

	if (state.activeModule === navModules.admin) {
		console.log(state.adminModule);
		return {
			readOnly,
			formValues: state.adminModule.activeCase.AFO,
		};
	}
	if (state.activeModule === navModules.casting || state.activeModule === navModules.modification || state.activeModule === navModules.fitting) {
		return {
			readOnly,
			formValues: state.stationModule.activeCase.AFO,
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

class AFOForm extends Component {
	constructor(props) {
		super(props);

		let activeCaseData = { ...defaultAFOFormValues, ...this.props.formValues };

		// clean boolean values
		for (var key in activeCaseData) {
			if (activeCaseData.hasOwnProperty(key)) {
				if (AFOFormBooleanFields.includes(key)) {
					activeCaseData[key] = activeCaseData[key] === "true";
				}
			}
		}

		// initialize the state
		this.state = {
			form: activeCaseData,
		};

		// labels for inputs
		this.labels = { ...defaultAFOLableValues };

		this.setFormValue = this.setFormValue.bind(this);
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) return;
		this.props.setFormValue("AFO", { [ref]: value }, true);

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
							{"AFO Measurement Form"}
						</Typography>
					</Toolbar>
				</Row>
				{/* Three sets of inputs */}
				<Row>
					{/* Section 1 */}
					<Col className="col-4">
						<Container style={{ background: "white", backgroundImage: "url('AFO_1.png')", backgroundRepeat: "no-repeat" }}>
							<Row>
								<Col className="offset-9 col-3">
									<FormControl component="fieldset">
										<RadioGroup value={this.state.form.side} onClick={(event) => this.setFormValue("side", event.target.value)}>
											<FormControlLabel value="left" control={<Radio />} label="Left" />
										</RadioGroup>
									</FormControl>
								</Col>
							</Row>
							<Row>
								<Col className="offset-8 col-4">
									<TextField
										value={this.state.form.s1r1f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(50)}
							<Row>
								<Col className="offset-8 col-4">
									<TextField
										value={this.state.form.s1r2f1}
										onChange={(event) => this.setFormValue("s1r2f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(75)}
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s1r3f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-4 col-4">
									<TextField
										value={this.state.form.s1r3f2}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(25)}
							<Row>
								<Col className="offset-8 col-4">
									<TextField
										value={this.state.form.s1r4f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(55)}
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s1r5f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-4 col-4">
									<TextField
										value={this.state.form.s1r5f2}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							<Row>
								<Col className="offset-4 col-4">
									<TextField
										value={this.state.form.s1r6f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
						</Container>
					</Col>
					{/* Section 2 */}
					<Col className="col-4">
						<Container style={{ background: "white", backgroundImage: "url('AFO_2.png')", backgroundRepeat: "no-repeat" }}>
							<Row>
								<Col className="col-3">
									<FormControl component="fieldset">
										<RadioGroup value={this.state.form.side} onClick={(event) => this.setFormValue("side", event.target.value)}>
											<FormControlLabel value="right" control={<Radio />} label="Right" />
										</RadioGroup>
									</FormControl>
								</Col>
							</Row>
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s2r1f1}
										onChange={(event) => this.setFormValue("s2r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(50)}
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s2r2f1}
										onChange={(event) => this.setFormValue("s2r2f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(75)}
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s2r3f1}
										onChange={(event) => this.setFormValue("s2r3f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
								<Col className="offset-4 col-4">
									<TextField
										value={this.state.form.s2r3f2}
										onChange={(event) => this.setFormValue("s2r3f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(25)}
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s2r4f1}
										onChange={(event) => this.setFormValue("s2r4f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(55)}
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s2r5f1}
										onChange={(event) => this.setFormValue("s2r5f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
								<Col className="offset-4 col-4">
									<TextField
										value={this.state.form.s2r5f2}
										onChange={(event) => this.setFormValue("s2r5f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							<Row>
								<Col className="offset-4 col-4">
									<TextField
										value={this.state.form.s2r6f1}
										onChange={(event) => this.setFormValue("s2r6f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
						</Container>
					</Col>
					{/* Section 3 */}
					<Col className="col-4">
						<Container style={{ background: "white", backgroundImage: "url('AFO_3.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(200)}
							<Row>
								<Col className="col-4">
									<TextField
										value={this.state.form.s3r1f1}
										onChange={(event) => this.setFormValue("s3r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-3 col-4">
									<TextField
										value={this.state.form.s3r1f2}
										onChange={(event) => this.setFormValue("s3r1f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(250)}
							<Row>
								<Col className="offset-4 col-4">
									<TextField
										value={this.state.form.s3r2f1}
										onChange={(event) => this.setFormValue("s3r2f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(25)}
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
						<h5>Orthosis type</h5>
					</Col>
					<Col className="col-6 checkboxSection">
						<h5>Replacement cause</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>Footwear</h5>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.afo} onClick={(event) => this.setFormValue("afo", event.target.checked)} />}
							label={this.labels.afo}
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
							control={<Checkbox checked={this.state.form.accident} onClick={(event) => this.setFormValue("accident", event.target.checked)} />}
							label={this.labels.accident}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.barefoot} onClick={(event) => this.setFormValue("barefoot", event.target.checked)} />}
							label={this.labels.barefoot}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.fo} onClick={(event) => this.setFormValue("fo", event.target.checked)} />}
							label={this.labels.fo}
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
							control={<Checkbox checked={this.state.form.flipFlop} onClick={(event) => this.setFormValue("flipFlop", event.target.checked)} />}
							label={this.labels.flipFlop}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.so} onClick={(event) => this.setFormValue("so", event.target.checked)} />}
							label={this.labels.so}
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
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.open} onClick={(event) => this.setFormValue("open", event.target.checked)} />}
							label={this.labels.open}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.co} onClick={(event) => this.setFormValue("co", event.target.checked)} />}
							label={this.labels.co}
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
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.closed} onClick={(event) => this.setFormValue("closed", event.target.checked)} />}
							label={this.labels.closed}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.shoe} onClick={(event) => this.setFormValue("shoe", event.target.checked)} />}
							label={this.labels.shoe}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.growth} onClick={(event) => this.setFormValue("growth", event.target.checked)} />}
							label={this.labels.growth}
						/>
					</Col>
				</Row>

				{verticalSpacer(20)}
				{/* Set 2 random */}
				<Row>
					<Col className="col-3">
						<TextField
							value={this.state.form.bodyWeight}
							onChange={(event) => this.setFormValue("bodyWeight", event.target.value)}
							label={this.labels.bodyWeight}
							type={"number"}
							variant="outlined"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							value={this.state.form.bodyHeight}
							onChange={(event) => this.setFormValue("bodyHeight", event.target.value)}
							label={this.labels.bodyHeight}
							type={"number"}
							variant="outlined"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							value={this.state.form.footSize}
							onChange={(event) => this.setFormValue("footSize", event.target.value)}
							label={this.labels.footSize}
							type={"number"}
							variant="outlined"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							value={this.state.form.heelHeight}
							onChange={(event) => this.setFormValue("heelHeight", event.target.value)}
							label={this.labels.heelHeight}
							type={"number"}
							variant="outlined"
						/>
					</Col>
				</Row>
				{verticalSpacer(10)}

				{/* Set 3 random */}
				<Row>
					<Col className="col-3 checkboxSection">
						<h5>Ankle Joint Characteristics</h5>
					</Col>
					<Col className="offset-6 col-3 checkboxSection">
						<h5>Type of Construction</h5>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.stirupAdult} onClick={(event) => this.setFormValue("stirupAdult", event.target.checked)} />}
							label={this.labels.stirupAdult}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.ankleJointLarge} onClick={(event) => this.setFormValue("ankleJointLarge", event.target.checked)} />}
							label={this.labels.ankleJointLarge}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.tamarakLarge} onClick={(event) => this.setFormValue("tamarakLarge", event.target.checked)} />}
							label={this.labels.tamarakLarge}
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
							control={<Checkbox checked={this.state.form.stirupChild} onClick={(event) => this.setFormValue("stirupChild", event.target.checked)} />}
							label={this.labels.stirupChild}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.ankleJointSmall} onClick={(event) => this.setFormValue("ankleJointSmall", event.target.checked)} />}
							label={this.labels.ankleJointSmall}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.tamarakSmall} onClick={(event) => this.setFormValue("tamarakSmall", event.target.checked)} />}
							label={this.labels.tamarakSmall}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.plastic} onClick={(event) => this.setFormValue("plastic", event.target.checked)} />}
							label={this.labels.plastic}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AFOForm);

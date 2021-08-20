import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, Toolbar, Typography } from "@material-ui/core";
import { TTPFormBooleanFields, defaultTTPFormValues, defaultTTPLableValues } from "../../store/misc/formValues";
import { verticalSpacer } from "../../store/misc/global";
import { Container, Row, Col } from "react-bootstrap";

import { navModules } from "../../store/actions/Navigation";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;
	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			formValues: state.patientModule.activeCase[state.patientModule.activeCase.category].TTP,
		};
	}

	if (state.activeModule === navModules.admin) {
		return {
			readOnly,
			formValues: state.adminModule.activeCase.TTP,
		};
	}
	if (state.activeModule === navModules.casting || state.activeModule === navModules.modification || state.activeModule === navModules.fitting) {
		return {
			readOnly,
			formValues: state.stationModule.activeCase.TTP,
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
		// admin related
		pendingCases: state.adminModule.pendingCases,
		activeAdminCaseId: state.adminModule.activeCaseId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

class TTPForm extends Component {
	constructor(props) {
		super(props);

		let activeCaseData = { ...defaultTTPFormValues, ...this.props.formValues };

		// clean boolean values
		for (var key in activeCaseData) {
			if (activeCaseData.hasOwnProperty(key)) {
				if (TTPFormBooleanFields.includes(key)) {
					activeCaseData[key] = activeCaseData[key] === "true";
				}
			}
		}

		// initialize the state
		this.state = {
			form: activeCaseData,
		};

		// labels for inputs
		this.labels = { ...defaultTTPLableValues };

		this.setFormValue = this.setFormValue.bind(this);
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) return;
		this.props.setFormValue("TTP", { [ref]: value }, true);

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
							{"TTP Measurement Form"}
						</Typography>
					</Toolbar>
				</Row>
				
				{/* Three sets of inputs */}
				<Row>
					{/* Section 1 */}
					<Col className="col-5">
						<Container style={{ background: "white", backgroundImage: "url('TTP_1.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(100)}
							<Row>
								<Col className="offset-1 col-3">
									<TextField
										value={this.state.form.s1r1f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(90)}
							<Row>
								<Col className="offset-1 col-3">
									<TextField
										value={this.state.form.s1r2f1}
										onChange={(event) => this.setFormValue("s1r2f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
								<Col className="offset-3 col-3">
									<TextField
										value={this.state.form.s1r2f2}
										onChange={(event) => this.setFormValue("s1r2f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(260)}
							<Row>
								<Col className="offset-4 col-3">
									<TextField
										value={this.state.form.s1r3f1}
										onChange={(event) => this.setFormValue("s1r3f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
						</Container>
					</Col>
					{/* Section 2 */}
					<Col className="col-5">
						<Container style={{ background: "white", backgroundImage: "url('TTP_2.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(5)}
							<Row>
								<Col className="offset-8 col-3">
									<TextField value={this.state.form.s2r1f1} onChange={(event) => this.setFormValue("s2r1f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r2f1} onChange={(event) => this.setFormValue("s2r2f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
								<Col className="offset-5 col-3">
									<TextField value={this.state.form.s2r2f2} onChange={(event) => this.setFormValue("s2r2f2", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							{verticalSpacer(60)}
							<Row>
								<Col className="offset-8 col-3">
									<TextField
										value={this.state.form.s2r3f1}
										onChange={(event) => this.setFormValue("s2r3f1", event.target.value)}
										type={"number"}
										variant="outlined"
										style={{ background: "white" }}
									/>
								</Col>
							</Row>
							{verticalSpacer(10)}
							<Row>
								<Col className="offset-6 col-3">
									<TextField
										value={this.state.form.s2r4f1}
										onChange={(event) => this.setFormValue("s2r4f1", event.target.value)}
										type={"number"}
										variant="outlined"
										style={{ background: "white" }}
									/>
								</Col>
							</Row>
							{verticalSpacer(100)}
							<Row>
								<Col>
									<TextField
										style={{ width: "100%" }}
										multiline
										rows={8}
										label={this.labels.remarks}
										value={this.state.form.remarks}
										onChange={(event) => this.setFormValue("remarks", event.target.value)}
										variant="outlined"
									/>
								</Col>
							</Row>
						</Container>
					</Col>
					{/* Section 3 */}
					<Col className="col-2">
						<Container style={{ background: "white" }}>
							<Row>
								<Col>
									<FormControl component="fieldset">
										<RadioGroup value={this.state.form.side} onClick={(event) => this.setFormValue("side", event.target.value)}>
											<FormControlLabel value="right" control={<Radio />} label="Right" />
											<FormControlLabel value="left" control={<Radio />} label="Left" />
										</RadioGroup>
									</FormControl>
								</Col>
							</Row>
							<Row>
								<Col>
									<TextField
										label={this.labels.flexion}
										value={this.state.form.flexion}
										onChange={(event) => this.setFormValue("flexion", event.target.value)}
										variant="outlined"
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<TextField
										label={this.labels.extension}
										value={this.state.form.extension}
										onChange={(event) => this.setFormValue("extension", event.target.value)}
										variant="outlined"
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<TextField
										label={this.labels.abduction}
										value={this.state.form.abduction}
										onChange={(event) => this.setFormValue("abduction", event.target.value)}
										variant="outlined"
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<TextField
										label={this.labels.adduction}
										value={this.state.form.adduction}
										onChange={(event) => this.setFormValue("adduction", event.target.value)}
										variant="outlined"
									/>
								</Col>
							</Row>
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
						<h5>Prosthesis type</h5>
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
							control={<Checkbox checked={this.state.form.PTTTPTB} onClick={(event) => this.setFormValue("PTTTPTB", event.target.checked)} />}
							label={this.labels.TTPTB}
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
							control={<Checkbox checked={this.state.form.growth} onClick={(event) => this.setFormValue("growth", event.target.alignmentProblem)} />}
							label={this.labels.growth}
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
							control={<Checkbox checked={this.state.form.PTTTPTBSC} onClick={(event) => this.setFormValue("PTTTPTBSC", event.target.checked)} />}
							label={this.labels.TTPTBSC}
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
							control={<Checkbox checked={this.state.form.accident} onClick={(event) => this.setFormValue("accident", event.target.checked)} />}
							label={this.labels.accident}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							checked={this.state.form.flipFlop}
							control={<Checkbox checked={this.state.form.shoeType} onClick={(event) => this.setFormValue("shoeType", event.target.checked)} />}
							label={this.labels.shoeType}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.PTTTPTBSCSP} onClick={(event) => this.setFormValue("PTTTPTBSCSP", event.target.checked)} />}
							label={this.labels.TTPTBSCSP}
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
							checked={this.state.form.growth}
							control={<Checkbox checked={this.state.form.falseInfo} onClick={(event) => this.setFormValue("falseInfo", event.target.checked)} />}
							label={this.labels.falseInfo}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.TTSideBars} onClick={(event) => this.setFormValue("TTSideBars", event.target.checked)} />}
							label={this.labels.TTSideBars}
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
							control={<Checkbox checked={this.state.form.wear} onClick={(event) => this.setFormValue("wear", event.target.checked)} />}
							label={this.labels.wear}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="offset-3 col-3 checkboxSection">
						<FormControlLabel
							control={
								<Checkbox checked={this.state.form.socketCrackBreakdown} onClick={(event) => this.setFormValue("socketCrackBreakdown", event.target.checked)} />
							}
							label={this.labels.socketCrackBreakdown}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.stolenLost} onClick={(event) => this.setFormValue("stolenLost", event.target.checked)} />}
							label={this.labels.stolenLost}
						/>
					</Col>
				</Row>

				{verticalSpacer(20)}
				{/* Set 2 random */}
				<Row>
					<Col className="col-2">
						<TextField
							value={this.state.form.bodyWeight}
							onChange={(event) => this.setFormValue("bodyWeight", event.target.value)}
							label={this.labels.bodyWeight}
							type={"number"}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							value={this.state.form.bodyHeight}
							onChange={(event) => this.setFormValue("bodyHeight", event.target.value)}
							label={this.labels.bodyHeight}
							type={"number"}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							value={this.state.form.footSize}
							onChange={(event) => this.setFormValue("footSize", event.target.value)}
							label={this.labels.footSize}
							type={"number"}
							variant="outlined"
						/>
					</Col>
					<Col className="col-2">
						<TextField
							value={this.state.form.heelHeight}
							onChange={(event) => this.setFormValue("heelHeight", event.target.value)}
							label={this.labels.heelHeight}
							type={"number"}
							variant="outlined"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							value={this.state.form.prosFootSize}
							onChange={(event) => this.setFormValue("prosFootSize", event.target.value)}
							label={this.labels.prosFootSize}
							type={"number"}
							variant="outlined"
						/>
					</Col>
				</Row>
				{verticalSpacer(10)}

				{/* Set 3 random */}
				<Row>
					<Col className="col-3 checkboxSection">
						<h5>Type of Socket</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>Type of Suspension</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>Type of cosmetic</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>MISC</h5>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.STTTPTB} onClick={(event) => this.setFormValue("STTTPTB", event.target.checked)} />}
							label={this.labels.TTPTB}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.PTBStrap} onClick={(event) => this.setFormValue("PTBStrap", event.target.checked)} />}
							label={this.labels.PTBStrap}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.EVA} onClick={(event) => this.setFormValue("EVA", event.target.checked)} />}
							label={this.labels.EVA}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.softSocket} onClick={(event) => this.setFormValue("softSocket", event.target.checked)} />}
							label={this.labels.softSocket}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.STTTPTBSC} onClick={(event) => this.setFormValue("STTTPTBSC", event.target.checked)} />}
							label={this.labels.TTPTBSC}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.strap8} onClick={(event) => this.setFormValue("strap8", event.target.checked)} />}
							label={this.labels.strap8}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.none} onClick={(event) => this.setFormValue("none", event.target.checked)} />}
							label={this.labels.none}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.STTTPTBSCSP} onClick={(event) => this.setFormValue("STTTPTBSCSP", event.target.checked)} />}
							label={this.labels.TTPTBSCSP}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.supracondilar} onClick={(event) => this.setFormValue("supracondilar", event.target.checked)} />}
							label={this.labels.supracondilar}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.pp} onClick={(event) => this.setFormValue("pp", event.target.checked)} />}
							label={this.labels.pp}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TTPForm);

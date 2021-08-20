import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, Typography, Toolbar } from "@material-ui/core";
import { TFPFormBooleanFields, defaultTFPFormValues, defaultTFPLableValues } from "../../store/misc/formValues";
import { verticalSpacer } from "../../store/misc/global";
import { Container, Row, Col } from "react-bootstrap";

import { navModules } from "../../store/actions/Navigation";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;

	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			formValues: state.patientModule.activeCase[state.patientModule.activeCase.category].TFP,
		};
	}
	if (state.activeModule === navModules.admin) {
		console.log(state.adminModule);
		return {
			readOnly,
			formValues: state.adminModule.activeCase.TFP,
		};
	}
	if (state.activeModule === navModules.casting || state.activeModule === navModules.modification || state.activeModule === navModules.fitting) {
		return {
			readOnly,
			formValues: state.stationModule.activeCase.TFP,
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

class TFPForm extends Component {
	constructor(props) {
		super(props);

		let activeCaseData = { ...defaultTFPFormValues, ...this.props.formValues };

		// clean boolean values
		for (var key in activeCaseData) {
			if (activeCaseData.hasOwnProperty(key)) {
				if (TFPFormBooleanFields.includes(key)) {
					activeCaseData[key] = activeCaseData[key] === "true";
				}
			}
		}
		// initialize the state
		this.state = {
			form: activeCaseData,
		};

		// labels for inputs
		this.labels = { ...defaultTFPLableValues };

		this.setFormValue = this.setFormValue.bind(this);
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) return;
		this.props.setFormValue("TFP", { [ref]: value }, true);

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
							{"TFP Measurement Form"}
						</Typography>
					</Toolbar>
				</Row>

				{/* Three sets of inputs */}
				<Row>
					{/* Section 1 */}
					<Col className="col-5">
						<Container style={{ background: "white", backgroundImage: "url('TFP_1.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(180)}
							<Row>
								<Col className="offset-1 col-3">
									<TextField
										value={this.state.form.s1r1f1}
										onChange={(event) => this.setFormValue("s1r1f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
								<Col className="offset-5 col-3">
									<TextField
										value={this.state.form.s1r1f2}
										onChange={(event) => this.setFormValue("s1r1f2", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(55)}
							<Row>
								<Col className="col-3">
									<TextField
										value={this.state.form.s1r2f1}
										onChange={(event) => this.setFormValue("s1r2f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="outlined"
									/>
								</Col>
							</Row>
							{verticalSpacer(30)}
							<Row>
								<Col className="offset-1 col-3">
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
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(70)}
							<Row>
								<Col className="offset-8 col-3">
									<TextField
										value={this.state.form.s1r4f1}
										onChange={(event) => this.setFormValue("s1r4f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
										variant="standard"
									/>
								</Col>
							</Row>
							{verticalSpacer(50)}
						</Container>
					</Col>
					{/* Section 2 */}
					<Col className="col-5">
						<Container style={{ background: "white", backgroundImage: "url('TFP_2.png')", backgroundRepeat: "no-repeat" }}>
							{verticalSpacer(13)}
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r1f1} onChange={(event) => this.setFormValue("s2r1f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r2f1} onChange={(event) => this.setFormValue("s2r2f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r3f1} onChange={(event) => this.setFormValue("s2r3f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
								<Col className="offset-5 col-3">
									<TextField value={this.state.form.s2r3f2} onChange={(event) => this.setFormValue("s2r3f2", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r4f1} onChange={(event) => this.setFormValue("s2r4f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r5f1} onChange={(event) => this.setFormValue("s2r5f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
								<Col className="offset-5 col-3">
									<TextField value={this.state.form.s2r5f2} onChange={(event) => this.setFormValue("s2r5f2", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r6f1} onChange={(event) => this.setFormValue("s2r6f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<TextField value={this.state.form.s2r7f1} onChange={(event) => this.setFormValue("s2r7f1", event.target.value)} type={"number"} variant="outlined" />
								</Col>
							</Row>
							{verticalSpacer(160)}
							<Row>
								<Col className="offset-5 col-3">
									<TextField
										value={this.state.form.s2r8f1}
										onChange={(event) => this.setFormValue("s2r8f1", event.target.value)}
										style={{ background: "white" }}
										type={"number"}
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
							<Row>
								<Col>
									<TextField
										multiline
										rows={13}
										label={this.labels.remarks}
										value={this.state.form.remarks}
										onChange={(event) => this.setFormValue("remarks", event.target.value)}
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
							control={<Checkbox checked={this.state.form.ic} onClick={(event) => this.setFormValue("ic", event.target.checked)} />}
							label={this.labels.ic}
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
							control={
								<Checkbox checked={this.state.form.alignmentProblem} onClick={(event) => this.setFormValue("alignmentProblem", event.target.checked)} />
							}
							label={this.labels.alignmentProblem}
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
							control={<Checkbox checked={this.state.form.PTquadSuction} onClick={(event) => this.setFormValue("PTquadSuction", event.target.checked)} />}
							label={this.labels.quadSuction}
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
							control={
								<Checkbox checked={this.state.form.socketCrackBreakdown} onClick={(event) => this.setFormValue("socketCrackBreakdown", event.target.checked)} />
							}
							label={this.labels.socketCrackBreakdown}
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
							control={<Checkbox checked={this.state.form.PTCADCAM} onClick={(event) => this.setFormValue("PTCADCAM", event.target.checked)} />}
							label={this.labels.CADCAM}
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
							control={<Checkbox checked={this.state.form.growth} onClick={(event) => this.setFormValue("growth", event.target.checked)} />}
							label={this.labels.growth}
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
					<Col className="offset-9 col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.closed} onClick={(event) => this.setFormValue("closed", event.target.checked)} />}
							label={this.labels.closed}
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
							control={<Checkbox checked={this.state.form.ischialCont} onClick={(event) => this.setFormValue("ischialCont", event.target.checked)} />}
							label={this.labels.ischialCont}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.silesianBelt} onClick={(event) => this.setFormValue("silesianBelt", event.target.checked)} />}
							label={this.labels.silesianBelt}
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
							control={<Checkbox checked={this.state.form.STquadSuction} onClick={(event) => this.setFormValue("STquadSuction", event.target.checked)} />}
							label={this.labels.quadSuction}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.suction} onClick={(event) => this.setFormValue("suction", event.target.checked)} />}
							label={this.labels.suction}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.none} onClick={(event) => this.setFormValue("none", event.target.checked)} />}
							label={this.labels.none}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.inliner} onClick={(event) => this.setFormValue("inliner", event.target.checked)} />}
							label={this.labels.inliner}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.STCADCAM} onClick={(event) => this.setFormValue("STCADCAM", event.target.checked)} />}
							label={this.labels.CADCAM}
						/>
					</Col>
					<Col className="offset-3 col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.pp} onClick={(event) => this.setFormValue("pp", event.target.checked)} />}
							label={this.labels.pp}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.CADCAMSuction} onClick={(event) => this.setFormValue("CADCAMSuction", event.target.checked)} />}
							label={this.labels.CADCAMSuction}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TFPForm);

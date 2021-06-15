import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControl, Button, FormControlLabel, RadioGroup, Radio, Checkbox } from "@material-ui/core";

import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

class TFPForm extends Component {
	constructor(props) {
		super(props);

		// if active case exists, fetch its data
		// let activeCaseData = this.props.activePatientData.cases.filter((_case) => _case.orthotic._id === this.props.activePatientCaseId);
		// if (activeCaseData.length === 0) {
		// 	activeCaseData = undefined;
		// }

		// if (activeCaseData !== undefined) {
		// 	activeCaseData = activeCaseData[0].orthotic;
		// }

		this.state = {
			form: {
				// side: this.props.isNew ? [] : activeCaseData.side,
				// deformity_disability: this.props.isNew ? "" : activeCaseData.deformity_disability,

				// section 1
				s1r1f1: "",
				s1r1f2: "",

				s1r2f1: "",

				s1r3f1: "",
				s1r3f2: "",

				s1r4f1: "",

				// section 2
				s2r1f1: "",

				s2r2f1: "",

				s2r3f1: "",
				s2r3f2: "",

				s2r4f1: "",

				s2r5f1: "",
				s2r5f2: "",

				s2r6f1: "",
				s2r7f1: "",
				s2r8f1: "",

				side: "",
				flexion: "",
				extension: "",
				abduction: "",
				adduction: "",
				remarks: "",

				admission: "",
				casting: "",
				fitting: "",
				delivery: "",
				replace: "",
				followup: "",

				ic: false,
				PTquadSuction: false,
				PTCADCAM: false,

				volumeChange: false,
				volumeChangeOther: false,
				componentsBreakdown: false,
				alignmentProblem: false,
				socketCrackBreakdown: false,
				growth: false,

				bodyWeight: "",
				bodyHeight: "",
				footSize: "",
				heelHeight: "",
				prosFootSize: "",

				barefoot: false,
				flipFlop: false,
				open: false,
				closed: false,

				ischialCont: false,
				STquadSuction: false,
				STCADCAM: false,
				CADCAMSuction: false,

				silesianBelt: false,
				suction: false,

				EVA: false,
				none: false,
				pp: false,

				softSocket: false,
				inliner: false,
			},
			// errors to show against validation
			errors: {},
			profile: props.profile,
		};

		// labels for inputs
		this.labels = {
			side: "Side",
			flexion: "Flexion",
			extension: "Extension",
			abduction: "Abduction",
			adduction: "Adduction",
			remarks: "Remarks",

			admission: "Admission Date",
			casting: "Casting Date",
			fitting: "Fitting Date",
			delivery: "Delivery Date",
			replace: "Replace Date",
			followup: "Follow Up Date",

			ic: "IC",
			quadSuction: "Quad Suction",
			CADCAM: "CAD/CAM",

			volumeChange: "01 Volume Change",
			volumeChangeOther: "02 Volume Change + Other",
			componentsBreakdown: "03 Components breakdown",
			alignmentProblem: "04 Alignment problem",
			socketCrackBreakdown: "05 Socket crack/breakdown",
			growth: "06 Growth",

			bodyWeight: "Body weight (KG)",
			bodyHeight: "Body Height (CM)",
			footSize: "Foot Size (CM)",
			heelHeight: "Heel Height (MM)",
			prosFootSize: "Prosthetic Foot Size",

			barefoot: "01 Barefoot",
			flipFlop: "02 Flip Flop",
			open: "03 Open",
			closed: "04 Closed",

			ischialCont: "Ischial Cont",
			CADCAMSuction: "CAD/CAM Suction",

			silesianBelt: "04 Silesian Belt",
			suction: "05 Suction",

			EVA: "EVA",
			none: "None",
			pp: "PP",

			softSocket: "Soft Socket",
			inliner: "Inliner",
		};

		this.triggerAction = this.triggerAction.bind(this);
	}

	setFormValue(ref, value) {
		console.log(value);
		// if (!this.props.activePatientEditable) return;
		// validate for error
		let error = false;

		// if required, set following for error validation
		// if (ref === "<title>") {}

		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
			errors: {
				...this.state.errors,
				[ref]: error,
			},
		});
	}

	// check for unique values and if correct, register the profile
	triggerAction() {
		// // if any errors
		// Object.filter = objFilter;
		// if (Object.keys(Object.filter(this.state.errors, (key, value) => value !== false)).length > 0) {
		// 	console.log("Skipping submission due to errors");
		// 	return;
		// }
		// if (this.props.isNew) {
		// 	// register it as new case, add patient id with the case
		// 	// prepare data
		// 	let formData = this.state.form;
		// 	// post data
		// 	this.props.insertCase(this.props.activePatientId, formData);
		// } else {
		// 	// dispatch update with case id and updated details
		// 	// prepare data
		// 	let formData = this.state.form;
		// 	// post data
		// 	this.props.updateCase(this.props.activePatientCaseId, formData);
		// 	// further if update was successful, merge the details with the case data
		// }
	}

	render() {
		const verticalSpacer = (spaceRequired) => {
			return (
				<Row>
					<Col>
						<div style={{ height: `${spaceRequired}px` }}></div>
					</Col>
				</Row>
			);
		};

		let triggerAction = undefined;
		if (this.props.activePatientEditable === true) {
			triggerAction = (
				<Row>
					<Col className="col-3 offset-9">
						<div className="form-submit-button">
							<Button variant="contained" color="primary" onClick={() => this.triggerAction()}>
								{this.props.isNew ? "Save" : "Update"}
							</Button>
						</div>
					</Col>
				</Row>
			);
		}

		return (
			<Container className="xgreenBackground">
				<Row>
					<Container style={{ background: "white" }}>
						{/* Three sets of inputs */}
						<Row>
							{/* Section 1 */}
							<Col className="col-5">
								<Container style={{ background: "white", backgroundImage: "url('TFP_1.png')", backgroundRepeat: "no-repeat" }}>
									{verticalSpacer(180)}
									<Row>
										<Col className="offset-1 col-3">
											<TextField value={this.state.form.s1r1f1} style={{ background: "white" }} type={"number"} variant="outlined" />
										</Col>
										<Col className="offset-5 col-3">
											<TextField value={this.state.form.s1r1f2} style={{ background: "white" }} type={"number"} variant="outlined" />
										</Col>
									</Row>
									{verticalSpacer(55)}
									<Row>
										<Col className="col-3">
											<TextField value={this.state.form.s1r2f1} style={{ background: "white" }} type={"number"} variant="outlined" />
										</Col>
									</Row>
									{verticalSpacer(30)}
									<Row>
										<Col className="offset-1 col-3">
											<TextField value={this.state.form.s1r3f1} style={{ background: "white" }} type={"number"} variant="outlined" />
										</Col>
										<Col className="offset-4 col-3">
											<TextField value={this.state.form.s1r3f2} style={{ background: "white" }} type={"number"} variant="standard" />
										</Col>
									</Row>
									{verticalSpacer(70)}
									<Row>
										<Col className="offset-8 col-3">
											<TextField value={this.state.form.s1r4f1} style={{ background: "white" }} type={"number"} variant="standard" />
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
											<TextField value={this.state.form.s2r1f1} type={"number"} variant="outlined" />
										</Col>
									</Row>
									<Row>
										<Col className="col-3">
											<TextField value={this.state.form.s2r2f1} type={"number"} variant="outlined" />
										</Col>
									</Row>
									<Row>
										<Col className="col-3">
											<TextField value={this.state.form.s2r3f1} type={"number"} variant="outlined" />
										</Col>
										<Col className="offset-5	 col-3">
											<TextField value={this.state.form.s2r3f2} type={"number"} variant="outlined" />
										</Col>
									</Row>
									<Row>
										<Col className="col-3">
											<TextField value={this.state.form.s2r4f1} type={"number"} variant="outlined" />
										</Col>
									</Row>
									<Row>
										<Col className="col-3">
											<TextField value={this.state.form.s2r5f1} type={"number"} variant="outlined" />
										</Col>
										<Col className="offset-5	 col-3">
											<TextField value={this.state.form.s2r5f2} type={"number"} variant="outlined" />
										</Col>
									</Row>
									<Row>
										<Col className="col-3">
											<TextField value={this.state.form.s2r6f1} type={"number"} variant="outlined" />
										</Col>
									</Row>
									<Row>
										<Col className="col-3">
											<TextField value={this.state.form.s2r7f1} type={"number"} variant="outlined" />
										</Col>
									</Row>
									{verticalSpacer(160)}
									<Row>
										<Col className="offset-5 col-3">
											<TextField value={this.state.form.s2r8f1} style={{ background: "white" }} type={"number"} variant="outlined" />
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
									error={this.state.errors.admission !== false}
									helperText={this.state.errors.admission}
									variant="outlined"
								/>
							</Col>
							<Col className="col-2">
								<TextField
									label={this.labels.casting}
									value={this.state.form.casting}
									onChange={(event) => this.setFormValue("casting", event.target.value)}
									error={this.state.errors.casting !== false}
									helperText={this.state.errors.casting}
									variant="outlined"
								/>
							</Col>
							<Col className="col-2">
								<TextField
									label={this.labels.fitting}
									value={this.state.form.fitting}
									onChange={(event) => this.setFormValue("fitting", event.target.value)}
									error={this.state.errors.fitting !== false}
									helperText={this.state.errors.fitting}
									variant="outlined"
								/>
							</Col>
							<Col className="col-2">
								<TextField
									label={this.labels.delivery}
									value={this.state.form.delivery}
									onChange={(event) => this.setFormValue("delivery", event.target.value)}
									error={this.state.errors.delivery !== false}
									helperText={this.state.errors.delivery}
									variant="outlined"
								/>
							</Col>
							<Col className="col-2">
								<TextField
									label={this.labels.replace}
									value={this.state.form.replace}
									onChange={(event) => this.setFormValue("replace", event.target.value)}
									error={this.state.errors.replace !== false}
									helperText={this.state.errors.replace}
									variant="outlined"
								/>
							</Col>
							<Col className="col-2">
								<TextField
									label={this.labels.followup}
									value={this.state.form.followup}
									onChange={(event) => this.setFormValue("followup", event.target.value)}
									error={this.state.errors.followup !== false}
									helperText={this.state.errors.followup}
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
										<Checkbox checked={this.state.form.alignmentProblem} onClick={(event) => this.setFormValue("alignmentProblem", event.target.alignmentProblem)} />
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
				</Row>
				{triggerAction}
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TFPForm);

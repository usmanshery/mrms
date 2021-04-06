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

class TTPForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				// section 1
				s1r1f1: "",
				s1r2f1: "",
				s1r2f2: "",
				s1r3f1: "",

				// section 2
				s2r1f1: "",
				s2r2f1: "",
				s2r2f2: "",
				s2r3f1: "",
				s2r4f1: "",

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

				PTTTPTB: false,
				PTTTPTBSC: false,
				PTTTPTBSCSP: false,
				TTSideBars: false,

				volumeChange: false,
				volumeChangeOther: false,
				componentsBreakdown: false,
				alignmentProblem: false,
				socketCrackBreakdown: false,
				growth: false,
				accident: false,
				falseInfo: false,
				wear: false,
				stolenLost: false,

				bodyWeight: "",
				bodyHeight: "",
				footSize: "",
				heelHeight: "",
				prosFootSize: "",

				barefoot: false,
				shoeType: false,

				STTTPTB: false,
				STTTPTBSC: false,
				STTTPTBSCSP: false,

				PTBStrap: false,
				strap8: false,
				supracondilar: false,

				EVA: false,
				none: false,
				pp: false,

				softSocket: false,
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

			TTPTB: "TT/PTB",
			TTPTBSC: "TT/PTB-SC",
			TTPTBSCSP: "TT/PTB-SC-SP",
			TTSideBars: "TT/Side bars",

			volumeChange: "01 Volume Change",
			volumeChangeOther: "02 Volume Change + Other",
			componentsBreakdown: "03 Components breakdown",
			alignmentProblem: "04 Alignment problem",
			socketCrackBreakdown: "05 Socket crack/breakdown",
			growth: "06 Growth",
			accident: "07 Accident",
			falseInfo: "08 False Info",
			wear: "09 Wear",
			stolenLost: "10 Stolen/ Lost",

			bodyWeight: "Body weight (KG)",
			bodyHeight: "Body Height (CM)",
			footSize: "Foot Size (CM)",
			heelHeight: "Heel Height (MM)",
			prosFootSize: "Prosthetic Foot Size",

			barefoot: "01 Barefoot/ Flip Flop",
			shoeType: "02 Shoe Type",

			PTBStrap: "01 PTB-strap",
			strap8: "02 '8' strap",
			supracondilar: "Supracondilar",

			EVA: "EVA",
			none: "None",
			pp: "PP",

			softSocket: "Soft Socket",
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
	triggerAction() {}

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
				</Row>
				{triggerAction}
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TTPForm);

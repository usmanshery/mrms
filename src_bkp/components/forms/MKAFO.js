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

class KAFOForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				// section 1
				s1r1f1: "",
				s1r1f2: "",
				s1r2f1: "",
				s1r2f2: "",
				s1r3f1: "",
				s1r4f1: "",
				s1r4f2: "",
				s1r5f1: "",
				s1r6f1: "",
				s1r7f1: "",
				s1r8f1: "",
				s1r9f1: "",
				s1r9f2: "",
				s1r10f1: "",
				s1r11f1: "",

				// section 2
				s2r1f1: "",
				s2r1f2: "",
				s2r2f1: "",
				s2r2f2: "",
				s2r3f1: "",
				s2r4f1: "",
				s2r4f2: "",
				s2r5f1: "",
				s2r6f1: "",
				s2r7f1: "",
				s2r8f1: "1",
				s2r9f1: "2",
				s2r9f2: "3",
				s2r10f1: "4",
				s2r10f2: "5",
				s2r11f1: "6",

				side: "right",

				admission: "",
				casting: "",
				fitting: "",
				delivery: "",
				replace: "",
				followup: "",

				ho: false,
				ko: false,
				hkafo: false,
				kafo: false,

				volumeChange: false,
				volumeChangeOther: false,
				componentsBreakdown: false,
				alignmentProblem: false,
				growth: false,
				accident: false,
				falseInfo: false,
				wear: false,
				stolenLost: false,

				barefoot: false,
				flipFlop: false,
				open: false,
				closed: false,

				bodyWeight: "",
				bodyHeight: "",
				footSize: "",
				heelHeight: "",

				stirupAdult: false,
				stirupChild: false,
				ankleJointLarge: false,
				ankleJointSmall: false,
				tamarakLarge: false,
				tamarakSmall: false,

				dropLockAdult: false,
				dropLockChild: false,
				CREdropLockAdult: false,
				CREdropLockChild: false,
				swissLockAdult: false,
				swissLockChild: false,

				adult: false,
				child: false,

				conventional: false,
				plastic: false,
			},
			// errors to show against validation
			errors: {},
			profile: props.profile,
		};

		// labels for inputs
		this.labels = {
			side: "Side",

			admission: "Admission Date",
			casting: "Casting Date",
			fitting: "Fitting Date",
			delivery: "Delivery Date",
			replace: "Replace Date",
			followup: "Follow Up Date",

			ho: "H.O",
			ko: "K.O",
			hkafo: "H.K.A.F.O",
			kafo: "K.A.F.O",

			volumeChange: "01 Volume Change",
			volumeChangeOther: "02 Volume Change + Other",
			componentsBreakdown: "03 Components breakdown",
			alignmentProblem: "04 Alignment problem",
			growth: "05 Growth",
			accident: "06 Accident",
			falseInfo: "07 False Info",
			wear: "08 Wear",
			stolenLost: "09 Stolen/ Lost",

			bodyWeight: "Body weight (KG)",
			bodyHeight: "Body Height (CM)",
			footSize: "Foot Size (CM)",
			heelHeight: "Heel Height (MM)",

			barefoot: "01 Barefoot",
			flipFlop: "02 Flip Flop",
			open: "03 Open",
			closed: "04 Closed",

			stirupAdult: "01 Stirup Adult 20mm",
			stirupChild: "02 Stirup Child 16mm",
			ankleJointLarge: "03 PP Ankle Joint Large",
			ankleJointSmall: "04 PP Ankle Joint Small",
			tamarakLarge: "05 Tamarak Large",
			tamarakSmall: "06 Tamarak Small",

			dropLockAdult: "01 Drop Lock Adult 20mm",
			dropLockChild: "02 Drop Lock Child 16mm",
			CREdropLockAdult: "03 CRE Drop Lock Adult 20mm",
			CREdropLockChild: "04 CRE Drop Lock Child 16mm",
			swissLockAdult: "05 Swiss Lock Adult 20mm",
			swissLockChild: "06 Swiss Lock Child 16mm",

			adult: "01 Adult",
			child: "02 Child",

			conventional: "01 Conventional",
			plastic: "01 Plastic",
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
							<Col className="col-6">
								<Container style={{ background: "white", backgroundImage: "url('KAFO_1.png')", backgroundRepeat: "no-repeat" }}>
									{verticalSpacer(!0)}
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
										<Col className="col-3">
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
												value={this.state.form.s1r2f1}
												onChange={(event) => this.setFormValue("s1r2f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
										<Col className="offset-5 col-3">
											<TextField
												value={this.state.form.s1r2f2}
												onChange={(event) => this.setFormValue("s1r2f2", event.target.value)}
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
												value={this.state.form.s1r3f1}
												onChange={(event) => this.setFormValue("s1r3f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-1 col-3">
											<TextField
												value={this.state.form.s1r4f1}
												onChange={(event) => this.setFormValue("s1r4f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
										<Col className="offset-2 col-3">
											<TextField
												value={this.state.form.s1r4f2}
												onChange={(event) => this.setFormValue("s1r4f2", event.target.value)}
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
												value={this.state.form.s1r5f1}
												onChange={(event) => this.setFormValue("s1r5f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="col-3">
											<TextField
												value={this.state.form.s1r6f1}
												onChange={(event) => this.setFormValue("s1r6f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-6 col-3">
											<TextField
												value={this.state.form.s1r7f1}
												onChange={(event) => this.setFormValue("s1r7f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px", marginTop: "-20px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-1 col-3">
											<TextField
												value={this.state.form.s1r8f1}
												onChange={(event) => this.setFormValue("s1r8f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									{verticalSpacer(20)}
									<Row>
										<Col className="col-3">
											<TextField
												value={this.state.form.s1r9f1}
												onChange={(event) => this.setFormValue("s1r9f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
										<Col className="offset-3 col-3">
											<TextField
												value={this.state.form.s1r9f2}
												onChange={(event) => this.setFormValue("s1r9f2", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px", marginTop: "-40px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
									</Row>
									{verticalSpacer(5)}
									<Row>
										<Col className="offset-1 col-3">
											<TextField
												value={this.state.form.s1r10f1}
												onChange={(event) => this.setFormValue("s1r10f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-4 col-3">
											<TextField
												value={this.state.form.s1r11f1}
												onChange={(event) => this.setFormValue("s1r11f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
								</Container>
							</Col>
							{/* Section 2 */}
							<Col className="col-6">
								<Container style={{ background: "white", backgroundImage: "url('KAFO_2.png')", backgroundRepeat: "no-repeat" }}>
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
									<Row>
										<Col className="col-3">
											<TextField
												value={this.state.form.s2r1f1}
												onChange={(event) => this.setFormValue("s2r1f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
										<Col className="offset-5 col-3">
											<TextField
												value={this.state.form.s2r1f2}
												onChange={(event) => this.setFormValue("s2r1f2", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									{verticalSpacer(10)}
									<Row>
										<Col className="col-3">
											<TextField
												value={this.state.form.s2r2f1}
												onChange={(event) => this.setFormValue("s2r2f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
										<Col className="offset-5 col-3">
											<TextField
												value={this.state.form.s2r2f2}
												onChange={(event) => this.setFormValue("s2r2f2", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									{verticalSpacer(10)}
									<Row>
										<Col className="col-3">
											<TextField
												value={this.state.form.s2r3f1}
												onChange={(event) => this.setFormValue("s2r3f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-2 col-3">
											<TextField
												value={this.state.form.s2r4f1}
												onChange={(event) => this.setFormValue("s2r4f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
										<Col className="offset-2 col-3">
											<TextField
												value={this.state.form.s2r4f2}
												onChange={(event) => this.setFormValue("s2r4f2", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									{verticalSpacer(10)}
									<Row>
										<Col className="offset-2 col-3">
											<TextField
												value={this.state.form.s2r5f1}
												onChange={(event) => this.setFormValue("s2r5f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-8 col-3">
											<TextField
												value={this.state.form.s2r6f1}
												onChange={(event) => this.setFormValue("s2r6f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-2 col-3">
											<TextField
												value={this.state.form.s2r7f1}
												onChange={(event) => this.setFormValue("s2r7f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px", marginTop: "-20px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-7 col-3">
											<TextField
												value={this.state.form.s2r8f1}
												onChange={(event) => this.setFormValue("s2r8f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									{verticalSpacer(20)}
									<Row>
										<Col className="offset-2 col-3">
											<TextField
												value={this.state.form.s2r9f1}
												onChange={(event) => this.setFormValue("s2r9f1", event.target.value)}
												style={{ background: "white", border: "1px solid black", borderRadius: "27px", padding: "10px", marginTop: "-40px" }}
												type={"number"}
												variant="standard"
											/>
										</Col>
										<Col className="offset-3 col-3">
											<TextField
												value={this.state.form.s2r9f2}
												onChange={(event) => this.setFormValue("s2r9f2", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									{verticalSpacer(5)}
									<Row>
										<Col className="offset-1 col-3">
											<TextField
												value={this.state.form.s2r10f1}
												onChange={(event) => this.setFormValue("s2r10f1", event.target.value)}
												style={{ background: "white", marginTop: "20px" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
										<Col className="offset-3 col-3">
											<TextField
												value={this.state.form.s2r10f2}
												onChange={(event) => this.setFormValue("s2r10f2", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
												variant="outlined"
											/>
										</Col>
									</Row>
									<Row>
										<Col className="offset-4 col-3">
											<TextField
												value={this.state.form.s2r11f1}
												onChange={(event) => this.setFormValue("s2r11f1", event.target.value)}
												style={{ background: "white" }}
												type={"number"}
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
									control={<Checkbox checked={this.state.form.ho} onClick={(event) => this.setFormValue("ho", event.target.checked)} />}
									label={this.labels.ho}
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
									control={<Checkbox checked={this.state.form.barefoot} onClick={(event) => this.setFormValue("barefoot", event.target.checked)} />}
									label={this.labels.barefoot}
								/>
							</Col>
						</Row>
						<Row>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.ko} onClick={(event) => this.setFormValue("ko", event.target.checked)} />}
									label={this.labels.ko}
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
									control={<Checkbox checked={this.state.form.hkafo} onClick={(event) => this.setFormValue("hkafo", event.target.checked)} />}
									label={this.labels.hkafo}
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
									control={<Checkbox checked={this.state.form.kafo} onClick={(event) => this.setFormValue("kafo", event.target.checked)} />}
									label={this.labels.kafo}
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
							<Col className="offset-3 col-3 checkboxSection">
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
							<Col className="col-3 checkboxSection">
								<h5>Knee Joint Characteristics</h5>
							</Col>
							<Col className="col-3 checkboxSection">
								<h5>Hip Joint Characteristics</h5>
							</Col>
							<Col className="col-3 checkboxSection">
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
									control={<Checkbox checked={this.state.form.dropLockAdult} onClick={(event) => this.setFormValue("dropLockAdult", event.target.checked)} />}
									label={this.labels.dropLockAdult}
								/>
							</Col>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.adult} onClick={(event) => this.setFormValue("adult", event.target.checked)} />}
									label={this.labels.adult}
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
									control={<Checkbox checked={this.state.form.dropLockChild} onClick={(event) => this.setFormValue("dropLockChild", event.target.checked)} />}
									label={this.labels.dropLockChild}
								/>
							</Col>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.child} onClick={(event) => this.setFormValue("child", event.target.checked)} />}
									label={this.labels.child}
								/>
							</Col>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.plastic} onClick={(event) => this.setFormValue("plastic", event.target.checked)} />}
									label={this.labels.plastic}
								/>
							</Col>
						</Row>
						<Row>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.ankleJointLarge} onClick={(event) => this.setFormValue("ankleJointLarge", event.target.checked)} />}
									label={this.labels.ankleJointLarge}
								/>
							</Col>
							<Col className="col-4 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.CREdropLockAdult} onClick={(event) => this.setFormValue("CREdropLockAdult", event.target.checked)} />}
									label={this.labels.CREdropLockAdult}
								/>
							</Col>
						</Row>
						<Row>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.ankleJointSmall} onClick={(event) => this.setFormValue("ankleJointSmall", event.target.checked)} />}
									label={this.labels.ankleJointSmall}
								/>
							</Col>
							<Col className="col-4 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.CREdropLockChild} onClick={(event) => this.setFormValue("CREdropLockChild", event.target.checked)} />}
									label={this.labels.CREdropLockChild}
								/>
							</Col>
						</Row>
						<Row>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.tamarakLarge} onClick={(event) => this.setFormValue("tamarakLarge", event.target.checked)} />}
									label={this.labels.tamarakLarge}
								/>
							</Col>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.swissLockAdult} onClick={(event) => this.setFormValue("swissLockAdult", event.target.checked)} />}
									label={this.labels.swissLockAdult}
								/>
							</Col>
						</Row>
						<Row>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.tamarakSmall} onClick={(event) => this.setFormValue("tamarakSmall", event.target.checked)} />}
									label={this.labels.tamarakSmall}
								/>
							</Col>
							<Col className="col-3 checkboxSection">
								<FormControlLabel
									control={<Checkbox checked={this.state.form.swissLockChild} onClick={(event) => this.setFormValue("swissLockChild", event.target.checked)} />}
									label={this.labels.swissLockChild}
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

export default connect(mapStateToProps, mapDispatchToProps)(KAFOForm);

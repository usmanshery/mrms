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

class ULOForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				// section 1

				s1r1f1: "",
				s1r1f2: "",
				s1r1f3: "",
				s1r2f1: "",
				s1r3f1: "",
				s1r4f1: "",
				s1r4f2: "",
				s1r5f1: "",
				s1r6f1: "",
				s1r6f2: "",

				// section 2
				s2r1f1: "",
				s2r1f2: "",
				s2r1f3: "",
				s2r2f1: "",
				s2r3f1: "",
				s2r4f1: "",
				s2r4f2: "",
				s2r5f1: "",
				s2r6f1: "",
				s2r6f2: "",

				side: "",

				admission: "",
				casting: "",
				fitting: "",
				delivery: "",
				replace: "",
				followup: "",

				so: false,
				sewho: false,
				ewho: false,
				eo: false,
				who: false,

				volumeChange: false,
				volumeChangeOther: false,
				componentsBreakdown: false,
				alignmentProblem: false,
				growth: false,
				accident: false,
				falseInfo: false,
				wear: false,
				stolenLost: false,

				unknown1: false,
				unknown2: false,
				unknown3: false,

				unknown4: false,
				unknown5: false,
				unknown6: false,

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

			so: "S.O",
			sewho: "S.E.W.H.O",
			ewho: "E.W.H.O",
			eo: "E.O",
			who: "W.H.O",

			volumeChange: "01 Volume Change",
			volumeChangeOther: "02 Volume Change + Other",
			componentsBreakdown: "03 Components breakdown",
			alignmentProblem: "04 Alignment problem",
			growth: "05 Growth",
			accident: "06 Accident",
			falseInfo: "07 False Info",
			wear: "08 Wear",
			stolenLost: "09 Stolen/ Lost",

			unknown1: "-",
			unknown2: "-",
			unknown3: "-",

			unknown4: "-",
			unknown5: "-",
			unknown6: "-",

			conventional: "01 Conventional",
			plastic: "02 Plastic",
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
				</Row>
				{triggerAction}
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ULOForm);

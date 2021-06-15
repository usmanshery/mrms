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

class ULO2Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				// section 1
				s1r1f1: "",
				s1r2f1: "",
				s1r2f2: "",
				s1r3f1: "",
				s1r3f2: "",

				// section 2
				s2r1f1: "",
				s2r1f2: "",
				s2r2f1: "",
				s2r2f2: "",

				instructions: "",

				admission: "",
				casting: "",
				fitting: "",
				delivery: "",
				replace: "",
				followup: "",

				co: false,
				ctlso: false,
				tlso: false,
				lso: false,

				volumeChange: false,
				volumeChangeOther: false,
				componentsBreakdown: false,
				alignmentProblem: false,
				growth: false,
				accident: false,
				falseInfo: false,
				wear: false,
				stolenLost: false,
			},
			// errors to show against validation
			errors: {},
			profile: props.profile,
		};

		// labels for inputs
		this.labels = {
			instructions: "Instructions",

			admission: "Admission Date",
			casting: "Casting Date",
			fitting: "Fitting Date",
			delivery: "Delivery Date",
			replace: "Replace Date",
			followup: "Follow Up Date",

			co: "C.O",
			ctlso: "C.T.L.S.O",
			tlso: "T.L.S.O",
			lso: "L.S.O",

			volumeChange: "01 Volume Change",
			volumeChangeOther: "02 Volume Change + Other",
			componentsBreakdown: "03 Components breakdown",
			alignmentProblem: "04 Alignment problem",
			growth: "05 Growth",
			accident: "06 Accident",
			falseInfo: "07 False Info",
			wear: "08 Wear",
			stolenLost: "09 Stolen/ Lost",
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
			<Container style={{ background: "white" }} className="xgreenBackground">
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

				{verticalSpacer(20)}
				{triggerAction}
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ULO2Form);

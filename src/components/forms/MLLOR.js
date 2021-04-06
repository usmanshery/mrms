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

class LLORForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				repairN: "",
				repairDate: "",
				orthosisN: "",
				deliveryDate: "",

				ho: false,
				fo: false,
				hkafo: false,
				shoe: false,
				kafo: false,
				so: false,
				ko: false,
				co: false,
				afo: false,

				AJjointReplaced: false,
				AJaxisBoldReplaced: false,
				AJnutClipReplaced: false,
				AJwasherReplaced: false,
				springReplaced: false,

				KJjointReplaced: false,
				KJaxisBoldReplaced: false,
				KJnutClipReplaced: false,
				KJwasherReplaced: false,
				bearingReplaced: false,
				lockMechReplaced: false,

				HJjointReplaced: false,
				HJaxisBoldReplaced: false,
				HJnutClipReplaced: false,
				HJwasherReplaced: false,

				strapsReplaced: false,
				kneeCapReplaced: false,
				kneeCapRepaired: false,

				sideBarsReplaced: false,
				sideBarsRepaired: false,
				leatherReplaced: false,
				rivetsReplaced: false,

				remarks: "",
			},
			// errors to show against validation
			errors: {},
			profile: props.profile,
		};

		// labels for inputs
		this.labels = {
			repairN: "Repair N°",
			repairDate: "Repair Date",
			orthosisN: "Orthosis N°",
			deliveryDate: "Delivery Date",

			ho: "H.O",
			fo: "F.O",
			so: "S.O",
			ko: "K.O",
			co: "C.O",
			shoe: "Shoe",
			hkafo: "H.K.A.F.O",
			kafo: "K.A.F.O",
			afo: "A.F.O",

			AJjointReplaced: "01 Joint Replaced",
			AJaxisBoldReplaced: "02 Axis /Bolt Replaced",
			AJnutClipReplaced: "03 Nut /Clip Replaced",
			AJwasherReplaced: "04 Washer Replaced",
			springReplaced: "05 Spring Replaced",

			KJjointReplaced: "01 Joint Replaced",
			KJaxisBoldReplaced: "02 Axis /Bolt Replaced",
			KJnutClipReplaced: "03 Nut /Clip Replaced",
			KJwasherReplaced: "04 Washer Replaced",
			bearingReplaced: "05 Bearing Replaced",
			lockMechReplaced: "06 Lock Mech Replaced",

			HJjointReplaced: "01 Joint Replaced",
			HJaxisBoldReplaced: "02 Axis /Bolt Replaced",
			HJnutClipReplaced: "03 Nut /Clip Replaced",
			HJwasherReplaced: "04 Washer Replaced",

			strapsReplaced: "01 Straps Replaced",
			kneeCapReplaced: "02 Knee cap Replaced",
			kneeCapRepaired: "03 Knee cap Repaired",

			sideBarsReplaced: "01 Side Bars Replaced",
			sideBarsRepaired: "02 Side Bars Repaired",
			leatherReplaced: "03 Leather Replaced",
			rivetsReplaced: "04 Rivets Replaced",

			remarks: "Remarks",
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
			<Container style={{ background: "white" }}>
				{/* 4 fields on top */}
				<Row>
					<Col className="col-3">
						<TextField
							label={this.labels.repairN}
							value={this.state.form.repairN}
							onChange={(event) => this.setFormValue("repairN", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							label={this.labels.repairDate}
							value={this.state.form.repairDate}
							onChange={(event) => this.setFormValue("repairDate", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							label={this.labels.orthosisN}
							value={this.state.form.orthosisN}
							onChange={(event) => this.setFormValue("orthosisN", event.target.value)}
							variant="outlined"
						/>
					</Col>
					<Col className="col-3">
						<TextField
							label={this.labels.deliveryDate}
							value={this.state.form.deliveryDate}
							onChange={(event) => this.setFormValue("deliveryDate", event.target.value)}
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
					<Col className="col-3 checkboxSection">
						<h5>Knee Joint</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>Ankle Joint</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>Hip Joint</h5>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-1 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.ho} onClick={(event) => this.setFormValue("ho", event.target.checked)} />}
							label={this.labels.ho}
						/>
					</Col>
					<Col className="col-2 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.afo} onClick={(event) => this.setFormValue("afo", event.target.checked)} />}
							label={this.labels.afo}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.KJjointReplaced} onClick={(event) => this.setFormValue("KJjointReplaced", event.target.checked)} />}
							label={this.labels.KJjointReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.AJjointReplaced} onClick={(event) => this.setFormValue("AJjointReplaced", event.target.checked)} />}
							label={this.labels.AJjointReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.HJjointReplaced} onClick={(event) => this.setFormValue("HJjointReplaced", event.target.checked)} />}
							label={this.labels.HJjointReplaced}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-1 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.fo} onClick={(event) => this.setFormValue("fo", event.target.checked)} />}
							label={this.labels.fo}
						/>
					</Col>
					<Col className="col-2 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.kafo} onClick={(event) => this.setFormValue("kafo", event.target.checked)} />}
							label={this.labels.kafo}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.KJaxisBoldReplaced} onClick={(event) => this.setFormValue("KJaxisBoldReplaced", event.target.checked)} />}
							label={this.labels.KJaxisBoldReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.AJaxisBoldReplaced} onClick={(event) => this.setFormValue("AJaxisBoldReplaced", event.target.checked)} />}
							label={this.labels.AJaxisBoldReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.HJaxisBoldReplaced} onClick={(event) => this.setFormValue("HJaxisBoldReplaced", event.target.checked)} />}
							label={this.labels.HJaxisBoldReplaced}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-1 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.so} onClick={(event) => this.setFormValue("so", event.target.checked)} />}
							label={this.labels.so}
						/>
					</Col>
					<Col className="col-2 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.hkafo} onClick={(event) => this.setFormValue("hkafo", event.target.checked)} />}
							label={this.labels.hkafo}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.KJnutClipReplaced} onClick={(event) => this.setFormValue("KJnutClipReplaced", event.target.checked)} />}
							label={this.labels.KJnutClipReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.AJnutClipReplaced} onClick={(event) => this.setFormValue("AJnutClipReplaced", event.target.checked)} />}
							label={this.labels.AJnutClipReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.HJnutClipReplaced} onClick={(event) => this.setFormValue("HJnutClipReplaced", event.target.checked)} />}
							label={this.labels.HJnutClipReplaced}
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
							control={<Checkbox checked={this.state.form.KJwasherReplaced} onClick={(event) => this.setFormValue("KJwasherReplaced", event.target.checked)} />}
							label={this.labels.KJwasherReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.AJwasherReplaced} onClick={(event) => this.setFormValue("AJwasherReplaced", event.target.checked)} />}
							label={this.labels.AJwasherReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.HJwasherReplaced} onClick={(event) => this.setFormValue("HJwasherReplaced", event.target.checked)} />}
							label={this.labels.HJwasherReplaced}
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
							control={<Checkbox checked={this.state.form.bearingReplaced} onClick={(event) => this.setFormValue("bearingReplaced", event.target.checked)} />}
							label={this.labels.bearingReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.springReplaced} onClick={(event) => this.setFormValue("springReplaced", event.target.checked)} />}
							label={this.labels.springReplaced}
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
							control={<Checkbox checked={this.state.form.lockMechReplaced} onClick={(event) => this.setFormValue("lockMechReplaced", event.target.checked)} />}
							label={this.labels.lockMechReplaced}
						/>
					</Col>
				</Row>
				{/* Set 1 random */}
				<Row>
					<Col className="col-3 checkboxSection">
						<h5>Other Repairs</h5>
					</Col>
					<Col className="col-3 checkboxSection">
						<h5>Suspension</h5>
					</Col>
					<Col className="col-6 checkboxSection">
						<TextField
							label={this.labels.remarks}
							value={this.state.form.remarks}
							onChange={(event) => this.setFormValue("remarks", event.target.value)}
							multiline
							rows={5}
							style={{ width: "100%" }}
							variant="outlined"
						/>
					</Col>
				</Row>
				{verticalSpacer(20)}
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.sideBarsReplaced} onClick={(event) => this.setFormValue("sideBarsReplaced", event.target.checked)} />}
							label={this.labels.sideBarsReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.strapsReplaced} onClick={(event) => this.setFormValue("strapsReplaced", event.target.checked)} />}
							label={this.labels.strapsReplaced}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.sideBarsRepaired} onClick={(event) => this.setFormValue("sideBarsRepaired", event.target.checked)} />}
							label={this.labels.sideBarsRepaired}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.kneeCapReplaced} onClick={(event) => this.setFormValue("kneeCapReplaced", event.target.checked)} />}
							label={this.labels.kneeCapReplaced}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.leatherReplaced} onClick={(event) => this.setFormValue("leatherReplaced", event.target.checked)} />}
							label={this.labels.leatherReplaced}
						/>
					</Col>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.kneeCapRepaired} onClick={(event) => this.setFormValue("kneeCapRepaired", event.target.checked)} />}
							label={this.labels.kneeCapRepaired}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="col-3 checkboxSection">
						<FormControlLabel
							control={<Checkbox checked={this.state.form.rivetsReplaced} onClick={(event) => this.setFormValue("rivetsReplaced", event.target.checked)} />}
							label={this.labels.rivetsReplaced}
						/>
					</Col>
				</Row>
				{verticalSpacer(10)}
				<Row>{triggerAction}</Row>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LLORForm);

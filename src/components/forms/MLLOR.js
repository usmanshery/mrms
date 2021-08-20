import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControlLabel, Checkbox, Toolbar, Typography } from "@material-ui/core";
import { LLORFormBooleanFields, defaultLLORFormValues, defaultLLORLableValues } from "../../store/misc/formValues";
import { verticalSpacer } from "../../store/misc/global";
import { Container, Row, Col } from "react-bootstrap";

import { navModules } from "../../store/actions/Navigation";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;

	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			formValues: state.patientModule.activeCase[state.patientModule.activeCase.category].LLOR,
		};
	}

	if (state.activeModule === navModules.admin) {
		console.log(state.adminModule);
		return {
			readOnly,
			formValues: state.adminModule.activeCase.LLOR,
		};
	}
	if (state.activeModule === navModules.casting || state.activeModule === navModules.modification || state.activeModule === navModules.fitting) {
		return {
			readOnly,
			formValues: state.stationModule.activeCase.LLOR,
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

class LLORForm extends Component {
	constructor(props) {
		super(props);

		let activeCaseData = { ...defaultLLORFormValues, ...this.props.formValues };

		// clean boolean values
		for (var key in activeCaseData) {
			if (activeCaseData.hasOwnProperty(key)) {
				if (LLORFormBooleanFields.includes(key)) {
					activeCaseData[key] = activeCaseData[key] === "true";
				}
			}
		}

		// initialize the state
		this.state = {
			form: activeCaseData,
		};

		// labels for inputs
		this.labels = { ...defaultLLORLableValues };

		this.setFormValue = this.setFormValue.bind(this);
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) return;
		this.props.setFormValue("LLOR", { [ref]: value }, true);

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
							{"LLOR Measurement Form"}
						</Typography>
					</Toolbar>
				</Row>
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
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LLORForm);

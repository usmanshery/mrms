import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, FormControlLabel, Checkbox, Toolbar, Typography } from "@material-ui/core";
import { LLPRFormBooleanFields, defaultLLPRFormValues, defaultLLPRLableValues } from "../../store/misc/formValues";
import { verticalSpacer } from "../../store/misc/global";
import { Container, Row, Col } from "react-bootstrap";

import { navModules } from "../../store/actions/Navigation";

const mapStateToProps = (state, props) => {
	// refine behavioral props here
	let readOnly = props.readOnly === undefined ? false : props.readOnly;

	if (state.activeModule === navModules.patient) {
		return {
			readOnly,
			formValues: state.patientModule.activeCase[state.patientModule.activeCase.category].LLPR,
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

class LLPRForm extends Component {
	constructor(props) {
		super(props);

		let activeCaseData = { ...defaultLLPRFormValues, ...this.props.formValues };

		// clean boolean values
		for (var key in activeCaseData) {
			if (activeCaseData.hasOwnProperty(key)) {
				if (LLPRFormBooleanFields.includes(key)) {
					activeCaseData[key] = activeCaseData[key] === "true";
				}
			}
		}

		// initialize the state
		this.state = {
			form: activeCaseData,
		};

		// labels for inputs
		this.labels = { ...defaultLLPRLableValues };

		this.setFormValue = this.setFormValue.bind(this);
	}

	setFormValue(ref, value) {
		if (this.props.readOnly) return;
		this.props.setFormValue("LLPR", { [ref]: value }, true);

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
							{"LLPR Measurement Form"}
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
							label={this.labels.prosthesisN}
							value={this.state.form.prosthesisN}
							onChange={(event) => this.setFormValue("prosthesisN", event.target.value)}
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

				{/* Foot, Socket, Suspension, Cosmetic */}
				<Row>
					<Col className="col-3" style={{ padding: "0px" }}>
						<Container>
							<Row>
								<Col className="checkboxSection">
									<h5>Prosthesis Type</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.hd} onClick={(event) => this.setFormValue("hd", event.target.checked)} />}
										label={this.labels.hd}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.tt} onClick={(event) => this.setFormValue("tt", event.target.checked)} />}
										label={this.labels.tt}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.tf} onClick={(event) => this.setFormValue("tf", event.target.checked)} />}
										label={this.labels.tf}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.ta} onClick={(event) => this.setFormValue("ta", event.target.checked)} />}
										label={this.labels.ta}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.pffd} onClick={(event) => this.setFormValue("pffd", event.target.checked)} />}
										label={this.labels.pffd}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.pf} onClick={(event) => this.setFormValue("pf", event.target.checked)} />}
										label={this.labels.pf}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.kd} onClick={(event) => this.setFormValue("kd", event.target.checked)} />}
										label={this.labels.kd}
									/>
								</Col>
							</Row>
						</Container>
					</Col>

					<Col className="col-3" style={{ padding: "0px" }}>
						<Container>
							{/* Set 2 random */}
							<Row>
								<Col className="checkboxSection">
									<h5>Foot</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.wornOut} onClick={(event) => this.setFormValue("wornOut", event.target.checked)} />}
										label={this.labels.wornOut}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.forefootBroken} onClick={(event) => this.setFormValue("forefootBroken", event.target.checked)} />}
										label={this.labels.forefootBroken}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.soleCrack} onClick={(event) => this.setFormValue("soleCrack", event.target.checked)} />}
										label={this.labels.soleCrack}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.looseningKeel} onClick={(event) => this.setFormValue("looseningKeel", event.target.checked)} />}
										label={this.labels.looseningKeel}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.keelBroken} onClick={(event) => this.setFormValue("keelBroken", event.target.checked)} />}
										label={this.labels.keelBroken}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.footNoise} onClick={(event) => this.setFormValue("footNoise", event.target.checked)} />}
										label={this.labels.footNoise}
									/>
								</Col>
							</Row>
						</Container>
					</Col>

					<Col className="col-3" style={{ padding: "0px" }}>
						<Container>
							<Row>
								<Col className="checkboxSection">
									<h5>Socket</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.socketRepair} onClick={(event) => this.setFormValue("socketRepair", event.target.checked)} />}
										label={this.labels.socketRepair}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.socketReplaced} onClick={(event) => this.setFormValue("socketReplaced", event.target.checked)} />}
										label={this.labels.socketReplaced}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.weldingSeamRepair} onClick={(event) => this.setFormValue("weldingSeamRepair", event.target.checked)} />}
										label={this.labels.weldingSeamRepair}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.softSocketRepair} onClick={(event) => this.setFormValue("softSocketRepair", event.target.checked)} />}
										label={this.labels.softSocketRepair}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.softSocketReplaced} onClick={(event) => this.setFormValue("softSocketReplaced", event.target.checked)} />}
										label={this.labels.softSocketReplaced}
									/>
								</Col>
							</Row>
						</Container>
					</Col>

					<Col className="col-3" style={{ padding: "0px" }}>
						<Container>
							<Row>
								<Col className="checkboxSection">
									<h5>Suspension</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.strapRepaired} onClick={(event) => this.setFormValue("strapRepaired", event.target.checked)} />}
										label={this.labels.strapRepaired}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.strapReplaced} onClick={(event) => this.setFormValue("strapReplaced", event.target.checked)} />}
										label={this.labels.strapReplaced}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.strapRepaired8} onClick={(event) => this.setFormValue("strapRepaired8", event.target.checked)} />}
										label={this.labels.strapRepaired8}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.strapReplaced8} onClick={(event) => this.setFormValue("strapReplaced8", event.target.checked)} />}
										label={this.labels.strapReplaced8}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.kneelBroken} onClick={(event) => this.setFormValue("kneelBroken", event.target.checked)} />}
										label={this.labels.kneelBroken}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={
											<Checkbox checked={this.state.form.silesianBeltRepaired} onClick={(event) => this.setFormValue("silesianBeltRepaired", event.target.checked)} />
										}
										label={this.labels.silesianBeltRepaired}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={
											<Checkbox checked={this.state.form.silesianBeltReplaced} onClick={(event) => this.setFormValue("silesianBeltReplaced", event.target.checked)} />
										}
										label={this.labels.silesianBeltReplaced}
									/>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>

				{/* Alignment, knee joint */}
				<Row>
					<Col className="col-6" style={{ padding: "0px" }}>
						<Container>
							{/* Set 1 random */}
							<Row>
								<Col className="checkboxSection">
									<h5>Alignment System</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.TFSocketCup} onClick={(event) => this.setFormValue("TFSocketCup", event.target.checked)} />}
										label={this.labels.TFSocketCup}
									/>
								</Col>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.concaveCylinder} onClick={(event) => this.setFormValue("concaveCylinder", event.target.checked)} />}
										label={this.labels.concaveCylinder}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.convexDisc} onClick={(event) => this.setFormValue("convexDisc", event.target.checked)} />}
										label={this.labels.convexDisc}
									/>
								</Col>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.ankleConvexDisc} onClick={(event) => this.setFormValue("ankleConvexDisc", event.target.checked)} />}
										label={this.labels.ankleConvexDisc}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={
											<Checkbox checked={this.state.form.conicalExtensionCup} onClick={(event) => this.setFormValue("conicalExtensionCup", event.target.checked)} />
										}
										label={this.labels.conicalExtensionCup}
									/>
								</Col>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.ankleConcaveDisc} onClick={(event) => this.setFormValue("ankleConcaveDisc", event.target.checked)} />}
										label={this.labels.ankleConcaveDisc}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.socketCup} onClick={(event) => this.setFormValue("socketCup", event.target.checked)} />}
										label={this.labels.socketCup}
									/>
								</Col>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.ankleBolt} onClick={(event) => this.setFormValue("ankleBolt", event.target.checked)} />}
										label={this.labels.ankleBolt}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.socketBolt} onClick={(event) => this.setFormValue("socketBolt", event.target.checked)} />}
										label={this.labels.socketBolt}
									/>
								</Col>
							</Row>
						</Container>
					</Col>

					<Col className="col-6" style={{ padding: "0px" }}>
						<Container>
							{/* Set 1 random */}
							<Row>
								<Col className="checkboxSection">
									<h5>Knee Joint</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.completeKnee} onClick={(event) => this.setFormValue("completeKnee", event.target.checked)} />}
										label={this.labels.completeKnee}
									/>
								</Col>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.frictionWashers} onClick={(event) => this.setFormValue("frictionWashers", event.target.checked)} />}
										label={this.labels.frictionWashers}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.kneeShell} onClick={(event) => this.setFormValue("kneeShell", event.target.checked)} />}
										label={this.labels.kneeShell}
									/>
								</Col>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.calfPipe} onClick={(event) => this.setFormValue("calfPipe", event.target.checked)} />}
										label={this.labels.calfPipe}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.kneeAxis} onClick={(event) => this.setFormValue("kneeAxis", event.target.checked)} />}
										label={this.labels.kneeAxis}
									/>
								</Col>
								<Col className="col-6 checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.securingBoltsM66} onClick={(event) => this.setFormValue("securingBoltsM66", event.target.checked)} />}
										label={this.labels.securingBoltsM66}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.kneeAxisBolt} onClick={(event) => this.setFormValue("kneeAxisBolt", event.target.checked)} />}
										label={this.labels.kneeAxisBolt}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.kneeLockPP} onClick={(event) => this.setFormValue("kneeLockPP", event.target.checked)} />}
										label={this.labels.kneeLockPP}
									/>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>

				{/* Supplier, other repairs*/}
				<Row>
					<Col className="col-3" style={{ padding: "0px" }}>
						<Container>
							<Row>
								<Col className="checkboxSection">
									<h5>Cosmetic</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.PPRepair} onClick={(event) => this.setFormValue("PPRepair", event.target.checked)} />}
										label={this.labels.PPRepair}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.PPReplacement} onClick={(event) => this.setFormValue("PPReplacement", event.target.checked)} />}
										label={this.labels.PPReplacement}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.EVARepair} onClick={(event) => this.setFormValue("EVARepair", event.target.checked)} />}
										label={this.labels.EVARepair}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.EVAReplacement} onClick={(event) => this.setFormValue("EVAReplacement", event.target.checked)} />}
										label={this.labels.EVAReplacement}
									/>
								</Col>
							</Row>
						</Container>
					</Col>

					<Col className="col-3" style={{ padding: "0px" }}>
						<Container>
							{/* Set 1 random */}
							<Row>
								<Col className="checkboxSection">
									<h5>Supplier</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.ICRC} onClick={(event) => this.setFormValue("ICRC", event.target.checked)} />}
										label={this.labels.ICRC}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.CRE} onClick={(event) => this.setFormValue("CRE", event.target.checked)} />}
										label={this.labels.CRE}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.unknown3} onClick={(event) => this.setFormValue("unknown3", event.target.checked)} />}
										label={this.labels.unknown3}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.unknown4} onClick={(event) => this.setFormValue("unknown4", event.target.checked)} />}
										label={this.labels.unknown4}
									/>
								</Col>
							</Row>
						</Container>
					</Col>

					<Col className="col-3" style={{ padding: "0px" }}>
						<Container>
							<Row>
								<Col className="checkboxSection">
									<h5>Other Repair</h5>
								</Col>
							</Row>
							{verticalSpacer(20)}
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.rivets} onClick={(event) => this.setFormValue("rivets", event.target.checked)} />}
										label={this.labels.rivets}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.extensionSupport} onClick={(event) => this.setFormValue("extensionSupport", event.target.checked)} />}
										label={this.labels.extensionSupport}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.kickStrap} onClick={(event) => this.setFormValue("kickStrap", event.target.checked)} />}
										label={this.labels.kickStrap}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.cables} onClick={(event) => this.setFormValue("cables", event.target.checked)} />}
										label={this.labels.cables}
									/>
								</Col>
							</Row>
							<Row>
								<Col className="checkboxSection">
									<FormControlLabel
										control={<Checkbox checked={this.state.form.spring} onClick={(event) => this.setFormValue("spring", event.target.checked)} />}
										label={this.labels.spring}
									/>
								</Col>
							</Row>
						</Container>
					</Col>

					{/* Set 3 random */}
					<Col className="checkboxSection">
						<TextField
							label={this.labels.remarks}
							value={this.state.form.remarks}
							onChange={(event) => this.setFormValue("remarks", event.target.value)}
							multiline
							rows={7}
							style={{ width: "100%" }}
							variant="outlined"
						/>
					</Col>
				</Row>

			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LLPRForm);

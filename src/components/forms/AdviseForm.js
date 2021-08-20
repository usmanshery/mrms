import React, { Component } from "react";
import { connect } from "react-redux";

import { registerPatientAction, updatePatientAction } from "../../store/actions/Patient";

import { defaultAdviseFormLabelValues, defaultAdviseFormValues, tableActions } from "../../store/misc/formValues";
import { navModules } from "../../store/actions/Navigation";

import { withStyles } from "@material-ui/core/styles";
import { TextField, Accordion, AccordionSummary, AccordionDetails, Fab, FormControlLabel, Switch, Button } from "@material-ui/core";
// import {DeleteIcon} from '@material-ui/icons';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

// import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
// import ProfileImage from "@daym3l/react-profile-image";
import { Container, Row, Col, Table } from "react-bootstrap";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const mapStateToProps = (state, props) => {
	let admin = state.activeModule === navModules.admin;
	// let readOnly = props.readOnly === undefined ? false : props.readOnly;
	// if regular patient component, extract data from patient module
	let personalDetails = { id: "n/a", name: "n/a", rank: "n/a", unit: "n/a" };
	let formValues = {};

	if (state.activeModule === navModules.patient) {
		if (state.patientModule.activePatientData) {
			personalDetails = {
				id: state.patientModule.activePatientData._id,
				name: state.patientModule.activePatientData.name,
				rank: state.patientModule.activePatientData.rank === null ? "n/a" : state.patientModule.activePatientData.rank,
				unit: state.patientModule.activePatientData.unit === "" ? "n/a" : state.patientModule.activePatientData.unit,
			};
		}
		formValues = state.patientModule.activeCase[state.patientModule.activeCase.category].adviseForm;
	}
	if (state.activeModule === navModules.admin) {
		personalDetails = {
			id: state.adminModule.activeCase.personalDetails.id,
			name: state.adminModule.activeCase.personalDetails.name,
			rank: state.adminModule.activeCase.personalDetails.rank === null ? "n/a" : state.adminModule.activeCase.personalDetails.rank,
			unit: state.adminModule.activeCase.personalDetails.unit === "" ? "n/a" : state.adminModule.activeCase.personalDetails.unit,
		};
		formValues = state.adminModule.activeCase.adviseForm;
	}
	/*
		only need personal details and form related fields,
	*/

	return {
		admin,
		personalDetails,
		formValues,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerPatientProfile: (profile) => dispatch(registerPatientAction(profile)),
		updatePatientProfile: (patientId, profile) => dispatch(updatePatientAction(patientId, profile)),
	};
};

const customStyles = (theme) => ({
	removeLowerMargin: { "& div": { marginBottom: "0px !important" } },
	removeUpperMargin: { "& div": { marginTop: "0px !important" } },
	titleHBold: { fontSize: "1.7rem", fontWeight: "bold" },
	textLeft: { textAlign: "left" },
	fontRed: { color: "red" },
	fullWidth: { width: "100%" },
	textFieldWidthLong: { width: "500px" },
	textFieldWidthMedium: { width: "300px" },
	textFieldWidthSmall: { width: "100px" },
	textFieldWidthShort: { width: "50px" },
	paraSet: { textAlign: "left", marginBottom: "0px" },
	noWrap: { whiteSpace: "nowrap" },
});

class AdviceForm extends Component {
	/*
		Props for behavior:
		[x] - readOnly | bool (false) | if set true, form value change will not be triggered
		[->] replaced in the favor of special attribute <admin>
	*/

	constructor(props) {
		super(props);
		this.setFormValue = this.setFormValue.bind(this);

		// labels for inputs
		this.labels = { ...defaultAdviseFormLabelValues };

		// special case: items array json string to array
		let items = this.props.formValues.items ? JSON.parse(this.props.formValues.items) : [];
		this.state = {
			form: {
				...defaultAdviseFormValues,
				...this.props.formValues,
				items,
				...this.props.personalDetails,
			},
		};
	}

	setFormValue(ref, value) {
		if (!this.props.admin && ref !== "followup") return;

		// special case issue: store json of items
		if (ref === "items") {
			this.props.setFormValue("adviseForm", { [ref]: JSON.stringify(value) }, true);
		} else {
			this.props.setFormValue("adviseForm", { [ref]: value }, true);
		}

		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
		});
	}

	// table related
	updateTableRow(action, i, key, event) {
		var items = this.state.form.items;
		// add action
		if (action === tableActions.add) {
			// if user adds another row without editing the given dummy first row, make sure to append that row as edited empty row
			if (items.length === 0) {
				items.push({
					nomenclature: "",
					qty: undefined,
					cost: undefined,
				});
			}
			// add new row
			items.push({
				nomenclature: "",
				qty: undefined,
				cost: undefined,
			});
		}
		// updating the row
		if (action === tableActions.update) {
			if (items.length === 0) {
				items.push({
					nomenclature: "",
					qty: undefined,
					cost: undefined,
				});
			}
			items[i][key] = event.target.value;
		}
		// delete the row
		if (action === tableActions.delete) {
			if (items.length === 0) return;
			items.splice(i, 1);
		}

		this.setFormValue("items", items);
	}

	render() {
		var renderRows = () => {
			var context = this;
			var items = this.state.form.items;
			if (items.length === 0) {
				items.push({
					nomenclature: "",
					qty: "",
					cost: "",
				});
			}

			return items.map(function (o, i) {
				return (
					<tr key={"item-" + i}>
						<td style={{ textAlign: "left" }}>{String.fromCharCode(97 + i)}</td>
						<td>
							<div style={{ display: "flex" }}>
								<TextField
									className={context.props.classes.fullWidth}
									value={o.nomenclature}
									onChange={context.updateTableRow.bind(context, tableActions.update, i, "nomenclature")}
								></TextField>
							</div>
						</td>
						<td>
							<TextField
								className={context.props.classes.textFieldWidthShort}
								type="number"
								value={o.qty}
								onChange={context.updateTableRow.bind(context, tableActions.update, i, "qty")}
							></TextField>
						</td>
						<td>
							<TextField
								className={context.props.classes.textFieldWidthSmall}
								type="number"
								value={o.cost}
								onChange={context.updateTableRow.bind(context, tableActions.update, i, "cost")}
							></TextField>
						</td>
						<td>
							<Fab color="secondary" size="small" onClick={context.updateTableRow.bind(context, tableActions.delete, i)}>
								<DeleteIcon fontSize="small" />
							</Fab>
							{context.state.form.items.length === i + 1 ? (
								<Fab color="primary" size="small" onClick={context.updateTableRow.bind(context, tableActions.add)}>
									<AddIcon fontSize="small" />
								</Fab>
							) : undefined}
						</td>
					</tr>
				);
			});
		};

		return (
			<div ref={(el) => (this.componentRef = el)}>
				<Accordion expanded>
					<AccordionSummary className={this.props.classes.removeLowerMargin}>
						<Typography className={this.props.classes.titleHBold} variant="h5">
							{"Advice Form"}
						</Typography>
					</AccordionSummary>
					<AccordionSummary className={this.props.classes.removeUpperMargin}>
						<Typography variant="h5">{!this.props.followUp ? "Primary Case" : "Follow Up Case"}</Typography>
					</AccordionSummary>
					<AccordionDetails className="formTopline">
						<Container>
							<Row className="d-flex justify-content-between">
								<Col className="d-inline-flex flex-grow-0">
									<div className={this.props.classes.noWrap}>
										<FormControlLabel
											control={<Switch checked={this.state.form.followup} onChange={(event) => this.setFormValue("followup", event.target.checked)} />}
											label={this.labels.followup}
										/>
									</div>
								</Col>
								<Col className="d-flex flex-column">
									<h5>Summary For Issuance of Artificial Limbs (Prostheses)</h5>
								</Col>
								<Col className="d-inline-flex flex-grow-0">
									<div></div>
								</Col>
							</Row>
							<Row>
								<hr style={{ width: "100%" }} />
							</Row>
							<Row>
								<Col className="col-3">
									<TextField className={"fullWidth"} label={this.labels.id} value={this.state.form.id} variant="standard" contentEditable={false} />
								</Col>
								<Col className="col-5">
									<TextField className={"fullWidth"} label={this.labels.name} value={this.state.form.name} variant="standard" contentEditable={false} />
								</Col>
								<Col className="col-2">
									<TextField className={"fullWidth"} label={this.labels.rank} value={this.state.form.rank} variant="standard" contentEditable={false} />
								</Col>
								<Col className="col-2">
									<TextField className={"fullWidth"} label={this.labels.unit} value={this.state.form.unit} variant="standard" contentEditable={false} />
								</Col>
							</Row>
							<Row>
								<hr style={{ width: "100%" }} />
							</Row>
							<Row>
								<Col>
									{this.state.form.followup ? (
										<p className={this.props.classes.textLeft}>
											He is a follow up case of{" "}
											<TextField
												className={this.props.classes.textFieldWidthLong}
												onChange={(event) => this.setFormValue("case", event.target.value)}
												color="secondary"
												size="small"
												value={this.state.form.case}
											></TextField>
											. In order to rehabilitate the patient, he needs <b>replacement</b> of following <b>item / items</b> from artificial limbs and appliances centre
											(ALAC) after sanction from the competent authority. And more text follows the stream
										</p>
									) : (
										<p className={this.props.classes.textLeft}>
											He is a case of{" "}
											<TextField
												className={this.props.classes.textFieldWidthLong}
												onChange={(event) => this.setFormValue("case", event.target.value)}
												color="secondary"
												size="small"
												value={this.state.form.case}
											></TextField>
											, due to{" "}
											<TextField
												className={this.props.classes.textFieldWidthMedium}
												onChange={(event) => this.setFormValue("cause", event.target.value)}
												color="secondary"
												size="small"
												value={this.state.form.cause}
											></TextField>
											. Presently his residual limb is healthy with healed scars. There is no discharge or tender point. The scar is not adherent to underlying bone. Range
											of motion
											<TextField
												onChange={(event) => this.setFormValue("rangeOfMotion", event.target.value)}
												color="secondary"
												size="small"
												value={this.state.form.rangeOfMotion}
											></TextField>{" "}
											is within normal limits and the residual limb is ready for prosthetic rehabilitation. In order to rehabilitate the patient, he needs following items
											from artificial limbs &amp; appliances center (ALAC) after sanction from competent authority.
										</p>
									)}
								</Col>
							</Row>
							<Row>
								<hr style={{ width: "100%" }} />
							</Row>
							<Row>
								<Col>
									{/* variant="dark" */}
									<Table size="sm" striped bordered hover>
										<table className={this.props.classes.fullWidth}>
											<thead>
												<tr>
													<th>S/No</th>
													<th>Nomenclature</th>
													<th>Qty</th>
													<th>Approx Cost</th>
												</tr>
											</thead>
											<tbody>{renderRows()}</tbody>
										</table>
									</Table>
								</Col>
							</Row>
							<Row>
								<hr style={{ width: "100%" }} />
							</Row>
							<Row>
								<Col className="col-4">
									<p className={this.props.classes.paraSet}>Sig ______________________________________</p>
								</Col>
								<Col className="offset-4 col-4">
									<p className={this.props.classes.paraSet}>Sig ______________________________________</p>
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<p className={this.props.classes.paraSet}>Resident Rehab Medicine</p>
								</Col>
								<Col className="offset-5 col-3">
									<p className={this.props.classes.paraSet}>Cl Spec Rehab Medicine</p>
								</Col>
							</Row>
							<Row>
								<Col className="col-2">
									<p className={this.props.classes.paraSet}>AFIRM Rwp</p>
								</Col>
								<Col className="offset-6 col-2">
									<p className={this.props.classes.paraSet}>AFIRM Rwp</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<br></br>
								</Col>
							</Row>
							<Row>
								<Col className="col-3">
									<p className={this.props.classes.paraSet}>AF Institute of Rehab</p>
									<p className={this.props.classes.paraSet}>Medicine Rawalpindi</p>
									<p className={this.props.classes.paraSet}>Dated _____/_____/202__</p>
								</Col>
								<Col className="offset-10 col-2">
									<ReactToPrint content={() => this.componentRef}>
										<PrintContextConsumer>
											{({ handlePrint }) => (
												<Button variant="contained" color="primary" onClick={handlePrint}>
													Print
												</Button>
											)}
										</PrintContextConsumer>
									</ReactToPrint>
								</Col>
							</Row>
						</Container>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(customStyles)(AdviceForm));

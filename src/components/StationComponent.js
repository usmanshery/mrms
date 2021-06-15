import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row } from "react-bootstrap";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { loadCasesAction, loadStaffAction } from "../store/actions/Station";
import { stationPages } from "../store/actions/Navigation";

import StationCasesTable from "./tables/StationCasesTable";
import ProstheticForm from "./forms/ProstheticProfile";
import OrthoticForm from "./forms/OrthoticProfile";

import "./styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activePage: state.stationModule.activePage,
		openCases: state.stationModule.openCases,
		staff: state.stationModule.staff,
		activeCaseId: state.stationModule.activeCaseId,
		activeCaseCategory: state.stationModule.activeCaseCategory,
		callbackActions: state.stationModule.callbackActions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadCases: () => dispatch(loadCasesAction()),
		loadStaff: () => dispatch(loadStaffAction()),
	};
};

class StationComponent extends Component {
	constructor(props) {
		super(props);

		this.getOpenCases = this.getOpenCases.bind(this);
		this.getEditCase = this.getEditCase.bind(this);

		if (this.props.openCases === undefined) {
			this.props.loadCases();
		}
		if (this.props.staff === undefined) {
			this.props.loadStaff();
		}
	}

	componentDidUpdate(prevState) {
		// make it componentDidReceiveProps like
		if (this.props.openCases === undefined) {
			this.props.loadCases();
		}
		if (this.props.staff === undefined) {
			this.props.loadStaff();
		}

		// if (prevState.callbackActions === this.props.callbackActions) return;
	}

	// jsx functions
	getOpenCases() {
		return <StationCasesTable />;
	}

	getEditCase() {
		let caseForm, caseFormHeading;
		if (this.props.activeCaseId) {
			if (this.props.activeCaseCategory === "prosthetic") {
				caseForm = <ProstheticForm station />;
				caseFormHeading = "Prosthetic Case [" + this.props.activeCaseId + "]";
			}
			if (this.props.activeCaseCategory === "orthotic") {
				caseForm = <OrthoticForm station />;
				caseFormHeading = "Orthotic Case [" + this.props.activeCaseId + "]";
			}
		}
		return (
			<Accordion expanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>{caseFormHeading}</Typography>
				</AccordionSummary>
				<AccordionDetails className="formTopline">
					<Container fluid>
						{/* user details */}
						<Row>{caseForm}</Row>
					</Container>
				</AccordionDetails>
			</Accordion>
		);
	}

	// render
	render() {
		let component = <h1>Default</h1>;
		if (this.props.activePage && this.props.activePage === stationPages.list) {
			component = this.getOpenCases();
		}

		if (this.props.activePage && this.props.activePage === stationPages.activeCase) {
			component = this.getEditCase();
		}

		return <div className="rootDiv">{component}</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StationComponent);

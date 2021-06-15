import React, { Component } from "react";
import { connect } from "react-redux";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Col, Container, Row } from "react-bootstrap";

import UserSearchForm from "../forms/UserSearch";

import { registerUserAction, removeUserCbAction, searchUserAction } from "../../store/actions/User";

import "../styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activePage: state.userModule.activePage,
		activeUserId: state.userModule.activeUserId,
		activeCaseId: state.userModule.activeCaseId,
		activeUserData: state.userModule.activeUserData,
		newUserData: state.userModule.newUserData,
		callbackActions: state.userModule.callbackActions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerUserProfile: (profile) => dispatch(registerUserAction(profile)),
		removeUserCallback: (callbackAction) => dispatch(removeUserCbAction(callbackAction)),
		searchUser: (profile) => dispatch(searchUserAction(profile)),
	};
};

class PatientSearchComponent extends Component {
	constructor(props) {
		super(props);

		this.performUserSearch = this.performUserSearch.bind(this);

		this.state = {
			accordianExpanded: true,
		};

		this.toggleAccordianExpanded = () =>
			this.setState({
				accordianExpanded: !this.state.accordianExpanded,
			});
	}

	// triggers
	performUserSearch(searchParams) {
		this.props.searchUser(searchParams);
	}

	// local functions
	clearForm() {
		this.setState({
			profileFormKey: this.state.profileFormKey === "x" ? "y" : "x",
		});
	}

	// render
	render() {
		return (
			<div className="rootDiv">
				<Accordion expanded={this.state.accordianExpanded} onChange={this.toggleAccordianExpanded}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
						<Typography>Search Patients</Typography>
					</AccordionSummary>
					<AccordionDetails className="formTopline">
						<Container fluid>
							<Row>
								<Col>
									<UserSearchForm triggerName={"Search"} triggerCallback={this.performUserSearch} />
								</Col>
							</Row>
						</Container>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientSearchComponent);

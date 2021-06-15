import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row } from "react-bootstrap";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import UserForm from "./forms/UserProfile";
import UserSearchForm from "./forms/UserSearch";
import UserTable from "./tables/UserTable";

import { userModuleActions } from "../store/actions/User";

import { registerUserAction, removeUserCbAction, searchUserAction, userModuleNotifications } from "../store/actions/User";

import { userPages } from "../store/actions/Navigation";
import "./styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activePage: state.userModule.activePage,
		activeUserId: state.userModule.activeUserId,
		activeUserData: state.userModule.activeUserData,
		callbackActions: state.userModule.callbackActions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (profile) => dispatch(registerUserAction(profile)),
		removeUserCallback: (callbackAction) => dispatch(removeUserCbAction(callbackAction)),
		searchUser: (profile) => dispatch(searchUserAction(profile)),
	};
};

class UserComponent extends Component {
	constructor(props) {
		super(props);

		this.getAddUser = this.getAddUser.bind(this);
		this.getUserView = this.getUserView.bind(this);
		this.getSearch = this.getSearch.bind(this);

		this.getTestForm = this.getTestForm.bind(this);

		this.clearForm = this.clearForm.bind(this);

		// manage behaviour
		let editing = true; // by default all fields can be edited

		if (this.props.activePage === userPages.view) {
			editing = false;
		}

		this.state = {
			editing,
			profileFormKey: "x",
		};
	}

	componentDidUpdate(prevState) {
		// make it componentDidReceiveProps like
		if (prevState.callbackActions === this.props.callbackActions) return;

		if (this.props.callbackActions.includes(userModuleNotifications.regSuccess)) {
			this.props.removeUserCallback(userModuleNotifications.regSuccess);
			this.clearForm();
		}
		if (this.props.callbackActions.includes(userModuleNotifications.regFailure)) {
			this.props.removeUserCallback(userModuleNotifications.regFailure);
		}
	}

	// local functions
	clearForm() {
		this.setState({
			loadData: {},
			profileFormKey: this.state.profileFormKey === "x" ? "y" : "x",
		});
	}

	// jsx functions
	getAddUser() {
		return (
			<Accordion expanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>Add New User</Typography>
				</AccordionSummary>
				<AccordionDetails className="formTopline">
					<UserForm
						key={this.state.profileFormKey}
						action={userModuleActions.regNew}
						triggerName={this.props.activePage === userPages.add ? "Register Patient" : "Update Profile"}
						triggerCallback={this.registerNewPatient}
					/>
				</AccordionDetails>
			</Accordion>
		);
	}

	getUserView(title, readOnly = false) {
		return (
			<Accordion expanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>{title}</Typography>
				</AccordionSummary>
				<AccordionDetails className="formTopline">
					<Container fluid>
						{/* user details */}
						<Row>
							<UserForm
								title={"User Details"}
								key={this.state.profileFormKey}
								action={readOnly ? userModuleActions.viewOnly : userModuleActions.updateExisting}
								readOnly={readOnly}
							/>
						</Row>
					</Container>
				</AccordionDetails>
			</Accordion>
		);
	}

	getSearch() {
		return (
			<>
				<UserSearchForm />
				<UserTable />
			</>
		);
	}

	getTestForm() {
		return <h1>Test Form in User Module</h1>;
	}

	// render
	render() {
		let component = <h1>Default</h1>;
		if (this.props.activePage && this.props.activePage === userPages.search) {
			component = this.getSearch();
		}

		if (this.props.activePage && this.props.activePage === userPages.add) {
			component = this.getAddUser();
		}

		if (this.props.activePage && this.props.activePage === userPages.view) {
			if (!this.props.activeUserId) {
				component = <h1>No User Selected</h1>;
			} else {
				component = this.getUserView("View User", true);
			}
		}

		if (this.props.activePage && this.props.activePage === userPages.update) {
			if (!this.props.activeUserId) {
				component = <h1>No User Selected</h1>;
			} else {
				component = this.getUserView("Update User");
			}
		}

		// if (this.props.activePage && this.props.activePage === userPages.test) {
		// 	component = this.getTestForm();
		// }

		return <div className="rootDiv">{component}</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);

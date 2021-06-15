import React, { Component } from "react";
import { connect } from "react-redux";

import AdminComponent from "./AdminComponent";
import PatientComponent from "./PatientComponent";
import UserComponent from "./UserComponent";
import StationComponent from "./StationComponent";

import { navModules } from "../store/actions/Navigation";
import "./styles/MainComponent.css";

const mapStateToProps = (state) => {
	return {
		activeModule: state.activeModule,
		activePatientPage: state.patientModule.activePage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

/*
	Overall application has following functionalities
	
	- patients
	-+ register new patient and create basic profile
	-+ update profile on different levels

	- users
	-+ login, register, profile

*/

class MainComponent extends Component {
	constructor(props) {
		super(props);

		this.homeModule = this.homeModule.bind(this);
	}

	// home module
	homeModule() {
		return (
			<div>
				<h1>Welcome To ALAC Management System</h1>
			</div>
		);
	}

	render() {
		// admin module
		if (this.props.activeModule === navModules.admin) return <AdminComponent />;

		// patient module
		if (this.props.activeModule === navModules.patient) return <PatientComponent />;

		// user module
		if (this.props.activeModule === navModules.user) return <UserComponent />;

		// station module
		if (
			this.props.activeModule === navModules.casting ||
			this.props.activeModule === navModules.modification ||
			this.props.activeModule === navModules.fitting
		)
			return <StationComponent />;

		// home module (default)
		return this.homeModule();
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

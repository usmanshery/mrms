import React, { Component } from "react";
import { connect } from "react-redux";

import PatientComponent from "./PatientComponent";

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
				<h1>Home :)</h1>
			</div>
		);
	}

	render() {
		// patient module
		if (this.props.activeModule === navModules.patient) return <PatientComponent />;

		// home module (default)
		return this.homeModule();
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

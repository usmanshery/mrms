import React, { Component } from "react";
import { connect } from "react-redux";

import { Container } from "react-bootstrap";

import { loadCasesAction } from "../store/actions/Admin";
import { adminPages } from "../store/actions/Navigation";

import AdminCasesTable from "./tables/AdminCasesTable";
import PatientForm from "./forms/PatientProfile";

import "./styles/MainComponent.css";
import { patientModuleActions } from "../store/actions/Patient";
import { rowWrapper } from "../store/misc/global";
import PatientCaseDetailForm from "./forms/PatientCaseDetail";

const mapStateToProps = (state) => {
	return {
		activePage: state.adminModule.activePage,
		pendingCases: state.adminModule.pendingCases,
		activeCaseId: state.adminModule.activeCaseId,
		activeCaseCategory: state.adminModule.activeCaseCategory,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadCases: () => dispatch(loadCasesAction()),
	};
};

class AdminComponent extends Component {
	constructor(props) {
		super(props);

		this.getPendingCases = this.getPendingCases.bind(this);
		this.getEditCase = this.getEditCase.bind(this);

		if (this.props.pendingCases === undefined) {
			this.props.loadCases();
		}
	}

	componentDidUpdate(prevState) {
		// make it componentDidReceiveProps like
		if (this.props.pendingCases === undefined) {
			this.props.loadCases();
		}

		// if (prevState.callbackActions === this.props.callbackActions) return;
	}

	// jsx functions
	getPendingCases() {
		return rowWrapper(<AdminCasesTable />);
	}

	getEditCase() {
		return (
			<>
				{/* Patient Personal Detail Component */}
				{rowWrapper(<PatientForm action={patientModuleActions.updateExisting} />)}
				{/* Case Component (Active Case) */}
				{rowWrapper(<PatientCaseDetailForm />)}
			</>
		);
	}

	// render
	render() {
		let component = <h1>Default</h1>;
		if (this.props.activePage && this.props.activePage === adminPages.pendingCases) {
			component = this.getPendingCases();
		}

		if (this.props.activePage && this.props.activePage === adminPages.caseEdit) {
			component = this.getEditCase();
		}

		return (
			<div className="rootDiv">
				<Container fluid> {component}</Container>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);

import React, { Component } from "react";
import { connect } from "react-redux";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; //SubMenu

import {
	navModules,
	adminPages,
	patientPages,
	userPages,
	stationPages,
	changePatientPage,
	changeUserPage,
	changeStationPage,
} from "../../store/actions/Navigation";
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/Navigation.css";

const mapStateToProps = (state) => {
	return {
		activeModule: state.activeModule,

		activePatientPage: state.patientModule.activePage,
		activePatientId: state.patientModule.activePatientId,

		activeUserPage: state.userModule.activePage,
		activeUserId: state.userModule.activeUserId,

		activeStationPage: state.stationModule.activePage,
		activeStationCaseId: state.stationModule.activeCaseId,

		activeAdminPage: state.adminModule.activePage,
		activeAdminCaseId: state.adminModule.activeCaseId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectPatientPage: (page) => dispatch(changePatientPage(page)),
		selectUserPage: (page) => dispatch(changeUserPage(page)),
		selectStationPage: (page) => dispatch(changeStationPage(page)),
	};
};

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.adminPages = this.adminPages.bind(this);
		this.patientPages = this.patientPages.bind(this);
		this.userPages = this.userPages.bind(this);
		this.stationPages = this.stationPages.bind(this);
	}

	adminPages() {
		return Object.entries(adminPages)
			.map((pair) => {
				return { key: pair[0], value: pair[1] };
			})
			.map((pair, index) => {
				let active = true;
				if (!this.props.activeAdminCaseId && index === 1) active = false;

				return (
					<MenuItem
						id={this.props.activeAdminPage === pair.value ? "selectedlink" : undefined}
						active={active}
						className={active ? "" : "disabledLink"}
						onClick={() => this.props.selectPatientPage(pair.value)}
						key={pair.key}
					>
						{pair.value}
					</MenuItem>
				);
			});
	}

	patientPages() {
		return Object.entries(patientPages)
			.map((pair) => {
				return { key: pair[0], value: pair[1] };
			})
			.map((pair, index) => {
				let active = true;
				if (!this.props.activePatientId && (index === 2 || index === 3)) active = false;

				return (
					<MenuItem
						id={this.props.activePatientPage === pair.value ? "selectedlink" : undefined}
						active={active}
						className={active ? "" : "disabledLink"}
						onClick={() => this.props.selectPatientPage(pair.value)}
						key={pair.key}
					>
						{pair.value}
					</MenuItem>
				);
			});
	}

	userPages() {
		return Object.entries(userPages)
			.map((pair) => {
				return { key: pair[0], value: pair[1] };
			})
			.map((pair, index) => {
				let active = true;
				if (!this.props.activeUserId && (index === 2 || index === 3)) active = false;

				return (
					<MenuItem
						id={this.props.activeUserPage === pair.value ? "selectedlink" : undefined}
						active={active}
						className={active ? "" : "disabledLink"}
						onClick={() => this.props.selectUserPage(pair.value)}
						key={pair.key}
					>
						{pair.value}
					</MenuItem>
				);
			});
	}

	stationPages() {
		return Object.entries(stationPages)
			.map((pair) => {
				return { key: pair[0], value: pair[1] };
			})
			.map((pair, index) => {
				let active = true;
				if (!this.props.activeStationCaseId && index === 1) active = false;

				return (
					<MenuItem
						id={this.props.activeStationPage === pair.value ? "selectedlink" : undefined}
						active={active}
						className={active ? "" : "disabledLink"}
						onClick={() => this.props.selectStationPage(pair.value)}
						key={pair.key}
					>
						{pair.value}
					</MenuItem>
				);
			});
	}

	render() {
		let menu = undefined;
		if (this.props.activeModule === navModules.admin) {
			menu = <Menu>{this.adminPages()}</Menu>;
		}
		if (this.props.activeModule === navModules.patient) {
			menu = <Menu>{this.patientPages()}</Menu>;
		}
		if (this.props.activeModule === navModules.user) {
			menu = <Menu>{this.userPages()}</Menu>;
		}
		if (this.props.activeModule === navModules.casting || this.props.activeModule === navModules.modification || this.props.activeModule === navModules.fitting) {
			menu = <Menu>{this.stationPages()}</Menu>;
		}
		return (
			<ProSidebar style={{ position: "fixed" }} width={270}>
				{menu}
			</ProSidebar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

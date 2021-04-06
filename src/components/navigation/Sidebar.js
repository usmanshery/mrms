import React, { Component } from "react";
import { connect } from "react-redux";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; //SubMenu

import { navModules, patientPages, changePatientPage } from "../../store/actions/Navigation";
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/Navigation.css";

const mapStateToProps = (state) => {
	return {
		activeModule: state.activeModule,
		activePatientPage: state.patientModule.activePage,
		activePatientId: state.patientModule.activePatientId,
		activePatientEditable: state.patientModule.activePatientEditable,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectPatientPage: (page) => dispatch(changePatientPage(page)),
	};
};

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.patientPages = this.patientPages.bind(this);
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

	render() {
		let menu = undefined;
		if (this.props.activeModule === navModules.patient) {
			menu = <Menu>{this.patientPages()}</Menu>;
		}
		return (
			<ProSidebar style={{ position: "fixed" }} width={270}>
				{menu}
			</ProSidebar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

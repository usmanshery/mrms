import React, { Component } from "react";
import { connect } from "react-redux";

import { changeActiveModule, navModules } from "../../store/actions/Navigation";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import "../styles/Navigation.css";

const mapStateToProps = (state) => {
	return {
		activeModule: state.activeModule,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectActiveModule: (module) => dispatch(changeActiveModule(module)),
	};
};

class Navbar extends Component {
	render() {
		return (
			<AppBar position="sticky" style={{ backgroundColor: "mediumspringgreen", color: "black" }}>
				<Toolbar style={{ alignItems: "flex-end" }}>
					<div>
						<Typography variant="h4" style={{ fontWeight: "600" }} className="noselect">
							AFIRM
						</Typography>
						<Typography variant="h5" style={{ textDecoration: "overline" }} className="noselect">
							Rehibilitation Process Management System
						</Typography>
					</div>
					<div id="navbarLinksContainer">
						<Button
							style={{ color: "white", background: "black", borderRadius: "3px", padding: "3px 12px 3px 12px", fontWeight: "600" }}
							onClick={() => this.props.selectActiveModule(navModules.home)}
						>
							Home
						</Button>
						<Button
							style={{ color: "white", background: "black", borderRadius: "3px", padding: "3px 12px 3px 12px", fontWeight: "600" }}
							onClick={() => this.props.selectActiveModule(navModules.patient)}
						>
							Patients
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

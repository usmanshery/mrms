import React, { Component } from "react";
import { connect } from "react-redux";

import { changeActiveModule, navModules, toggleModal } from "../../store/actions/Navigation";

import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

import "../styles/Navigation.css";

const mapStateToProps = (state) => {
	return {
		activeModule: state.activeModule,
		loggedIn: state.loggedIn,
		loggedUserName: state.loggedIn ? state.loggedUserData.name : undefined,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectActiveModule: (module) => dispatch(changeActiveModule(module)),
		toggleLoginModal: () => dispatch(toggleModal("loginModal", true)),
	};
};

class Navbar extends Component {
	render() {
		let buttonSimple = {
			color: "white",
			background: "black",
			borderRadius: "3px",
			padding: "3px 12px 3px 12px",
			fontWeight: "600",
		};
		let buttonHighlite = {
			...buttonSimple,
			background: "#00000085",
		};

		return (
			<AppBar position="sticky" style={{ backgroundColor: "mediumspringgreen", color: "black" }}>
				<Toolbar style={{ alignItems: "flex-end" }}>
					{/* justifyContent: "space-between" */}
					<div>
						<Typography variant="h4" style={{ fontWeight: "600" }} className="noselect">
							AFIRM
						</Typography>
						<Typography variant="h5" style={{ textDecoration: "overline" }} className="noselect">
							ALAC Management System
						</Typography>
					</div>
					<div id="navbarLinksContainer">
						{this.props.loggedIn ? (
							<>
								<Button
									style={this.props.activeModule === navModules.admin ? buttonHighlite : buttonSimple}
									onClick={() => this.props.selectActiveModule(navModules.admin)}
								>
									Admin
								</Button>
								<Button
									style={this.props.activeModule === navModules.patient ? buttonHighlite : buttonSimple}
									onClick={() => this.props.selectActiveModule(navModules.patient)}
								>
									Patients
								</Button>
								<Button
									style={this.props.activeModule === navModules.user ? buttonHighlite : buttonSimple}
									onClick={() => this.props.selectActiveModule(navModules.user)}
								>
									Users
								</Button>
							</>
						) : undefined}

						<Button
							style={this.props.activeModule === navModules.casting ? buttonHighlite : buttonSimple}
							onClick={() => this.props.selectActiveModule(navModules.casting)}
						>
							Casting
						</Button>
						<Button
							style={this.props.activeModule === navModules.modification ? buttonHighlite : buttonSimple}
							onClick={() => this.props.selectActiveModule(navModules.modification)}
						>
							Modification
						</Button>
						<Button
							style={this.props.activeModule === navModules.fitting ? buttonHighlite : buttonSimple}
							onClick={() => this.props.selectActiveModule(navModules.fitting)}
						>
							Fitting
						</Button>
					</div>
					<div style={{ flexGrow: 1 }}></div>
					{this.props.loggedIn ? (
						<IconButton edge="end" onClick={this.props.login} color="inherit" size="medium">
							<AccountCircle fontSize="large" />
							{this.props.loggedUserName}
						</IconButton>
					) : (
						<Button
							// style={}
							onClick={() => this.props.toggleLoginModal()}
						>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

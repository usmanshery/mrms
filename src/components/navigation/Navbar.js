import React, { Component } from "react";
import { connect } from "react-redux";

import { changeActiveModule, navModules, toggleModal } from "../../store/actions/Navigation";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import "../styles/Navigation.css";
import { Dropdown } from "react-bootstrap";
import { logoutUserAction } from "../../store/actions/User";

const mapStateToProps = (state) => {
	return {
		activeModule: state.activeModule,
		loggedIn: state.loggedIn,
		loggedUserName: state.loggedUserData.name,
		loggedUserLevel: state.loggedUserData.userLevel,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		selectActiveModule: (module) => dispatch(changeActiveModule(module)),
		toggleLoginModal: () => dispatch(toggleModal("loginModal", true)),
		logout: () => dispatch(logoutUserAction()),
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
								{this.props.loggedUserLevel === "Super-Admin" || this.props.loggedUserLevel === "Admin" ? (
									<>
										<Button
											style={this.props.activeModule === navModules.admin ? buttonHighlite : buttonSimple}
											onClick={() => this.props.selectActiveModule(navModules.admin)}
										>
											Admin
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
									style={this.props.activeModule === navModules.patient ? buttonHighlite : buttonSimple}
									onClick={() => this.props.selectActiveModule(navModules.patient)}
								>
									Patients
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
					<div style={{ paddingBottom: "16px" }}>
						{this.props.loggedIn ? (
							// 	<AccountCircle fontSize="large" />
							// 	{this.props.loggedUserName}
							// onClick={this.props.login}
							<Dropdown>
								<Dropdown.Toggle variant="secondary" id="dropdown-basic">
									{this.props.loggedUserName}
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{/* <Dropdown.Item onClick={() => this.props.logout()}>Change Password</Dropdown.Item> */}
									<Dropdown.Item onClick={() => this.props.logout()}>Logout</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : (
							<Button
								// style={}
								onClick={() => this.props.toggleLoginModal()}
							>
								Login
							</Button>
						)}
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

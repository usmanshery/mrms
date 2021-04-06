import React, { Component } from "react";
import { connect } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import { notificationType } from "./store/misc/global";
import { onNotificationPop } from "./store/session";

import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";

import MainComponent from "./components/MainComponent";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const mapStateToProps = (state) => {
	return {
		notifications: state.notifications,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearNotifications: (currentNotifications) => dispatch(onNotificationPop({ currentNotifications })),
	};
};

class App extends Component {
	componentDidUpdate(prevState) {
		if (prevState.notifications === this.props.notifications) return;
		if (this.props.notifications.length === 0) return;

		this.props.notifications.forEach((notificationData) => {
			switch (notificationData.type) {
				case notificationType.green:
					toast.success(notificationData.message, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
					});
					break;
				case notificationType.red:
					toast.error(notificationData.message, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
					});
					break;
				default:
					toast.warn(notificationData.message, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
					});
					break;
			}
		});

		this.props.clearNotifications(this.props.notifications);
	}

	render() {
		return (
			<>
				<Navbar />
				<Sidebar />
				<ToastContainer
					position="top-right"
					autoClose={1000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover={false}
				/>
				<div className="App">
					<MainComponent />
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

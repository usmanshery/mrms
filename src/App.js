import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";

import MainComponent from "./components/MainComponent";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<Sidebar />
				<div className="App">
					<MainComponent />
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

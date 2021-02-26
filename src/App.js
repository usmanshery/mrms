import React, { Component } from "react";
import "./App.css";
import MainComponent from "./components/MainComponent";
import { connect } from "react-redux";
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
			<div className="App">
				<p>App</p>
				<MainComponent />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

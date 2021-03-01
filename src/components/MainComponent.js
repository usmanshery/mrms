import React, { Component } from "react";
import { connect } from "react-redux";
// import PatientForm from "./forms/PatientProfile";
import OrthoticForm from "./forms/OrthoticProfile";


const mapStateToProps = (state) => {
	return {};
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
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div>
				<p>Main Component</p>
				{/* <PatientForm/> */}
				<OrthoticForm/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

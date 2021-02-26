import React, { Component } from "react";
import { connect } from "react-redux";
import { onVerifyPatientInfo } from "../../store/session";

import {
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
} from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";

import "./FormStyles.css";

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verifyPatientInfo: (contactNo) => dispatch(onVerifyPatientInfo({ contactNo })),
	};
};

/*
	this form will create basic user profile and submit the json object of basic user profile
	this class will have dispatch method to add new patient
	this class will have dispatch method to verify user information against existing users

*/

class PatientForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				// Row
				name: "",
				fathername: "",
				// Row
				sex: "",
				age: "",
				phone: "",
				// Row
				rank: "",
				armynumber: "",
				unit: "",
				// Row
				address: "",
				city: "",
			},
			// errors to show against validation
			errors: {
				name: false,
				fathername: false,
				contact: false,
				sex: false,
				age: false,
				phone: false,
				address: false,
				city: false,
			},
		};

		// labels for inputs
		this.labels = {
			name: "Patient's Name",
			fathername: "Patient's Father Name",
			sex: "Gender",
			age: "Age",
			phone: "Patient's Contact Number",
			address: "Patient's Address",
			city: "Select City",
		};

		// validation functions
		this.validation = {
			isNull: (value) => value === undefined || value.length === 0,
			isUnderSize: (minLength) => (value = "") => value.length < minLength,
			isOverSize: (maxLength) => (value = "") => value.length > maxLength,
			isNotNumber: (value) => isNaN(value),
		};
	}

	// componentDidMount() {
	// 	this.props.verifyPatientInfo("test contact number 123");
	// }

	setFormValue(ref, value) {
		// validate for error
		let error = false;

		if (ref === "name") {
			if (this.validation.isNull(value)) error = "Patient Name is Required";
			if (this.validation.isOverSize(5)(value))
				error = "Name Should Be Under 100 Characters";
		}
		if (ref === "fathername") {
			if (this.validation.isNull(value)) error = "This Field is Required";
			if (this.validation.isOverSize(5)(value))
				error = "Name Should Be Under 100 Characters";
		}
		if (ref === "phone") {
			if (this.validation.isNull(value))
				error = "Patient's Contact Number is Required";
		}
		if (ref === "sex") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "age") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "address") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}
		if (ref === "city") {
			if (this.validation.isNull(value)) error = "This Field is Required";
		}

		console.log("reference:", ref);
		console.log("value:", value);
		console.log("Error:", error);

		this.setState({
			form: {
				...this.state.form,
				[ref]: value,
			},
			errors: {
				...this.state.errors,
				[ref]: error,
			},
		});
	}

	render() {
		return (
			<Container className="greenBackground">
				{/* Name, Father's Name, Gender, Age */}
				<Row>
					<Col className="col-4">
						<TextField
							className={"fullWidth"}
							label={this.labels.name}
							value={this.state.form.name}
							onChange={(event) => this.setFormValue("name", event.target.value)}
							error={this.state.errors.name !== false}
							helperText={this.state.errors.name}
							required
							variant="standard"
						/>
					</Col>
					<Col className="col-4">
						<TextField
							className={"fullWidth"}
							label={this.labels.fathername}
							value={this.state.form.fathername}
							onChange={(event) => this.setFormValue("fathername", event.target.value)}
							error={this.state.errors.fathername !== false}
							helperText={this.state.errors.fathername}
							required
							type="number"
							variant="standard"
						/>
					</Col>
					<Col className="col-2">
						<FormControl
							error={this.state.errors.sex !== false}
							variant="standard"
							className="fullWidth"
						>
							<InputLabel>{this.labels.sex}</InputLabel>
							<Select
								className="fullWidth"
								value={this.state.form.sex}
								onChange={(event) => this.setFormValue("sex", event.target.value)}
								required
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={"Male"}>Male</MenuItem>
								<MenuItem value={"Female"}>Female</MenuItem>
							</Select>
							<FormHelperText>{this.state.errors.sex}</FormHelperText>
						</FormControl>
					</Col>
					<Col className="col-2">
						<TextField
							className={"fullWidth"}
							label={this.labels.age}
							value={this.state.form.age}
							onChange={(event) => this.setFormValue("age", event.target.value)}
							error={this.state.errors.age !== false}
							helperText={this.state.errors.age}
							required
							variant="standard"
							type="number"
						/>
					</Col>
				</Row>
				{/* Address and City */}
				<Row>
					<Col>
						<TextField
							className={"fullWidth"}
							label={this.labels.address}
							value={this.state.form.address}
							onChange={(event) => this.setFormValue("address", event.target.value)}
							error={this.state.errors.address !== false}
							helperText={this.state.errors.address}
							required
							variant="standard"
						/>
					</Col>
					<Col className="col-4">
						<FormControl
							error={this.state.errors.city !== false}
							variant="standard"
							className="fullWidth"
						>
							<InputLabel>{this.labels.city}</InputLabel>
							<Select
								className="fullWidth"
								value={this.state.form.city}
								onChange={(event) => this.setFormValue("city", event.target.value)}
								required
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={"Lahore"}>Lahore</MenuItem>
								<MenuItem value={"Rawalpindi"}>Rawalpindi</MenuItem>
							</Select>
							<FormHelperText>{this.state.errors.city}</FormHelperText>
						</FormControl>
					</Col>
				</Row>
				{/* Contact Number so far and a lot of space */}
				<Row>
					<Col className="col-3">
						<TextField
							className={"fullWidth"}
							label={this.labels.phone}
							value={this.state.form.phone}
							onChange={(event) => this.setFormValue("phone", event.target.value)}
							error={this.state.errors.phone !== false}
							helperText={this.state.errors.phone}
							required
							variant="standard"
							type="number"
						/>
					</Col>
				</Row>
			</Container>
			/*
				Fields:
					name
					father name
					contact
					age
					sex
					address (by parts, address, city (concatinated with province))
				
				Setup other needed fields:
					
			*/
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);

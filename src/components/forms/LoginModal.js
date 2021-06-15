import React, { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { TextField } from "@material-ui/core";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { toggleModal } from "../../store/actions/Navigation";
import { loginUserAction } from "../../store/actions/User";

function LoginModal() {
	const loginModal = useSelector((state) => state.loginModal);
	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const loginPopup = (
		// show={counter}
		<Modal
			style={{ marginTop: "70px" }}
			show={loginModal}
			onHide={() => {
				setUsername("");
				setPassword("");
				dispatch(toggleModal("loginModal", false));
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>
					<span>Login</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container fluid>
					<Row>
						<Col>
							<TextField
								error={usernameError !== false}
								helperText={usernameError}
								fullWidth
								label="Username"
								value={username}
								onChange={(event) => {
									setUsername(event.target.value);
									setUsernameError(false);
								}}
								variant="standard"
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<TextField
								error={passwordError !== false}
								helperText={passwordError}
								fullWidth
								label="Password"
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
									setPasswordError(false);
								}}
								type="password"
								variant="standard"
							/>
						</Col>
					</Row>
					<Row>
						<Col className="offset-9 col-3" style={{ marginTop: "10px" }}>
							<Button
								color="primary"
								onClick={() => {
									if (username === undefined || username === "") {
										setUsernameError("This field is required.");
									}
									if (password === undefined || password === "") {
										setPasswordError("This field is required.");
									}
									if (!(username === undefined || username === "") && !(password === undefined || password === "")) {
										dispatch(loginUserAction(username, password));
									}
								}}
							>
								{"Login"}
							</Button>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			{/* <Modal.Footer></Modal.Footer> */}
		</Modal>
	);
	return loginPopup;
}

export default LoginModal;

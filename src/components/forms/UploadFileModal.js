import React, { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { navModules, toggleModal } from "../../store/actions/Navigation";
import { uploadFileAction } from "../../store/actions/Patient";

function UploadFileModal() {
	const uploadFileModal = useSelector((state) => state.uploadFileModal);
	const activeCaseId = useSelector((state) => {
		if (state.activeModule === navModules.patient) {
			return state.patientModule.activeCaseId;
		}
		if (state.activeModule === navModules.admin) {
			return state.adminModule.activeCaseId;
		}
		// station, admin etc
	});
	const dispatch = useDispatch();

	const [files, setFiles] = useState("");
	// const [password, setPassword] = useState("");

	// const [usernameError, setUsernameError] = useState(false);
	// const [passwordError, setPasswordError] = useState(false);

	const uploadFilePopup = (
		// show={counter}
		<Modal
			style={{ marginTop: "70px" }}
			show={uploadFileModal}
			onHide={() => {
				dispatch(toggleModal("uploadFileModal", false));
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>
					<span>Upload Files</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container fluid>
					<Row>
						<Col>
							<input
								type="file"
								name="file"
								multiple
								onChange={(event) => {
									// console.log(event.target.files[0])
									setFiles(event.target.files);
								}}
							/>
						</Col>
					</Row>
					<Row>
						<Col className="offset-9 col-3" style={{ marginTop: "10px" }}>
							<Button
								color="primary"
								onClick={() => {
									if (files === undefined || files === null || files.length === 0) return;

									const data = new FormData();
									data.append("caseId", activeCaseId);
									for (var x = 0; x < files.length; x++) {
										data.append("file", files[x], files[x].name);
									}
									dispatch(uploadFileAction(data));
									dispatch(toggleModal("uploadFileModal", false));
								}}
							>
								{"Upload"}
							</Button>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			{/* <Modal.Footer></Modal.Footer> */}
		</Modal>
	);
	return uploadFilePopup;
}

export default UploadFileModal;

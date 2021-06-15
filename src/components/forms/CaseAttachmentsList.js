import React from "react";
import { useDispatch } from "react-redux";

import { Button, Toolbar, Typography } from "@material-ui/core";
import { Container, Row, Col } from "react-bootstrap";
import { toggleModal } from "../../store/actions/Navigation";
import AttachmentsTable from "../tables/AttachmentsTable";

function CaseAttachmentsList(props) {
	/*
		Props for behavior:
		- readOnly | bool (true) | to control changes such as new attachment and removal of existing attachments
	*/
	const dispatch = useDispatch();

	let uploadButton = undefined;
	if (!props.readOnly) {
		uploadButton = (
			<Col className="col-3 my-auto">
				<Button variant="contained" color="primary" onClick={() => dispatch(toggleModal("uploadFileModal", true))}>
					Upload New File
				</Button>
			</Col>
		);
	}
	let content = (
		<Container>
			{/* First row, show title, add new etc */}
			<Row>
				<Toolbar>
					<Typography variant="h5" id="tableTitle" component="div">
						{"Case Attachments"}
					</Typography>
				</Toolbar>
				{uploadButton}
			</Row>
			{/* Second row, show attachments table */}
			<Row>
				<AttachmentsTable readOnly={props.readOnly} />
			</Row>
		</Container>
	);

	return content;
}

export default CaseAttachmentsList;

import React from "react";

// import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import dateFormat from "dateformat";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	tableHeading: {
		fontWeight: "bold",
	},
	activeStage: {
		background: "palevioletred",
	},
	passedStage: {
		background: "greenyellow",
	},
});

function CaseHistory(props) {
	const classes = useStyles();
	const { caseDetail, caseCategory } = props;

	let history = [];
	let historyFragment;

	console.log(caseDetail);
	// when was case created
	history.push({
		stage: "Created At",
		inDate: dateFormat(new Date(caseDetail.created_at), "dd/mm/yyyy h:MM TT"),
		outDate: dateFormat(new Date(caseDetail.created_at), "dd/mm/yyyy h:MM TT"),
		userName: "Receptionist Name Here",
		userId: "Receptionist ID Here",
		remarks: "-",
	});

	if (caseCategory === "prosthetic") {
		// Admin case
		if (caseDetail.sponsoredCase) {
			if (caseDetail.admin === undefined) {
				// admin stage pending
				historyFragment = {
					stage: "Admin",
					inDate: dateFormat(new Date(caseDetail.created_at), "dd/mm/yyyy h:MM TT"),
					outDate: "Action Pending",
					userName: "-",
					userId: "-",
					remarks: "-",
				};
			} else {
				// admin stage passed
				historyFragment = {
					stage: "Admin",
					inDate: dateFormat(new Date(caseDetail.created_at), "dd/mm/yyyy h:MM TT"),
					outDate: dateFormat(new Date(caseDetail.admin.date), "dd/mm/yyyy h:MM TT"),
					userName: caseDetail.admin.name,
					userId: caseDetail.admin.worker,
					remarks: caseDetail.admin.approved ? "Approved" : "Rejected",
					remarksStyles: caseDetail.admin.approved
						? {
								background: "green",
						  }
						: {
								background: "red",
						  },
				};
			}
			history.push({ ...historyFragment });

			// receptionist
			if (caseDetail.reception === undefined) {
				if (caseDetail.admin === undefined) {
					// nowhere near
					historyFragment = {
						stage: "Reception",
						inDate: "-",
						outDate: "-",
						userName: "-",
						userId: "-",
						remarks: "-",
					};
				} else {
					// current stage pending
					historyFragment = {
						stage: "Reception",
						inDate: dateFormat(new Date(caseDetail.admin.date), "dd/mm/yyyy h:MM TT"),
						outDate: "Action Pending",
						userName: "-",
						userId: "-",
						remarks: "-",
					};
				}
			} else {
				// reception stage passed
				historyFragment = {
					stage: "Reception",
					inDate: dateFormat(new Date(caseDetail.admin.date), "dd/mm/yyyy h:MM TT"),
					outDate: dateFormat(new Date(caseDetail.reception.date), "dd/mm/yyyy h:MM TT"), 
					userName: caseDetail.reception.name,
					userId: caseDetail.reception.worker,
					remarks: "-",
				};
			}
			history.push({ ...historyFragment });
		}
	}

	// casting
	let inDate;
	if (caseDetail.sponsoredCase) {
		// nowhere near
		if (caseDetail.reception === undefined) {
			inDate = "-";
		} else {
			inDate = dateFormat(new Date(caseDetail.reception.date), "dd/mm/yyyy h:MM TT");
		}
	} else {
		inDate = dateFormat(new Date(caseDetail.created_at), "dd/mm/yyyy h:MM TT");
	}

	if (caseDetail.casting === undefined) {
		if (!caseDetail.sponsoredCase || (caseDetail.sponsoredCase && caseDetail.reception !== undefined)) {
			historyFragment = {
				stage: "Casting",
				inDate,
				outDate: "Action Pending",
				userName: "-",
				userId: "-",
				remarks: "-",
			};
		} else {
			historyFragment = {
				stage: "Casting",
				inDate,
				outDate: "-",
				userName: "-",
				userId: "-",
				remarks: "-",
			};
		}
	} else {
		historyFragment = {
			stage: "Casting",
			inDate,
			outDate: new Date(caseDetail.casting.date).toDateString(),
			userName: caseDetail.casting.name,
			userId: caseDetail.casting.worker,
			remarks: "-",
		};
	}
	history.push({ ...historyFragment });

	// modification
	if (caseDetail.modification === undefined && caseDetail.casting === undefined) {
		// nowhere near
		historyFragment = {
			stage: "Modification",
			inDate: "-",
			outDate: "-",
			userName: "-",
			userId: "-",
			remarks: "-",
		};
	} else if (caseDetail.modification === undefined && caseDetail.casting !== undefined) {
		historyFragment = {
			stage: "Modification",
			inDate: dateFormat(new Date(caseDetail.casting.date), "dd/mm/yyyy h:MM TT"),
			outDate: "Action Pending",
			userName: "-",
			userId: "-",
			remarks: "-",
		};
	} else {
		historyFragment = {
			stage: "Modification",
			inDate: dateFormat(new Date(caseDetail.casting.date), "dd/mm/yyyy h:MM TT"),
			outDate: dateFormat(new Date(caseDetail.modification.date), "dd/mm/yyyy h:MM TT"),
			userName: caseDetail.modification.name,
			userId: caseDetail.modification.worker,
			remarks: "-",
		};
	}
	history.push({ ...historyFragment });

	// fitting
	if (caseDetail.fitting === undefined && caseDetail.modification === undefined) {
		// nowhere near
		historyFragment = {
			stage: "Fitting",
			inDate: "-",
			outDate: "-",
			userName: "-",
			userId: "-",
			remarks: "-",
		};
	} else if (caseDetail.fitting === undefined && caseDetail.modification !== undefined) {
		historyFragment = {
			stage: "Fitting",
			inDate: dateFormat(new Date(caseDetail.modification.date), "dd/mm/yyyy h:MM TT"),
			outDate: "Action Pending",
			userName: "-",
			userId: "-",
			remarks: "-",
		};
	} else {
		historyFragment = {
			stage: "Fitting",
			inDate: dateFormat(new Date(caseDetail.modification.date), "dd/mm/yyyy h:MM TT"),
			outDate: dateFormat(new Date(caseDetail.fitting.date), "dd/mm/yyyy h:MM TT"),
			userName: caseDetail.fitting.name,
			userId: caseDetail.fitting.worker,
			remarks: "-",
		};
	}
	history.push({ ...historyFragment });

	// console.log("History:", history);

	const historyTable = (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.tableHeading}>Stage</TableCell>
						<TableCell className={classes.tableHeading} align="center">In Date</TableCell>
						<TableCell className={classes.tableHeading} align="center">Out Date</TableCell>
						<TableCell className={classes.tableHeading} align="center">User Name</TableCell>
						<TableCell className={classes.tableHeading} align="center">User ID</TableCell>
						<TableCell className={classes.tableHeading} align="center">Remarks</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{history.map((stageDetail) => (
						<TableRow
							className={stageDetail.outDate === "Action Pending" ? classes.activeStage : stageDetail.outDate !== "-" ? classes.passedStage : ""}
							key={stageDetail.stage}
						>
							<TableCell component="th" scope="row">
								{stageDetail.stage}
							</TableCell>
							<TableCell align="center">{stageDetail.inDate}</TableCell>
							<TableCell align="center">{stageDetail.outDate}</TableCell>
							<TableCell align="center">{stageDetail.userName}</TableCell>
							<TableCell align="center">{stageDetail.userId}</TableCell>
							<TableCell align="center">{stageDetail.remarks}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
	return historyTable;
}

export default CaseHistory;

import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { editCaseAction } from "../../store/actions/Patient";

import "../styles/Table.css";

const mapStateToProps = (state) => {
	return {
		activePatientId: state.patientModule.activePatientId,
		activePatientData: state.patientModule.activePatientData ? state.patientModule.activePatientData : {},
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editCase: (caseId) => dispatch(editCaseAction(caseId)),
	};
};

class PatientCasesTable extends Component {
	constructor(props) {
		super(props);

		const headCells = [
			{ id: "id", align: "left", disablePadding: false, label: "Patient ID" },
			{ id: "category", align: "left", disablePadding: false, label: "Case Category" },
			{ id: "action", align: "center", disablePadding: false, label: "Actions" },
		];

		this.stableSort = this.stableSort.bind(this);
		this.getComparator = this.getComparator.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeDense = this.handleChangeDense.bind(this);
		this.handleRequestSort = this.handleRequestSort.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
		this.descendingComparator = this.descendingComparator.bind(this);
		this.viewPatient = this.viewPatient.bind(this);
		this.editCase = this.editCase.bind(this);

		let dataRows = [];

		if (this.props.activePatientData.cases.length > 0) {
			// on new results:
			dataRows = this.props.activePatientData.cases.map((_case) => {
				let { category } = _case;
				return {
					id: _case[category]._id,
					category,
				};
			});
		}

		this.state = {
			headCells,
			order: "asc",
			orderBy: "id",
			selected: undefined,
			page: 0,
			dense: true,
			rowsPerPage: 5,
			dataRows,
		};
	}

	// table helper functions
	stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	getComparator(order, orderBy) {
		return order === "desc" ? (a, b) => this.descendingComparator(a, b, orderBy) : (a, b) => -this.descendingComparator(a, b, orderBy);
	}

	handleClick(id) {
		this.setState({
			selected: id,
		});
	}

	handleChangeDense(event) {
		this.setState({
			dense: event.target.checked,
		});
	}

	handleRequestSort(event, property) {
		let { order, orderBy } = this.state;
		const isAsc = orderBy === property && order === "asc";
		this.setState({
			order: isAsc ? "desc" : "asc",
			orderBy: property,
		});
	}

	handleChangePage(event, newPage) {
		this.setState({
			page: newPage,
		});
	}

	handleChangeRowsPerPage(event) {
		this.setState({
			rowsPerPage: parseInt(event.target.value, 10),
			page: 0,
		});
	}

	descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	editCase(data) {
		this.props.editCase(data.id);
	}

	viewPatient(data) {
		this.props.viewPatient(data.id, data);
	}

	render() {
		const createSortHandler = (property) => (event) => {
			this.handleRequestSort(event, property);
		};

		let { page, rowsPerPage, order, orderBy, selected, dense, headCells } = this.state;
		let dataRows = this.state.dataRows;

		if (dataRows.length === 0) {
			return (
				<Container style={{ padding: "0px" }}>
					<Row>
						<Col>
							<Toolbar>
								<Typography variant="h6" id="tableTitle" component="div">
									No Cases Found
								</Typography>
							</Toolbar>
						</Col>
					</Row>
				</Container>
			);
		}

		const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);

		return (
			<Container style={{ padding: "0px" }}>
				<Paper style={{ boxShadow: "none" }}>
					<TableContainer>
						<Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"} aria-label="enhanced table">
							<TableHead>
								<TableRow>
									{headCells.map((headCell) => (
										<TableCell
											key={headCell.id}
											align={headCell.align}
											padding={headCell.disablePadding ? "none" : "default"}
											sortDirection={orderBy === headCell.id ? order : false}
										>
											{headCell.id !== "action" ? (
												<TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
													{headCell.label}
													{orderBy === headCell.id ? <span>{order === "desc" ? "sorted descending" : "sorted ascending"}</span> : null}
												</TableSortLabel>
											) : (
												headCell.label
											)}
										</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{this.stableSort(dataRows, this.getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow hover onClick={() => this.handleClick(row.id)} aria-checked={row.id === selected} tabIndex={-1} key={row.id} selected={row.id === selected}>
												<TableCell component="th" id={labelId} scope="row">
													{row.id}
												</TableCell>
												<TableCell component="th" id={labelId} scope="row">
													{row.category}
												</TableCell>
												<TableCell align="right">
													<Button variant="contained" color="secondary" onClick={() => this.editCase(row)}>
														Load Case
													</Button>
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10]}
						component="div"
						count={dataRows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
					/>
				</Paper>
				<FormControlLabel control={<Switch checked={dense} onChange={this.handleChangeDense} />} label="Compact Table" />
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCasesTable);

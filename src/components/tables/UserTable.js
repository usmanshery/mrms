import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";
import { Container } from "react-bootstrap";

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

import { viewUserAction, editUserAction } from "../../store/actions/User";

import "../styles/Table.css";

const mapStateToProps = (state) => {
	return {
		dataRows: state.userModule.searchResults,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		viewUser: (userId, userData) => dispatch(viewUserAction(userId, userData)),
		editUser: (userId, userData) => dispatch(editUserAction(userId, userData)),
	};
};

class UserTable extends Component {
	constructor(props) {
		super(props);

		const headCells = [
			{ id: "id", align: "left", disablePadding: false, label: "User ID" },
			{ id: "name", align: "left", disablePadding: false, label: "Name" },
			{ id: "username", align: "left", disablePadding: false, label: "Username" },
			{ id: "password", align: "left", disablePadding: false, label: "Password" },
			{ id: "sex", align: "left", disablePadding: false, label: "Gender" },
			{ id: "userlevel", align: "left", disablePadding: false, label: "User Level" },
			{ id: "userrole", align: "left", disablePadding: false, label: "User Roles" },
			{ id: "action", align: "center", disablePadding: false, label: "Actions" },
		];

		this.state = {
			headCells,
			order: "asc",
			orderBy: "name",
			selected: undefined,
			page: 0,
			dense: true,
			rowsPerPage: 10,
		};

		this.stableSort = this.stableSort.bind(this);
		this.getComparator = this.getComparator.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeDense = this.handleChangeDense.bind(this);
		this.handleRequestSort = this.handleRequestSort.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
		this.descendingComparator = this.descendingComparator.bind(this);
		this.viewUser = this.viewUser.bind(this);
		this.editUser = this.editUser.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.searchResults === this.props.searchResults) return;
		// results clear
		if (this.props.searchResults.length === 0) {
			this.setState({
				rows: [],
			});
			return;
		}

		// on new results:
		let rows = this.props.searchResults.map((user) => {
			let { _id, name, username, password, sex, userlevel, userrole } = user;
			return {
				id: _id,
				name,
				username,
				password,
				sex,
				userlevel,
				userrole,
			};
		});
		this.setState({
			rows,
		});
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

	editUser(data) {
		this.props.editUser(data.id, data);
	}

	viewUser(data) {
		this.props.viewUser(data.id, data);
	}

	render() {
		const createSortHandler = (property) => (event) => {
			this.handleRequestSort(event, property);
		};

		let { page, rowsPerPage, order, orderBy, selected, dense, headCells } = this.state;
		let dataRows = this.props.dataRows
			? this.props.dataRows.map((userObj) => {
					return { ...userObj, id: userObj._id };
			  })
			: [];

		const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);

		return (
			<div className="tableRootDiv">
				<Container fluid style={{ padding: "0px" }}>
					<Paper>
						<Toolbar>
							<Typography variant="h6" id="tableTitle" component="div">
								Users
							</Typography>
						</Toolbar>
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
														{row.name}
													</TableCell>
													<TableCell align="left">{row.username}</TableCell>
													<TableCell align="left">{row.password}</TableCell>
													<TableCell align="left">{row.sex}</TableCell>
													<TableCell align="left">{row.userLevel}</TableCell>
													<TableCell align="left">{row.userRole}</TableCell>

													<TableCell align="right">
														<Button variant="contained" color="primary" onClick={() => this.viewUser(row)}>
															View Details
														</Button>
														<Button variant="contained" color="secondary" onClick={() => this.editUser(row)}>
															Edit Details
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
							rowsPerPageOptions={[10, 20, 30]}
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
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);

import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import { Row, Col } from "react-bootstrap";
import { defaultProfileFormLabelValues } from "./formValues";

export const validation = {
	isNull: (value) => value === undefined || value === null || value.length === 0,
	isUnderSize:
		(minLength) =>
		(value = "") =>
			value.length < minLength,
	isOverSize:
		(maxLength) =>
		(value = "") =>
			value.length > maxLength,
	isNotNumber: (value) => isNaN(value),
	hasSpaces: (value) => /\s/g.test(value),
};

export var objFilter = function (obj, predicate) {
	let result = {},
		key;

	for (key in obj) {
		if (predicate(key, obj[key])) {
			result[key] = obj[key];
		}
	}

	return result;
};

const citiesCollection = require("../pk.json").map((cityDetails) => {
	return cityDetails.city + ", " + cityDetails.admin_name;
});
export const cities = citiesCollection;

export const notificationType = {
	green: "green",
	yellow: "yellow",
	red: "red",
};

export const verticalSpacer = (spaceRequired) => {
	return (
		<Row>
			<Col>
				<div style={{ height: `${spaceRequired}px` }}></div>
			</Col>
		</Row>
	);
};

export const accordianWrapper = (title, content, options) => {
	options = {
		subTitle: false,
		titleVarient: "h5",
		subTitleVarient: "h6",
		...options,
	};

	let accordianSummary;
	if (!options.subTitle) {
		accordianSummary = (
			<AccordionSummary>
				<Typography variant={options.titleVarient}>{title}</Typography>
			</AccordionSummary>
		);
	} else {
		accordianSummary = (
			<>
				<AccordionSummary>
					<Typography variant={options.titleVarient}>{title[0]}</Typography>
				</AccordionSummary>
				<AccordionSummary>
					<Typography variant={options.subTitleVarient}>{title[1]}</Typography>
				</AccordionSummary>
			</>
		);
	}

	return (
		<Accordion expanded>
			{accordianSummary}
			<AccordionDetails>{content}</AccordionDetails>
		</Accordion>
	);
};

export const rowWrapper = (content, hr = false) => (
	<>
		<Row className="margin-bottom-10">
			<Col>{content}</Col>
		</Row>
		{hr ? (
			<Row>
				<hr style={{ width: "100%" }}></hr>
			</Row>
		) : undefined}
	</>
);

export const caseCategories = {
	prosthetic: "prosthetic",
	orthotic: "prthotic",
	mechanical: "mechanical",
};

export const caseStages = {
	admin: "Admin",
	reception: "Reception",
	casting: "Casting",
	modification: "Modification",
	mechanical: "Mecahanical",
	fitting: "Fitting",
	archived: "Archived",
};

export const prostheticCaseStageFinder = (_case) => {
	/*
		Possible stages: admin - reception - casting - modification - fitting
	*/
	// major categories: army person / civil
	// entitled or war wounded
	if (
		_case.patientCategory === defaultProfileFormLabelValues.categoryOptions[0] ||
		_case.patientCategory === defaultProfileFormLabelValues.categoryOptions[1]
	) {
		if (!_case.admin) return caseStages.admin;
		if (!_case.reception || !_case.reception.processed) return caseStages.reception;
	}
	// CME or dependent
	if (!_case.casting) return caseStages.casting;
	if (!_case.modification) return caseStages.modification;
	if (!_case.fitting) return caseStages.fitting;
	return caseStages.archived;
};

export const orthoticCaseStageFinder = (_case) => {
	/*
		Possible stages: casting - modification - fitting
	*/
	if (!_case.casting) return caseStages.casting;
	if (!_case.modification) return caseStages.modification;
	if (!_case.fitting) return caseStages.fitting;
	return caseStages.archived;
};

export const mechanicalCaseStageFinder = (_case) => {
	/*
		Possible stages: fitting
	*/
	if (!_case.fitting) return caseStages.fitting;
	return caseStages.archived;
};

export const caseStageFinderAuto = (_case, category) => {
	if (category === caseCategories.prosthetic) return prostheticCaseStageFinder(_case[category]);
	if (category === caseCategories.orthotic) return orthoticCaseStageFinder(_case[category]);
	if (category === caseCategories.mechanical) return mechanicalCaseStageFinder(_case[category]);
};

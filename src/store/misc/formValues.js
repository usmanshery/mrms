const cities = require("../pk.json").map((cityDetails) => {
	return cityDetails.city + ", " + cityDetails.admin_name;
});

// TTP Form values
export const TTPFormBooleanFields = [
	"PTTTPTB",
	"PTTTPTBSC",
	"PTTTPTBSCSP",
	"TTSideBars",
	"volumeChange",
	"volumeChangeOther",
	"componentsBreakdown",
	"alignmentProblem",
	"socketCrackBreakdown",
	"growth",
	"accident",
	"falseInfo",
	"wear",
	"stolenLost",
	"barefoot",
	"shoeType",
	"STTTPTB",
	"STTTPTBSC",
	"STTTPTBSCSP",
	"PTBStrap",
	"strap8",
	"supracondilar",
	"EVA",
	"none",
	"pp",
	"softSocket",
];

export const defaultTTPFormValues = {
	// section 1
	s1r1f1: "",
	s1r2f1: "",
	s1r2f2: "",
	s1r3f1: "",

	// section 2
	s2r1f1: "",
	s2r2f1: "",
	s2r2f2: "",
	s2r3f1: "",
	s2r4f1: "",

	side: "",
	flexion: "",
	extension: "",
	abduction: "",
	adduction: "",
	remarks: "",

	admission: "",
	casting: "",
	fitting: "",
	delivery: "",
	replace: "",
	followup: "",

	PTTTPTB: true,
	PTTTPTBSC: false,
	PTTTPTBSCSP: false,
	TTSideBars: false,

	volumeChange: false,
	volumeChangeOther: false,
	componentsBreakdown: false,
	alignmentProblem: false,
	socketCrackBreakdown: false,
	growth: false,
	accident: false,
	falseInfo: false,
	wear: false,
	stolenLost: false,

	bodyWeight: "",
	bodyHeight: "",
	footSize: "",
	heelHeight: "",
	prosFootSize: "",

	barefoot: false,
	shoeType: false,

	STTTPTB: false,
	STTTPTBSC: false,
	STTTPTBSCSP: false,

	PTBStrap: false,
	strap8: false,
	supracondilar: false,

	EVA: false,
	none: false,
	pp: false,

	softSocket: false,
};

export const defaultTTPLableValues = {
	side: "Side",
	flexion: "Flexion",
	extension: "Extension",
	abduction: "Abduction",
	adduction: "Adduction",
	remarks: "Remarks",

	admission: "Admission Date",
	casting: "Casting Date",
	fitting: "Fitting Date",
	delivery: "Delivery Date",
	replace: "Replace Date",
	followup: "Follow Up Date",

	TTPTB: "TT/PTB",
	TTPTBSC: "TT/PTB-SC",
	TTPTBSCSP: "TT/PTB-SC-SP",
	TTSideBars: "TT/Side bars",

	volumeChange: "01 Volume Change",
	volumeChangeOther: "02 Volume Change + Other",
	componentsBreakdown: "03 Components breakdown",
	alignmentProblem: "04 Alignment problem",
	socketCrackBreakdown: "05 Socket crack/breakdown",
	growth: "06 Growth",
	accident: "07 Accident",
	falseInfo: "08 False Info",
	wear: "09 Wear",
	stolenLost: "10 Stolen/ Lost",

	bodyWeight: "Body weight (KG)",
	bodyHeight: "Body Height (CM)",
	footSize: "Foot Size (CM)",
	heelHeight: "Heel Height (MM)",
	prosFootSize: "Prosthetic Foot Size",

	barefoot: "01 Barefoot/ Flip Flop",
	shoeType: "02 Shoe Type",

	PTBStrap: "01 PTB-strap",
	strap8: "02 '8' strap",
	supracondilar: "Supracondilar",

	EVA: "EVA",
	none: "None",
	pp: "PP",

	softSocket: "Soft Socket",
};

// TFP Form values
export const TFPFormBooleanFields = [
	"ic",
	"PTquadSuction",
	"PTCADCAM",
	"volumeChange",
	"volumeChangeOther",
	"componentsBreakdown",
	"alignmentProblem",
	"socketCrackBreakdown",
	"growth",
	"barefoot",
	"flipFlop",
	"open",
	"closed",
	"ischialCont",
	"STquadSuction",
	"STCADCAM",
	"CADCAMSuction",
	"silesianBelt",
	"suction",
	"EVA",
	"none",
	"pp",
	"softSocket",
	"inliner",
];

export const defaultTFPFormValues = {
	// section 1
	s1r1f1: "",
	s1r1f2: "",

	s1r2f1: "",

	s1r3f1: "",
	s1r3f2: "",

	s1r4f1: "",

	// section 2
	s2r1f1: "",

	s2r2f1: "",

	s2r3f1: "",
	s2r3f2: "",

	s2r4f1: "",

	s2r5f1: "",
	s2r5f2: "",

	s2r6f1: "",
	s2r7f1: "",
	s2r8f1: "",

	side: "",
	flexion: "",
	extension: "",
	abduction: "",
	adduction: "",
	remarks: "",

	admission: "",
	casting: "",
	fitting: "",
	delivery: "",
	replace: "",
	followup: "",

	ic: false,
	PTquadSuction: false,
	PTCADCAM: false,

	volumeChange: false,
	volumeChangeOther: false,
	componentsBreakdown: false,
	alignmentProblem: false,
	socketCrackBreakdown: false,
	growth: false,

	bodyWeight: "",
	bodyHeight: "",
	footSize: "",
	heelHeight: "",
	prosFootSize: "",

	barefoot: false,
	flipFlop: false,
	open: false,
	closed: false,

	ischialCont: false,
	STquadSuction: false,
	STCADCAM: false,
	CADCAMSuction: false,

	silesianBelt: false,
	suction: false,

	EVA: false,
	none: false,
	pp: false,

	softSocket: false,
	inliner: false,
};

export const defaultTFPLableValues = {
	side: "Side",
	flexion: "Flexion",
	extension: "Extension",
	abduction: "Abduction",
	adduction: "Adduction",
	remarks: "Remarks",

	admission: "Admission Date",
	casting: "Casting Date",
	fitting: "Fitting Date",
	delivery: "Delivery Date",
	replace: "Replace Date",
	followup: "Follow Up Date",

	ic: "IC",
	quadSuction: "Quad Suction",
	CADCAM: "CAD/CAM",

	volumeChange: "01 Volume Change",
	volumeChangeOther: "02 Volume Change + Other",
	componentsBreakdown: "03 Components breakdown",
	alignmentProblem: "04 Alignment problem",
	socketCrackBreakdown: "05 Socket crack/breakdown",
	growth: "06 Growth",

	bodyWeight: "Body weight (KG)",
	bodyHeight: "Body Height (CM)",
	footSize: "Foot Size (CM)",
	heelHeight: "Heel Height (MM)",
	prosFootSize: "Prosthetic Foot Size",

	barefoot: "01 Barefoot",
	flipFlop: "02 Flip Flop",
	open: "03 Open",
	closed: "04 Closed",

	ischialCont: "Ischial Cont",
	CADCAMSuction: "CAD/CAM Suction",

	silesianBelt: "04 Silesian Belt",
	suction: "05 Suction",

	EVA: "EVA",
	none: "None",
	pp: "PP",

	softSocket: "Soft Socket",
	inliner: "Inliner",
};

// AFO Form values
export const AFOFormBooleanFields = [
	"afo",
	"fo",
	"so",
	"co",
	"shoe",
	"volumeChange",
	"volumeChangeOther",
	"componentsBreakdown",
	"alignmentProblem",
	"socketCrackBreakdown",
	"growth",
	"accident",
	"falseInfo",
	"wear",
	"stolenLost",
	"barefoot",
	"flipFlop",
	"open",
	"closed",
	"stirupAdult",
	"stirupChild",
	"ankleJointLarge",
	"ankleJointSmall",
	"tamarakLarge",
	"tamarakSmall",
	"conventional",
	"plastic",
];

export const defaultAFOFormValues = {
	// section 1
	s1r1f1: "",
	s1r2f1: "",
	s1r3f1: "",
	s1r3f2: "",
	s1r4f1: "",
	s1r5f1: "",
	s1r5f2: "",
	s1r6f1: "",

	// section 2
	s2r1f1: "",
	s2r2f1: "",
	s2r3f1: "",
	s2r3f2: "",
	s2r4f1: "",
	s2r5f1: "",
	s2r5f2: "",
	s2r6f1: "",

	// section 2
	s3r1f1: "",
	s3r1f2: "",
	s3r2f1: "",

	side: "",

	admission: "",
	casting: "",
	fitting: "",
	delivery: "",
	replace: "",
	followup: "",

	afo: false,
	fo: false,
	so: false,
	co: false,
	shoe: false,

	volumeChange: false,
	volumeChangeOther: false,
	componentsBreakdown: false,
	alignmentProblem: false,
	socketCrackBreakdown: false,
	growth: false,
	accident: false,
	falseInfo: false,
	wear: false,
	stolenLost: false,

	barefoot: false,
	flipFlop: false,
	open: false,
	closed: false,

	bodyWeight: "",
	bodyHeight: "",
	footSize: "",
	heelHeight: "",

	stirupAdult: false,
	stirupChild: false,
	ankleJointLarge: false,
	ankleJointSmall: false,
	tamarakLarge: false,
	tamarakSmall: false,

	conventional: false,
	plastic: false,
};

export const defaultAFOLableValues = {
	side: "Side",

	admission: "Admission Date",
	casting: "Casting Date",
	fitting: "Fitting Date",
	delivery: "Delivery Date",
	replace: "Replace Date",
	followup: "Follow Up Date",

	afo: "A.F.O",
	fo: "F.O",
	so: "S.O",
	co: "C.O",
	shoe: "Shoe",

	volumeChange: "01 Volume Change",
	volumeChangeOther: "02 Volume Change + Other",
	componentsBreakdown: "03 Components breakdown",
	alignmentProblem: "04 Alignment problem",
	growth: "05 Growth",
	accident: "06 Accident",
	falseInfo: "07 False Info",
	wear: "08 Wear",
	stolenLost: "09 Stolen/ Lost",

	bodyWeight: "Body weight (KG)",
	bodyHeight: "Body Height (CM)",
	footSize: "Foot Size (CM)",
	heelHeight: "Heel Height (MM)",

	barefoot: "01 Barefoot",
	flipFlop: "02 Flip Flop",
	open: "03 Open",
	closed: "04 Closed",

	stirupAdult: "01 Stirup Adult 20mm",
	stirupChild: "02 Stirup Child 16mm",
	ankleJointLarge: "03 PP Ankle Joint Large",
	ankleJointSmall: "04 PP Ankle Joint Small",
	tamarakLarge: "05 Tamarak Large",
	tamarakSmall: "06 Tamarak Small",

	conventional: "01 Conventional",
	plastic: "01 Plastic",
};

// KAFO Form values
export const KAFOFormBooleanFields = [
	"ho",
	"ko",
	"hkafo",
	"kafo",
	"volumeChange",
	"volumeChangeOther",
	"componentsBreakdown",
	"alignmentProblem",
	"growth",
	"accident",
	"falseInfo",
	"wear",
	"stolenLost",
	"barefoot",
	"flipFlop",
	"open",
	"closed",
	"stirupAdult",
	"stirupChild",
	"ankleJointLarge",
	"ankleJointSmall",
	"tamarakLarge",
	"tamarakSmall",
	"dropLockAdult",
	"dropLockChild",
	"CREdropLockAdult",
	"CREdropLockChild",
	"swissLockAdult",
	"swissLockChild",
	"adult",
	"child",
	"conventional",
	"plastic",
];

export const defaultKAFOFormValues = {
	// section 1
	s1r1f1: "",
	s1r1f2: "",
	s1r2f1: "",
	s1r2f2: "",
	s1r3f1: "",
	s1r4f1: "",
	s1r4f2: "",
	s1r5f1: "",
	s1r6f1: "",
	s1r7f1: "",
	s1r8f1: "",
	s1r9f1: "",
	s1r9f2: "",
	s1r10f1: "",
	s1r11f1: "",

	// section 2
	s2r1f1: "",
	s2r1f2: "",
	s2r2f1: "",
	s2r2f2: "",
	s2r3f1: "",
	s2r4f1: "",
	s2r4f2: "",
	s2r5f1: "",
	s2r6f1: "",
	s2r7f1: "",
	s2r8f1: "",
	s2r9f1: "",
	s2r9f2: "",
	s2r10f1: "",
	s2r10f2: "",
	s2r11f1: "",

	side: "right",

	admission: "",
	casting: "",
	fitting: "",
	delivery: "",
	replace: "",
	followup: "",

	ho: false,
	ko: false,
	hkafo: false,
	kafo: false,

	volumeChange: false,
	volumeChangeOther: false,
	componentsBreakdown: false,
	alignmentProblem: false,
	growth: false,
	accident: false,
	falseInfo: false,
	wear: false,
	stolenLost: false,

	barefoot: false,
	flipFlop: false,
	open: false,
	closed: false,

	bodyWeight: "",
	bodyHeight: "",
	footSize: "",
	heelHeight: "",

	stirupAdult: false,
	stirupChild: false,
	ankleJointLarge: false,
	ankleJointSmall: false,
	tamarakLarge: false,
	tamarakSmall: false,

	dropLockAdult: false,
	dropLockChild: false,
	CREdropLockAdult: false,
	CREdropLockChild: false,
	swissLockAdult: false,
	swissLockChild: false,

	adult: false,
	child: false,

	conventional: false,
	plastic: false,
};

export const defaultKAFOLableValues = {
	side: "Side",

	admission: "Admission Date",
	casting: "Casting Date",
	fitting: "Fitting Date",
	delivery: "Delivery Date",
	replace: "Replace Date",
	followup: "Follow Up Date",

	ho: "H.O",
	ko: "K.O",
	hkafo: "H.K.A.F.O",
	kafo: "K.A.F.O",

	volumeChange: "01 Volume Change",
	volumeChangeOther: "02 Volume Change + Other",
	componentsBreakdown: "03 Components breakdown",
	alignmentProblem: "04 Alignment problem",
	growth: "05 Growth",
	accident: "06 Accident",
	falseInfo: "07 False Info",
	wear: "08 Wear",
	stolenLost: "09 Stolen/ Lost",

	bodyWeight: "Body weight (KG)",
	bodyHeight: "Body Height (CM)",
	footSize: "Foot Size (CM)",
	heelHeight: "Heel Height (MM)",

	barefoot: "01 Barefoot",
	flipFlop: "02 Flip Flop",
	open: "03 Open",
	closed: "04 Closed",

	stirupAdult: "01 Stirup Adult 20mm",
	stirupChild: "02 Stirup Child 16mm",
	ankleJointLarge: "03 PP Ankle Joint Large",
	ankleJointSmall: "04 PP Ankle Joint Small",
	tamarakLarge: "05 Tamarak Large",
	tamarakSmall: "06 Tamarak Small",

	dropLockAdult: "01 Drop Lock Adult 20mm",
	dropLockChild: "02 Drop Lock Child 16mm",
	CREdropLockAdult: "03 CRE Drop Lock Adult 20mm",
	CREdropLockChild: "04 CRE Drop Lock Child 16mm",
	swissLockAdult: "05 Swiss Lock Adult 20mm",
	swissLockChild: "06 Swiss Lock Child 16mm",

	adult: "01 Adult",
	child: "02 Child",

	conventional: "01 Conventional",
	plastic: "01 Plastic",
};

// LLOR Form values
export const LLORFormBooleanFields = [
	"ho",
	"fo",
	"hkafo",
	"shoe",
	"kafo",
	"so",
	"ko",
	"co",
	"afo",
	"AJjointReplaced",
	"AJaxisBoldReplaced",
	"AJnutClipReplaced",
	"AJwasherReplaced",
	"springReplaced",
	"KJjointReplaced",
	"KJaxisBoldReplaced",
	"KJnutClipReplaced",
	"KJwasherReplaced",
	"bearingReplaced",
	"lockMechReplaced",
	"HJjointReplaced",
	"HJaxisBoldReplaced",
	"HJnutClipReplaced",
	"HJwasherReplaced",
	"strapsReplaced",
	"kneeCapReplaced",
	"kneeCapRepaired",
	"sideBarsReplaced",
	"sideBarsRepaired",
	"leatherReplaced",
	"rivetsReplaced",
];

export const defaultLLORFormValues = {
	repairN: "",
	repairDate: "",
	orthosisN: "",
	deliveryDate: "",

	ho: false,
	fo: false,
	hkafo: false,
	shoe: false,
	kafo: false,
	so: false,
	ko: false,
	co: false,
	afo: false,

	AJjointReplaced: false,
	AJaxisBoldReplaced: false,
	AJnutClipReplaced: false,
	AJwasherReplaced: false,
	springReplaced: false,

	KJjointReplaced: false,
	KJaxisBoldReplaced: false,
	KJnutClipReplaced: false,
	KJwasherReplaced: false,
	bearingReplaced: false,
	lockMechReplaced: false,

	HJjointReplaced: false,
	HJaxisBoldReplaced: false,
	HJnutClipReplaced: false,
	HJwasherReplaced: false,

	strapsReplaced: false,
	kneeCapReplaced: false,
	kneeCapRepaired: false,

	sideBarsReplaced: false,
	sideBarsRepaired: false,
	leatherReplaced: false,
	rivetsReplaced: false,

	remarks: "",
};

export const defaultLLORLableValues = {
	repairN: "Repair N°",
	repairDate: "Repair Date",
	orthosisN: "Orthosis N°",
	deliveryDate: "Delivery Date",

	ho: "H.O",
	fo: "F.O",
	so: "S.O",
	ko: "K.O",
	co: "C.O",
	shoe: "Shoe",
	hkafo: "H.K.A.F.O",
	kafo: "K.A.F.O",
	afo: "A.F.O",

	AJjointReplaced: "01 Joint Replaced",
	AJaxisBoldReplaced: "02 Axis /Bolt Replaced",
	AJnutClipReplaced: "03 Nut /Clip Replaced",
	AJwasherReplaced: "04 Washer Replaced",
	springReplaced: "05 Spring Replaced",

	KJjointReplaced: "01 Joint Replaced",
	KJaxisBoldReplaced: "02 Axis /Bolt Replaced",
	KJnutClipReplaced: "03 Nut /Clip Replaced",
	KJwasherReplaced: "04 Washer Replaced",
	bearingReplaced: "05 Bearing Replaced",
	lockMechReplaced: "06 Lock Mech Replaced",

	HJjointReplaced: "01 Joint Replaced",
	HJaxisBoldReplaced: "02 Axis /Bolt Replaced",
	HJnutClipReplaced: "03 Nut /Clip Replaced",
	HJwasherReplaced: "04 Washer Replaced",

	strapsReplaced: "01 Straps Replaced",
	kneeCapReplaced: "02 Knee cap Replaced",
	kneeCapRepaired: "03 Knee cap Repaired",

	sideBarsReplaced: "01 Side Bars Replaced",
	sideBarsRepaired: "02 Side Bars Repaired",
	leatherReplaced: "03 Leather Replaced",
	rivetsReplaced: "04 Rivets Replaced",

	remarks: "Remarks",
};

// LLPR Form values
export const LLPRFormBooleanFields = [
	"hd",
	"tt",
	"tf",
	"ta",
	"pf",
	"kd",
	"pffd",
	"wornOut",
	"forefootBroken",
	"soleCrack",
	"looseningKeel",
	"kneelBroken",
	"footNoise",
	"socketRepair",
	"socketReplaced",
	"weldingSeamRepair",
	"softSocketRepair",
	"softSocketReplaced",
	"strapRepaired",
	"strapReplaced",
	"strapRepaired8",
	"strapReplaced8",
	"keelBroken",
	"silesianBeltRepaired",
	"silesianBeltReplaced",
	"PPRepair",
	"PPReplacement",
	"EVARepair",
	"EVAReplacement",
	"ICRC",
	"CRE",
	"unknown3",
	"unknown4",
	"completeKnee",
	"kneeShell",
	"kneeAxis",
	"kneeAxisBolt",
	"kneeLockPP",
	"frictionWashers",
	"calfPipe",
	"securingBoltsM66",
	"TFSocketCup",
	"convexDisc",
	"conicalExtensionCup",
	"socketCup",
	"socketBolt",
	"concaveCylinder",
	"ankleConvexDisc",
	"ankleConcaveDisc",
	"ankleBolt",
	"rivets",
	"extensionSupport",
	"kickStrap",
	"cables",
	"spring",
];

export const defaultLLPRFormValues = {
	repairN: "",
	repairDate: "",
	prosthesisN: "",
	deliveryDate: "",

	hd: false,
	tt: false,
	tf: false,
	ta: false,
	pf: false,
	kd: false,
	pffd: false,

	wornOut: false,
	forefootBroken: false,
	soleCrack: false,
	looseningKeel: false,
	kneelBroken: false,
	footNoise: false,

	socketRepair: false,
	socketReplaced: false,
	weldingSeamRepair: false,
	softSocketRepair: false,
	softSocketReplaced: false,

	strapRepaired: false,
	strapReplaced: false,
	strapRepaired8: false,
	strapReplaced8: false,
	keelBroken: false,
	silesianBeltRepaired: false,
	silesianBeltReplaced: false,

	PPRepair: false,
	PPReplacement: false,
	EVARepair: false,
	EVAReplacement: false,

	ICRC: false,
	CRE: false,
	unknown3: false,
	unknown4: false,

	completeKnee: false,
	kneeShell: false,
	kneeAxis: false,
	kneeAxisBolt: false,
	kneeLockPP: false,
	frictionWashers: false,
	calfPipe: false,
	securingBoltsM66: false,

	TFSocketCup: false,
	convexDisc: false,
	conicalExtensionCup: false,
	socketCup: false,
	socketBolt: false,
	concaveCylinder: false,
	ankleConvexDisc: false,
	ankleConcaveDisc: false,
	ankleBolt: false,

	rivets: false,
	extensionSupport: false,
	kickStrap: false,
	cables: false,
	spring: false,

	remarks: "",
};

export const defaultLLPRLableValues = {
	repairN: "Repair N°",
	repairDate: "Repair Date",
	prosthesisN: "Prosthesis N°",
	deliveryDate: "Delivery Date",

	hd: "HD",
	tt: "TT",
	tf: "TF",
	ta: "TA",
	pf: "PF",
	kd: "KD",
	pffd: "PFFD",

	wornOut: "01 Worn Out",
	forefootBroken: "02 Forefoot Broken",
	soleCrack: "03 Sole Crack",
	looseningKeel: "04 Loosening of Keel",
	kneelBroken: "05 Keel Broken",
	footNoise: "06 Foot Noise",

	socketRepair: "01 PP Socket Repair",
	socketReplaced: "02 PP Socket Replaced",
	weldingSeamRepair: "03 Welding Seam Repair",
	softSocketRepair: "04 Soft Socket Repair",
	softSocketReplaced: "05 Soft Socket Replaced",

	strapRepaired: "01 PTB Strap Repaired",
	strapReplaced: "02 PTB Strap Replaced",
	strapRepaired8: "03 8 Strap Repaired",
	strapReplaced8: "04 8 Strap Replaced",
	keelBroken: "05 Keel Broken",
	silesianBeltRepaired: "06 Silesian Belt Repaired",
	silesianBeltReplaced: "07 Silesian Belt Replaced",

	PPRepair: "01 Repair of PP",
	PPReplacement: "02 Replacement of PP",
	EVARepair: "03 Repair of EVA",
	EVAReplacement: "04 Replacement of EVA",

	ICRC: "01 ICRC",
	CRE: "02 CRE",
	unknown3: "03",
	unknown4: "04",

	completeKnee: "01 Complete Knee",
	kneeShell: "02 Knee Shell",
	kneeAxis: "03 Knee Axis",
	kneeAxisBolt: "04 Knee Axis Bolt",
	kneeLockPP: "05 Knee Lock PP",
	frictionWashers: "06 Friction Washers",
	calfPipe: "07 Calf Pipe",
	securingBoltsM66: "08 Securing Bolts M6x6",

	TFSocketCup: "01 TF Socket Cup",
	convexDisc: "02 Convex Disc",
	conicalExtensionCup: "03 Conical Extension Cup",
	socketCup: "04 TT Socket Cup",
	socketBolt: "05 Socket Bolt",
	concaveCylinder: "06 Concave Cylinder",
	ankleConvexDisc: "07 Ankle Convex Disc",
	ankleConcaveDisc: "08 Ankle Concave Disc",
	ankleBolt: "09 Ankle Bolt",

	rivets: "01 Rivets",
	extensionSupport: "02 Extension Support",
	kickStrap: "03 Kick Strap",
	cables: "04 Cables",
	spring: "05 Spring",

	remarks: "Remarks",
};

// ULO Form values
export const ULOFormBooleanFields = [
	"so",
	"sewho",
	"ewho",
	"eo",
	"who",
	"volumeChange",
	"volumeChangeOther",
	"componentsBreakdown",
	"alignmentProblem",
	"growth",
	"accident",
	"falseInfo",
	"wear",
	"stolenLost",
	"unknown1",
	"unknown2",
	"unknown3",
	"unknown4",
	"unknown5",
	"unknown6",
	"conventional",
	"plastic",
];

export const defaultULOFormValues = {
	// section 1
	s1r1f1: "",
	s1r1f2: "",
	s1r1f3: "",
	s1r2f1: "",
	s1r3f1: "",
	s1r4f1: "",
	s1r4f2: "",
	s1r5f1: "",
	s1r6f1: "",
	s1r6f2: "",

	// section 2
	s2r1f1: "",
	s2r1f2: "",
	s2r1f3: "",
	s2r2f1: "",
	s2r3f1: "",
	s2r4f1: "",
	s2r4f2: "",
	s2r5f1: "",
	s2r6f1: "",
	s2r6f2: "",

	side: "",

	admission: "",
	casting: "",
	fitting: "",
	delivery: "",
	replace: "",
	followup: "",

	so: false,
	sewho: false,
	ewho: false,
	eo: false,
	who: false,

	volumeChange: false,
	volumeChangeOther: false,
	componentsBreakdown: false,
	alignmentProblem: false,
	growth: false,
	accident: false,
	falseInfo: false,
	wear: false,
	stolenLost: false,

	unknown1: false,
	unknown2: false,
	unknown3: false,

	unknown4: false,
	unknown5: false,
	unknown6: false,

	conventional: false,
	plastic: false,
};

export const defaultULOLableValues = {
	side: "Side",

	admission: "Admission Date",
	casting: "Casting Date",
	fitting: "Fitting Date",
	delivery: "Delivery Date",
	replace: "Replace Date",
	followup: "Follow Up Date",

	so: "S.O",
	sewho: "S.E.W.H.O",
	ewho: "E.W.H.O",
	eo: "E.O",
	who: "W.H.O",

	volumeChange: "01 Volume Change",
	volumeChangeOther: "02 Volume Change + Other",
	componentsBreakdown: "03 Components breakdown",
	alignmentProblem: "04 Alignment problem",
	growth: "05 Growth",
	accident: "06 Accident",
	falseInfo: "07 False Info",
	wear: "08 Wear",
	stolenLost: "09 Stolen/ Lost",

	unknown1: "-",
	unknown2: "-",
	unknown3: "-",

	unknown4: "-",
	unknown5: "-",
	unknown6: "-",

	conventional: "01 Conventional",
	plastic: "02 Plastic",
};

// ULO2 Form values
export const ULO2FormBooleanFields = [
	"co",
	"ctlso",
	"tlso",
	"lso",
	"volumeChange",
	"volumeChangeOther",
	"componentsBreakdown",
	"alignmentProblem",
	"growth",
	"accident",
	"falseInfo",
	"wear",
	"stolenLost",
];

export const defaultULO2FormValues = {
	// section 1
	s1r1f1: "",
	s1r2f1: "",
	s1r2f2: "",
	s1r3f1: "",
	s1r3f2: "",

	// section 2
	s2r1f1: "",
	s2r1f2: "",
	s2r2f1: "",
	s2r2f2: "",

	instructions: "",

	admission: "",
	casting: "",
	fitting: "",
	delivery: "",
	replace: "",
	followup: "",

	co: false,
	ctlso: false,
	tlso: false,
	lso: false,

	volumeChange: false,
	volumeChangeOther: false,
	componentsBreakdown: false,
	alignmentProblem: false,
	growth: false,
	accident: false,
	falseInfo: false,
	wear: false,
	stolenLost: false,
};

export const defaultULO2LableValues = {
	instructions: "Instructions",

	admission: "Admission Date",
	casting: "Casting Date",
	fitting: "Fitting Date",
	delivery: "Delivery Date",
	replace: "Replace Date",
	followup: "Follow Up Date",

	co: "C.O",
	ctlso: "C.T.L.S.O",
	tlso: "T.L.S.O",
	lso: "L.S.O",

	volumeChange: "01 Volume Change",
	volumeChangeOther: "02 Volume Change + Other",
	componentsBreakdown: "03 Components breakdown",
	alignmentProblem: "04 Alignment problem",
	growth: "05 Growth",
	accident: "06 Accident",
	falseInfo: "07 False Info",
	wear: "08 Wear",
	stolenLost: "09 Stolen/ Lost",
};

// User form
export const defaultUserFormValues = {
	username: "",
	password: "",

	name: "",
	sex: "",

	userLevel: null,
};

export const defaultUserFormErrors = {
	name: false,
	username: false,
	password: false,
	sex: false,
	userLevel: false,
};

export const defaultUserFormLabelValues = {
	username: "Username",
	password: "Password",
	name: "Name",
	sex: "Gender",
	userLevel: "User Access Level",
	userLevelOptions: ["Admin", "Receptionist", "Worker"],
};

// Advise form
export const defaultAdviseFormLabelValues = {
	followup: "Follow Up",
	id: "ID",
	rank: "Rank",
	name: "Name",
	unit: "Unit",
	// disease: "Disease",
	// dated: "Dated"
};

export const defaultAdviseFormValues = {
	followup: false,

	case: "",
	cause: "",
	rangeOfMotion: "",
	items: [],
};

export const tableActions = {
	add: "add",
	update: "update",
	delete: "delete",
};

// export const requiredUserFormFields = ["username", "password", "name", "userLevel", "userRole"];

// Profile form
export const defaultProfileFormValues = {
	name: "",
	fathername: "",
	sex: "",
	age: "",
	address: "",
	phone: "",
	city: "",
	rank: null,
	armynumber: "",
	unit: "",
	picture: undefined,
	category: null,
	dependent: "",
	department: "",
};

export const defaultProfileFormErrors = {
	name: false,
	fathername: false,
	contact: false,
	sex: false,
	age: false,
	phone: false,
	address: false,
	city: false,
	rank: false,
	armynumber: false,
	unit: false,
	category: false,
	dependent: false,
	department: false,
};

export const defaultProfileFormLabelValues = {
	name: "Patient's Name",
	fathername: "Father's Name",
	sex: "Gender",
	age: "Age",
	phone: "Contact Number",
	address: "Address",
	city: "Select City",
	cityOptions: cities,
	rank: "Rank",
	rankOptions: [
		"Gen or Equivalent",
		"Lt Gen or Equivalent",
		"Maj Gen or Equivalent",
		"Brig or Equivalent",
		"Col or Equivalent",
		"Lt Col or Equivalent",
		"Maj or Equivalent",
		"Capt or Equivalent",
		"Lt or Equivalent",
		"Subedar Maj or Equivalent",
		"Subedar or Equivalent",
		"Naib Subaidar or Equivalent",
		"Havildar Maj or Equivalent",
		"Havildar or Equivalent",
		"Naik or Equivalent",
		"Lance Naik or Equivalent",
		"Soldier or Equivalent",
	],
	armynumber: "Army Number",
	unit: "Unit",
	category: "Category",
	categoryOptions: ["Entitled", "War Wounded", "Dependent", "CNE", "Civil Entitled" ],
	dependent: "Dependent Relation",
	department: "Concerned Department",
};

// Prosthetic form
export const defaultProstheticFormValues = {
	patientCategory: undefined,
	onsetDate: undefined,
	onsetPlace: "",
	area: null,
	cause: "",
	diagnosis_disability: "",
	disabilityDetail: "",
	amputationLevel: "",
	amputationType: null,
	side: [],
	prescription: "",
	componentsDetail: "",
	socketType: "",
	footType: "",
	linnerType: "",
	kneeJointType: "",
	modilityGrade: "",
	kClassification: "",
	staffUsername: null,
	staffPassword: "",
};

export const defaultProstheticFormErrors = {
	onsetDate: false,
	onsetPlace: false,
	area: false,
	cause: false,
	diagnosis_disability: false,
	disabilityDetail: false,
	amputationLevel: false,
	amputationType: false,
	side: false,
	prescription: false,
	componentsDetail: false,
	socketType: false,
	footType: false,
	linnerType: false,
	kneeJointType: false,
	modilityGrade: false,
	kClassification: false,
	staffUsername: false,
	staffPassword: false,
};

export const defaultProstheticFormLabelValues = {
	onsetDate: "Date of Onset",
	onsetPlace: "Place of Onset",

	area: "Area",
	areaOptions: ["Operation", "Peace"],

	cause: "Cause",
	diagnosis_disability: "Diagnosis/ Disability",

	disabilityDetail: "Detail of Disability",
	amputationLevel: "Level of Amputation",

	amputationType: "Type of Amputation",
	amputationTypeOptions: ["TTP", "TFP"],

	side: "Side",
	sideOptions: ["Bilateral", "Left", "Right"],

	prescription: "Prescription",
	componentsDetail: "Detail of Components",

	socketType: "Socket Type",
	footType: "Foot Type",

	linnerType: "Linner Type",
	kneeJointType: "Knee Joint Type",

	modilityGrade: "Modility Grade",
	kClassification: "K-Classification",

	staffUsername: "Select Username",
	staffPassword: "Enter Password",
};

// Orthotic form
export const defaultOrthoticFormValues = {
	side: [],
	deformityLevel: [],
	cause: [],
	trauma: [],
	disease: [],
	deformity_disability: "",
	disabilityDetail: "",
	treatmentObjectives: [],
	applianceType: null,
	staffUsername: null,
	staffPassword: "",
};

export const defaultOrthoticFormErrors = {
	side: false,
	deformityLevel: false,
	cause: false,
	trauma: false,
	disease: false,
	deformity_disability: false,
	disabilityDetail: false,
	treatmentObjectives: false,
	applianceType: false,
	staffUsername: false,
	staffPassword: false,
};

export const defaultOrthoticFormLabelValues = {
	side: "Side",
	sideOptions: ["Bilateral", "Left", "Right"],

	deformityLevel: "Level of Deformity",
	deformityLevelOptions: ["Hip", "Knee", "Ankle", "Foot"],

	cause: "Cause",
	causeOptions: ["Trauma", "Disease", "Tumor", "Congenital"],

	trauma: "Trauma",
	traumaOptions: ["Road Side Accident", "Mechanical Accident", "Gun Shot", "Fall", "Landmin", "Bomb Blast", "Burns"],

	disease: "Disease",
	diseaseOptions: ["Diahetes", "Vascular Disease", "Osteomyleitis", "CP", "Polio", "Arthritis", "TB", "Paraplegia", "Hemiphegia", "Spina Bifiba"],

	deformity_disability: "Deformity/ Disability",
	disabilityDetail: "Detail of Disability",

	treatmentObjectives: "Treatment Objectives",
	treatmentObjectivesOptions: ["Prevent/Correct Deformity", "Improve Ambulation", "Reduce Axial Load", "Fracture Treatment", "Protect Joint"],

	applianceType: "Type of Appliance",
	applianceTypeOptions: ["AFO", "KAFO", "LLOR", "LLPR", "ULO", "ULO2"],

	staffUsername: "Select Username",
	staffPassword: "Enter Password",
};

// Profile searh form ?
export const defaultProfileSearchFormValues = {
	name: "",
	fathername: "",
	sex: null,
	age: "",
	ageRange: "",
	phone: "",
	rank: null,
	armynumber: "",
	unit: "",
	city: "",
	category: null,
};

export const defaultProfileSearchFormErrors = {
	age: false,
	ageRange: false,
};

export const defaultProfileSearchFormLabelValues = {
	name: "Patient Name",
	fathername: "Father's Name",

	sex: "Gender",
	sexOptions: ["Male", "Female"],

	phone: "Contact Number",
	age: "Age",
	ageRange: "Age Range (+-)",

	rank: "Rank",
	rankOptions: ["Lt", "Capt", "Maj", "Lt Col", "Col", "Brig", "Maj Gen", "Lt Gen", "Gen"],

	armynumber: "Army Number",
	unit: "Unit",

	city: "City",
	cityOptions: cities,

	category: "Patient Category",
	categoryOptions: ["Entitled", "War Wounded", "CNE", "Dependent"],
};

// Case search form
export const defaultCaseSearchFormValues = {
	caseId: "",
	caseType: null,

	startDate: undefined,
	endDate: undefined,
};

export const defaultCaseSearchFormErrors = {
	startDate: false,
	endDate: false,
};

export const defaultCaseSearchFormLabelValues = {
	caseId: "Case ID",
	caseType: "Case Type",
	caseTypeOptions: ["Prosthetic", "Orthotic", "Mechanical"],

	startDate: "Search From Date",
	endDate: "Search To Date",
};

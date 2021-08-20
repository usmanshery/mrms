let options = {
	dev: "dev",
	test: "test",
	depl: "depl",
}
window.env = options.depl;
window.serverUrls = {
	dev: "http://localhost:3001",
	test: "http://192.168.10.2:3001",
	depl: "http://www.mrms.com:3001",
}

window.devURL = "http://localhost:3001";
window.prodURL = "http://localhost:3001";
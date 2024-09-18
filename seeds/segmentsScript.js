const mongoose = require("mongoose");
const { names, location } = require("./seedHelper");
const { filterCategories } = require("../utils/filters");
const { seg } = require("./2024-09-18-segments");
const Statement = require("../models/statement");
const Segment = require("../models/segment");

mongoose.connect("mongodb://127.0.0.1:27017/oecd-case-law");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Segment.deleteMany();
	for (s of seg) {
		console.log(s);
		const statement = await Statement.findById(s.statement);
		console.log(statement);
		const segment = new Segment({
			body: s.body,
			filter: s.filter,
			subfilter: s.subfilter,
			statementTitle: statement.title,
			page: s.page,
		});
		statement.segments.push(segment);
		await segment.save();
		await statement.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});

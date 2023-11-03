const mongoose = require('mongoose');
const { names, actors, analysisOfNCP } = require('./seedHelper')
const Statement = require("../models/statement");

mongoose.connect('mongodb://127.0.0.1:27017/oecd-case-law');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Statement.deleteMany();
    for (n of names) {
        const statement = new Statement({
            title: n,
            actors: `${sample(actors)}`,
            analysisOfNCP: `${sample(analysisOfNCP)}`,
            summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero ad fuga voluptas in vel culpa sit ab quisquam inventore dicta perferendis esse, debitis voluptates maxime voluptatum consectetur expedita illo.",
            location: "Netherlands",
            author: "6543d6b221c5a1521954535b"
        })
        await statement.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
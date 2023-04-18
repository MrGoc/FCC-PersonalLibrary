require("dotenv").config();
const mongoose = require("mongoose");
const mySecret = process.env["MONGO_URI"];

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

let booksShema = new mongoose.Schema({
  title: { type: String, required: true },
  //commentcount: { type: Number, required: false },
  comments: [{ type: String, required: false }],
});
let Book = mongoose.model("Book", booksShema, "books");

exports.Book = Book;

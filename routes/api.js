/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const books = require("./../models/books.js");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let arr = [];
      books.Book.find().then((books) => {
        books.forEach((book) => {
          arr.push({
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length,
          });
        });
        res.json(arr);
      });
    })

    .post(function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) res.send("missing required field title");
      else {
        let book = new books.Book({
          title: title,
          comments: [],
        });
        book.save().then((data) => res.json(data));
      }
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      books.Book.deleteMany()
        .then((result) => {
          if (result.deletedCount > 0) res.send("complete delete successful");
          else res.send("nothing to delete");
        })
        .catch((err) => {
          res.send(err);
        });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      books.Book.findById(bookid).then((book) => {
        if (!book) res.send("no book exists");
        else res.json(book);
      });
    })

    .post(function (req, res) {
      //json res format same as .get
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) res.send("missing required field comment");
      else {
        books.Book.findById(bookid).then((book) => {
          if (!book) res.send("no book exists");
          else {
            book.comments.push(comment);
            book
              .save()
              .then((data) => res.json(data))
              .catch((err) => res.send(err));
          }
        });
      }
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      books.Book.deleteOne({ _id: bookid })
        .then((result) => {
          if (result.deletedCount === 1) res.send("delete successful");
          else res.send("no book exists");
        })
        .catch((err) => {
          res.send(err);
        });
    });
};

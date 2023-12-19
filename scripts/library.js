const bookName = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookGenre = document.getElementById('book-genre');
const bookPages = document.getElementById('book-pages');
const bookRead = document.getElementById('book-read');
const submitBtn = document.getElementById('submit');

const bookArray = [];

function Book(title, author, genre, pages, read = false) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read ? "read" : "not read";
}
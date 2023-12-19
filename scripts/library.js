function Book(title, author, genre, pages, read = false) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read ? "read" : "not read";
}
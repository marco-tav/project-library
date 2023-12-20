const bookTitle = document.getElementById('book-title');
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
  this.pages = +pages;
  this.read = read ? "read" : "not read";
}

function createAndStoreBook(title, author, genre, pages, read, arr) {
  let book = new Book(title, author, genre, pages, read);
  arr.push(book);
}

function resetInput(titleInput, authorInput, genreInput, pagesInput, readInput) {
  titleInput.value = "";
  authorInput.value = "";
  genreInput.value = "";
  pagesInput.value = "";
  readInput.checked = true;
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(!bookTitle.value || !bookAuthor.value) {
    alert('You need to include a title and an author!');
  } else {
    createAndStoreBook(bookTitle.value, bookAuthor.value, bookGenre.value, bookPages.value, bookRead.checked, bookArray);
    resetInput(bookTitle, bookAuthor, bookGenre, bookPages, bookRead);
  }
})
/* ---------------- FUNCTION DECLARATIONS ------------------ */

function Book(title, author, genre, pages, read = false, onDisplay = false) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = +pages;
  this.read = read ? "read" : "not read";
  this.onDisplay = onDisplay;
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

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const title = document.createElement('h2');
  title.innerText = book.title;
  bookCard.appendChild(title);

  const author = document.createElement('p');
  author.innerText = book.author;
  bookCard.appendChild(author);

  const genre = document.createElement('p');
  genre.innerText = book.genre;
  bookCard.appendChild(genre);

  const pages = document.createElement('p');
  pages.innerText = `${book.pages}`;
  bookCard.appendChild(pages);

  const wasRead = document.createElement('p');
  wasRead.innerText = book.read;
  bookCard.appendChild(wasRead);

  const controlsDiv = document.createElement('div');
  controlsDiv.classList.add('card-controls');

  const readBtn = document.createElement('button');
  readBtn.innerText = 'mark as read';
  controlsDiv.appendChild(readBtn);

  const removeBookBtn = document.createElement('button');
  removeBookBtn.innerText = 'remove';
  controlsDiv.appendChild(removeBookBtn);

  bookCard.appendChild(controlsDiv);

  return bookCard;
}

/* ------------------------ MAIN PROGRAM ------------------ */

const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookGenre = document.getElementById('book-genre');
const bookPages = document.getElementById('book-pages');
const bookRead = document.getElementById('book-read');
const submitBtn = document.getElementById('submit');
const booksContainer = document.querySelector('.books-container');

const bookArray = [];

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(!bookTitle.value || !bookAuthor.value) {
    alert('You need to include a title and an author!');
  } else {
    createAndStoreBook(bookTitle.value, bookAuthor.value, bookGenre.value, bookPages.value, bookRead.checked, bookArray);
    resetInput(bookTitle, bookAuthor, bookGenre, bookPages, bookRead);
  }

  bookArray.forEach((book) => {
    const bookCard = createBookCard(book);
    if(!book.onDisplay) {
      booksContainer.appendChild(bookCard);
      book.onDisplay = true;
    }
  })
})
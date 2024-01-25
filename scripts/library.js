/* ---------------- FUNCTION AND CLASS DECLARATIONS ------------------ */

class Book {
  constructor(title, author, genre, pages, read = false, onDisplay = false) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = +pages;
    this.read = read ? "read" : "not read";
    this.onDisplay = onDisplay;
  }

  toggleRead = function() {
    if(this.read === "not read") {
      this.read = "read";
    } else {
      this.read = "not read";
    }
  }
}

function createAndStoreBook(title, author, genre, pages, read, arr) {
  let book = new Book(title, author, genre, pages, read);
  arr.push(book);
  return book;
}

function resetInput(titleInput, authorInput, genreInput, pagesInput, readInput) {
  titleInput.value = "";
  authorInput.value = "";
  genreInput.value = "";
  pagesInput.value = "";
  readInput.checked = true;
}

function createBookCard(book, array) {
  let bookIndex = array.indexOf(book);

  const bookCard = document.createElement('div');
  bookCard.setAttribute('data-index', bookIndex);
  bookCard.classList.add('book-card');
  if (book.read === 'read') {
    bookCard.classList.add('book-card-read');
  } else {
    bookCard.classList.add('book-card-not-read');
  }

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
  readBtn.setAttribute('data-index', bookIndex);
  readBtn.innerText = 'mark as read';
  controlsDiv.appendChild(readBtn);

  const removeBookBtn = document.createElement('button');
  removeBookBtn.setAttribute('data-index', bookIndex);
  removeBookBtn.innerText = 'remove';
  controlsDiv.appendChild(removeBookBtn);

  bookCard.appendChild(controlsDiv);

  return bookCard;
}

function shiftDataIndex(bookCard, index) {
  let dataIndex = bookCard.getAttribute('data-index');
  if (dataIndex > index) {
    const markRead = document.querySelector(`.book-card[data-index="${dataIndex}"] button:first-child`);
    const remove = document.querySelector(`.book-card[data-index="${dataIndex}"] button:last-child`);

    dataIndex = dataIndex - 1;

    bookCard.setAttribute('data-index', dataIndex);
    markRead.setAttribute('data-index', dataIndex);
    remove.setAttribute('data-index', dataIndex);
  }
}

function switchReadClass(book, card) {
  if(book.read === 'read') {
    card.classList.remove('book-card-not-read');
    card.classList.add('book-card-read');
  } else {
    card.classList.remove('book-card-read');
    card.classList.add('book-card-not-read');
  }
}

function removeBook(arr, card, index) {
  arr.splice(index, 1);
  card.remove();
}

/* ------------------------ MAIN PROGRAM ------------------ */

const libraryApp = (function() {
  
  const titleInput = document.getElementById('book-title');
  const authorInput = document.getElementById('book-author');
  const genreInput = document.getElementById('book-genre');
  const pagesInput = document.getElementById('book-pages');
  const readInput = document.getElementById('book-read');
  const submitBtn = document.getElementById('submit');
  const booksContainer = document.querySelector('.books-container');

  const bookArray = [];

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(!titleInput.value || !authorInput.value) {
      alert('You need to include a title and an author!');
    } else {
      const book = createAndStoreBook(titleInput.value, authorInput.value, genreInput.value, pagesInput.value, readInput.checked, bookArray);

      let index = bookArray.indexOf(book);

      const bookCard = createBookCard(book, bookArray);
      booksContainer.appendChild(bookCard);

      const markReadBtn = document.querySelector(`.book-card[data-index="${index}"] button:first-child`);
      const removeBtn = document.querySelector(`.book-card[data-index="${index}"] button:last-child`);
      const readPara = document.querySelector(`.book-card[data-index="${index}"] p:last-of-type`);

      removeBtn.addEventListener('click', (e) => {
        let removeIndex = removeBtn.getAttribute('data-index');
        removeBook(bookArray, bookCard, removeBtn, removeIndex);
        
        const bookCards = document.querySelectorAll('div.book-card');
        
        bookCards.forEach((card) => {
          shiftDataIndex(card, removeIndex);
        })
      })

      markReadBtn.addEventListener('click', (e) => {
        book.toggleRead();
        readPara.innerText = book.read;
        switchReadClass(book, bookCard);
      })

      resetInput(titleInput, authorInput, genreInput, pagesInput, readInput);
    }
  })
})();
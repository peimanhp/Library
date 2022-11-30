// grab form new item elements
const newTitle = document.getElementById("new_title");
const newAuthor = document.getElementById("new_author");
const newPages = document.getElementById("new_pages");
const isRead = document.getElementById("read_it");
const submit = document.getElementById("submit");
const overlay = document.getElementById("overlay");
const modal = document.querySelector(".my-modal");

// grabbing library elements
const book = document.getElementById("book");
const numbers = document.getElementById("number");
const title = document.getElementById("book_title");
const author = document.getElementById("book_author");
const pages = document.getElementById("book_pages");
const readToggle = document.getElementById("read_switch");
const newItem = document.querySelector(".new-item");
const addNew = document.getElementById("add_new");
const parentBooks = document.getElementById("parent_books");

function Book(num, title, author, pages, read) {
  this.num = num;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `No. ${this.num}: ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

// Book.prototype.insertInArray

let myLibrary = [];

newItem.addEventListener("click", showModal);
function showModal() {
  overlay.classList.add("show");
  modal.classList.add("show");
}

overlay.addEventListener("click", removeModal);
function removeModal(e) {
  if (overlay !== e.target) return;
  overlay.classList.remove("show");
  modal.classList.remove("show");
}

submit.addEventListener("click", addNewBook);

let bookNumber = 1;

function addNewBook() {
  numbers.innerText = `No. ${bookNumber}`;
  title.innerText = newTitle.value;
  author.innerText = `Author: ${newAuthor.value}`;
  pages.innerText = `Pages: ${newPages.value}`;
  readToggle.checked = isRead.checked;

  const newBook = new Book(
    bookNumber,
    newTitle.value,
    newAuthor.value,
    newPages.value,
    isRead.checked
  );
  myLibrary.push(newBook);
  console.log(newBook.info());

  let clone = book.cloneNode(true); // "deep" clone
  clone.id = "book" + bookNumber++;
  parentBooks.insertBefore(clone, addNew);

  overlay.classList.remove("show");
  modal.classList.remove("show");
}

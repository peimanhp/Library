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
const numbers = document.querySelector(".number");
const nums = document.getElementsByClassName("number");
const title = document.querySelector(".book-title");
const author = document.querySelector(".book-author");
const pages = document.querySelector(".book-pages");
const readToggle = document.querySelector(".read-switch");
const newItem = document.querySelector(".new-item");
const addNew = document.getElementById("add_new");
const parentBooks = document.getElementById("parent_books");
const remove = document.getElementsByClassName("remove");

function Book(num, title, author, pages, read, bookId) {
  this.num = num;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookId = bookId;
}

Book.prototype.info = function () {
  return `No. ${this.num}: ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

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

submit.addEventListener("click", addNewBookToArray);

let bookNumber = 1;

function addNewBookToArray() {
  const newBook = new Book(
    bookNumber,
    newTitle.value,
    newAuthor.value,
    newPages.value,
    isRead.checked,
    "book" + bookNumber
  );
  myLibrary.push(newBook);
  console.log(myLibrary);

  addBookToLibrary();
}

function addBookToLibrary() {
  let books = document.getElementById(`book${bookNumber}`);
  console.log(books);

  numbers.innerText = `No. ${bookNumber}`;
  title.innerText = myLibrary[bookNumber - 1].title;
  author.innerText = `Author: ${myLibrary[bookNumber - 1].author}`;
  pages.innerText = `Pages: ${myLibrary[bookNumber - 1].pages}`;
  readToggle.checked = myLibrary[bookNumber - 1].read;

  let clone = book.cloneNode(true);
  clone.id = "book" + bookNumber++;
  clone.querySelector(".remove").addEventListener("click", removeBook);
  clone
    .querySelector(".read-switch")
    .addEventListener("click", changeReadStatus);
  parentBooks.insertBefore(clone, addNew);

  newTitle.value = '';
  newAuthor.value = '';
  newPages.value = '';
  isRead.checked = false;

  overlay.classList.remove("show");
  modal.classList.remove("show");
}

function removeBook(e) {
  // remove in html dom
  const bookId = e.target.parentNode.parentNode.parentNode.parentNode.id;
  document.getElementById(bookId).remove();
  // remove from array
  let indexOfRemoved = myLibrary.findIndex((x) => x.bookId === bookId);
  myLibrary.splice(indexOfRemoved, 1);
  // rename array object.nums
  myLibrary.forEach((obj) => {
    if (obj.num > indexOfRemoved) {
      obj.num--;
    }
  });
  // rename title of each card
  for (let i = 0; i < nums.length; i++) {
    nums[i].innerText = `No. ${i}`;
  }
  bookNumber--;
  console.log(myLibrary);
}

function changeReadStatus(e) {
  let bookId =
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  let indexInArray = myLibrary.findIndex((x) => x.bookId === bookId);
  if (myLibrary[indexInArray].read) myLibrary[indexInArray].read = false;
  else myLibrary[indexInArray].read = true;
}

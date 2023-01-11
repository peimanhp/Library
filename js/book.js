import { createModal } from "./modal.js";

// grabbing library elements
const nums = document.getElementsByClassName("number");
const newItem = document.querySelector(".new-item");
const addNew = document.getElementById("add_new");
const parentBooks = document.getElementById("parent_books");

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

let bookNumber = 1;

function bookNumberPlusOne() {
  bookNumber++;
}

newItem.addEventListener("click", createModal);

let books = [];

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
    nums[i].innerText = `No. ${i + 1}`;
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

export {
  Book,
  myLibrary,
  parentBooks,
  addNew,
  changeReadStatus,
  books,
  bookNumberPlusOne,
  bookNumber,
  removeBook,
};

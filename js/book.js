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

newItem.addEventListener("click", createModal);

let bookNumber = 1;

let books = [];

function addBookToLibrary() {
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

  const bookElement = document.getElementById(`book${bookNumber - 1}`);
  books.push(bookElement);
  console.log(books);
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

// modal --> new item window
function createModal() {
  const hideModalOnSecape = function (e) {
    if (e.key == "Escape") {
      hideModal();
    }
  };

  function hideModal() {
    modalContainer.classList.remove("show");
    form.classList.remove("show");
    setTimeout(() => {
      modalContainer.remove();
    }, 500);
    document.removeEventListener("keyup", hideModalOnSecape);
  }

  setTimeout(() => {
    modalContainer.classList.add("show");
    form.classList.add("show");
  }, 1);

  const modalContainer = document.createElement("div");
  modalContainer.classList.add(
    "overlay",
    "rounded-3",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  modalContainer.setAttribute("id", "overlay");
  document.body.appendChild(modalContainer);

  const form = document.createElement("form");
  form.classList.add("my-modal", "shadow", "text-center");
  modalContainer.appendChild(form);

  const modalTitle = document.createElement("h3");
  modalTitle.classList.add("mb-4");
  modalTitle.innerText = "Add new book";
  modalTitle.setAttribute("id", "add_new_book");
  form.appendChild(modalTitle);

  const titleInput = document.createElement("input");
  titleInput.classList.add("form-control", "my-3");
  titleInput.setAttribute("placeholder", "Title");
  titleInput.setAttribute("id", "new_title");
  form.appendChild(titleInput);

  const authorInput = document.createElement("input");
  authorInput.classList.add("form-control", "my-3");
  authorInput.setAttribute("placeholder", "Author");
  authorInput.setAttribute("id", "new_author");
  form.appendChild(authorInput);

  const pagesInput = document.createElement("input");
  pagesInput.classList.add("form-control", "my-3");
  pagesInput.setAttribute("placeholder", "Pages");
  pagesInput.setAttribute("id", "new_pages");
  form.appendChild(pagesInput);

  const readContainer = document.createElement("div");
  readContainer.classList.add("d-flex", "justify-content-center");
  form.appendChild(readContainer);

  const readTitle = document.createElement("p");
  readTitle.innerText = "have you read it?";
  readContainer.appendChild(readTitle);

  const modalReadCheck = document.createElement("input");
  modalReadCheck.classList.add("form-check-input", "ms-3");
  modalReadCheck.setAttribute("type", "checkbox");
  modalReadCheck.setAttribute("value", "false");
  modalReadCheck.setAttribute("id", "read_it");
  readContainer.appendChild(modalReadCheck);

  const submitBtn = document.createElement("input");
  submitBtn.classList.add("btn", "btn-outline-success", "px-4");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "submit");
  submitBtn.setAttribute("id", "submit");
  form.appendChild(submitBtn);

  modalContainer.addEventListener("click", removeModal);
  function removeModal(e) {
    if (modalContainer !== e.target) return;
    hideModal();
  }

  document.addEventListener("keyup", hideModalOnSecape);

  submitBtn.addEventListener("click", addNewBookToArray);

  function addNewBookToArray(e) {
    const newBook = new Book(
      bookNumber,
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      modalReadCheck.checked,
      "book" + bookNumber
    );
    myLibrary.push(newBook);
    console.log(myLibrary);

    addBookToLibrary();
    hideModal();
    e.preventDefault();
  }
}

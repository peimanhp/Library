import {
  myLibrary,
  parentBooks,
  addNew,
  changeReadStatus,
  books,
  bookNumberPlusOne,
  bookNumber,
  removeBook,
} from "./book.js";

export function addNewBookInDOM() {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("col", "col-3", "mb-3");
  bookContainer.setAttribute("id", `${myLibrary[bookNumber - 1].bookId}`);
  parentBooks.insertBefore(bookContainer, addNew);

  const innerContainer = document.createElement("div");
  innerContainer.classList.add(
    "card",
    "h-100",
    "text-bg-light",
    "rounded-4",
    "mx-auto"
  );
  innerContainer.style.maxWidth = "18rem";
  bookContainer.appendChild(innerContainer);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add(
    "card-header",
    "rounded-top-4",
    "d-flex",
    "justify-content-between"
  );
  innerContainer.appendChild(cardHeader);

  const bookNum = document.createElement("p");
  bookNum.classList.add("m-0", "number");
  bookNum.innerText = `No. ${bookNumber}`;
  cardHeader.appendChild(bookNum);

  const removeBtn = document.createElement("div");
  removeBtn.classList.add("remove");
  removeBtn.addEventListener("click", removeBook);

  cardHeader.appendChild(removeBtn);

  const removeSVG = document.createElement("img");
  removeSVG.setAttribute("src", "./resources/x-circle.svg");
  removeSVG.setAttribute("alt", "remove");
  removeBtn.appendChild(removeSVG);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  innerContainer.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "book-title");
  cardTitle.innerText = myLibrary[bookNumber - 1].title;
  cardBody.appendChild(cardTitle);

  const cardAuthor = document.createElement("p");
  cardAuthor.classList.add("mb-1", "book-author");
  cardAuthor.innerText = `Author: ${myLibrary[bookNumber - 1].author}`;
  cardBody.appendChild(cardAuthor);

  const cardPages = document.createElement("p");
  cardPages.classList.add("mb-2", "book-pages");
  cardPages.innerText = `Pages: ${myLibrary[bookNumber - 1].pages}`;
  cardBody.appendChild(cardPages);

  const readCheckContainer = document.createElement("div");
  readCheckContainer.classList.add("form-check", "form-switch", "mb-2");
  cardBody.appendChild(readCheckContainer);

  const switchLable = document.createElement("lable");
  switchLable.classList.add("form-check-label");
  switchLable.setAttribute("for", "read_switch");
  switchLable.innerText = "Read";
  readCheckContainer.appendChild(switchLable);

  const readSwitch = document.createElement("input");
  readSwitch.classList.add("form-check-input", "read-switch");
  readSwitch.setAttribute("type", "checkbox");
  readSwitch.setAttribute("role", "switch");
  readSwitch.checked = myLibrary[bookNumber - 1].read;
  readSwitch.addEventListener("click", changeReadStatus);
  switchLable.appendChild(readSwitch);

  const bookElement = document.getElementById(
    `${myLibrary[bookNumber - 1].bookId}`
  );
  books.push(bookElement);
  console.log(books);
  bookNumberPlusOne();
}

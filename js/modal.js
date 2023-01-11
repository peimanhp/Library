import { Book, myLibrary, bookNumber } from "./book.js";
import { addNewBookInDOM } from "./newBookDOM.js";

export function createModal() {
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
    e.preventDefault();

    // necessary filling fields
    const titleValue = document.getElementById("new_title").value;
    if (titleValue.trim() == "") {
      alert("title is empty");
      return;
    }
    const authorValue = document.getElementById("new_author").value;
    if (authorValue.trim() == "") {
      alert("author is empty");
      return;
    }
    const pagesValue = document.getElementById("new_pages").value;
    if (pagesValue.trim() == "") {
      alert("pages is empty");
      return;
    }

    const newBook = new Book(
      bookNumber,
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      modalReadCheck.checked,
      bookId()
    );
    myLibrary.push(newBook);
    console.log(myLibrary);

    addNewBookInDOM();
    hideModal();
  }

  function bookId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
  }
}

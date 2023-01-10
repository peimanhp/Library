import { Book, bookNumber, myLibrary, addBookToLibrary } from "./book.js";

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

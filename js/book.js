function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;  
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const book1 = new Book('mid', 'fit', 285, 'red');
const book2 = new Book("peimans diary", "peiman", 2, "not red");
console.log(book1.info());

let myLibrary = [];


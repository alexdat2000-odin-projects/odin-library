let books = [
    new Book("The Hobbit", "J.R.R. Tolkien", 295, false),
    new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, true)
];


function Book(title, author, pages, is_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.is_read = is_read;
}


function toggleRead(book_id) {
    books[book_id].is_read ^= true;
}

function deleteBook(book_id) {
    books.splice(book_id, 1);
}


function updateTable() {
    const table = document.querySelector("#book-table");

    table.innerHTML = `<thead>
        <tr>
          <th style="width: 20%">Name</th>
          <th style="width: 20%">Author</th>
          <th style="width: 20%">Number of pages</th>
          <th style="width: 20%">Is read?</th>
          <th style="width: 20%">Delete</th>
        </tr>
      </thead>`

    for (let book_id = 0; book_id < books.length; book_id++) {
        table.innerHTML += `
      <tr>
        <td>${books[book_id].title}</td>
        <td>${books[book_id].author}</td>
        <td>${books[book_id].pages}</td>
        <td><button class="read-button ${books[book_id].is_read ? "read" : "not-read"}"
        onclick="toggleRead(${book_id})">${books[book_id].is_read ? "Read" : "Not read"}</button></td>
        <td><button class="delete-button" onclick="deleteBook(${book_id})">Delete</button></td>
      </tr>
`
    }
}

function clearInputs() {
    document.getElementById("input-title").value = "";
    document.getElementById("input-author").value = "";
    document.getElementById("input-pages").value = "";
    document.getElementById("input-is-read").checked = false;
}

function init() {
    updateTable();

    const bodyElement = document.querySelector("body");
    bodyElement.addEventListener("click", updateTable);

    const modalElement = document.getElementById("modal");
    const openBtn = document.getElementById("open-modal-button");
    openBtn.addEventListener("click", () => {
        modalElement.showModal();
    });

    const cancelBtn = document.getElementById("modal-cancel");
    cancelBtn.addEventListener("click", () => {
        modalElement.close();
        clearInputs();
    });

    const addBtn = document.getElementById("modal-add-book");
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        books.push(new Book(
            document.getElementById("input-title").value,
            document.getElementById("input-author").value,
            document.getElementById("input-pages").value,
            document.getElementById("input-is-read").checked,
        ));
        modalElement.close();
        clearInputs();
    });
}


document.addEventListener("DOMContentLoaded", init);

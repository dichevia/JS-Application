import { get, post, put, del } from "./requester.js";

const html = {
    "getAllBooks": () => document.querySelector("tbody"),
    "getBookTitle": () => document.getElementById("title"),
    "getBookAuthor": () => document.getElementById("author"),
    "getBookISBN": () => document.getElementById("isbn"),
    "getFormTitle": () => document.querySelector("form h3"),
    "getFormSubmitBtn": () => document.querySelector("form button"),
    "getEditId": () => document.getElementById("edit-id"),
}

const actions = {
    "loadBooks": async function () {
        try {
            const books = await get("appdata", "books");
            const booksContainer = html.getAllBooks();
            const fragment = document.createDocumentFragment();

            html.getFormTitle().textContent = "CREATE FORM";
            html.getFormSubmitBtn().textContent = "CREATE";
            html.getFormSubmitBtn().id = "createBook";

            books.forEach(book => {
                const tr = document.createElement("tr");
                const titleTd = document.createElement("td");
                const authorTd = document.createElement("td");
                const isbnTd = document.createElement("td");
                const actionsTd = document.createElement("td");
                const editBtn = document.createElement("button");
                const deleteBtn = document.createElement("button");

                titleTd.textContent = book.title;
                authorTd.textContent = book.author;
                isbnTd.textContent = book.isbn;

                editBtn.textContent = "Edit";
                editBtn.id = book._id;
                editBtn.addEventListener("click", this["editBookGet"]);

                deleteBtn.textContent = "Delete";
                deleteBtn.id = book._id;
                deleteBtn.addEventListener("click", this["deleteBook"]);

                actionsTd.append(editBtn, deleteBtn);
                tr.append(titleTd, authorTd, isbnTd, actionsTd);
                fragment.appendChild(tr);
            });

            booksContainer.innerHTML = "";
            booksContainer.appendChild(fragment);
        } catch (error) {
            alert(error);
        }
    },
    "createBook": async function () {
        const title = html.getBookTitle();
        const author = html.getBookAuthor();
        const isbn = html.getBookISBN();

        const data = {
            title: title.value,
            author: author.value,
            isbn: isbn.value
        }

        try {
            const response = await post("appdata", "books", data);
        } catch (error) {
            alert(error)
        }

        title.value = "";
        author.value = "";
        isbn.value = "";

        this["loadBooks"]();
    },
    "editBookGet": async function () {
        const id = this.id;

        try {
            html.getFormTitle().textContent = "EDIT FORM";
            html.getFormSubmitBtn().textContent = "EDIT";
            html.getFormSubmitBtn().id = "editBookPost";

            const singleBook = await get("appdata", `books/${id}`);

            const bookId = html.getEditId();
            const title = html.getBookTitle();
            const author = html.getBookAuthor();
            const isbn = html.getBookISBN();

            title.value = singleBook.title;
            author.value = singleBook.author;
            isbn.value = singleBook.isbn;
            bookId.value = singleBook._id;
        } catch (error) {
            alert(error);
        }
    },
    "editBookPost": async function () {
        const bookId = html.getEditId();
        const title = html.getBookTitle();
        const author = html.getBookAuthor();
        const isbn = html.getBookISBN();

        const data = {
            title: title.value,
            author: author.value,
            isbn: isbn.value,
        }

        try {
            const modifiedBook = await put("appdata", `books/${bookId.value}`, data);
            actions["loadBooks"]();
        } catch (error) {
            alert(error);
        }
        title.value = "";
        author.value = "";
        isbn.value = "";
    },
    "deleteBook": async function () {
        if (confirm("Are you sure you want to delete this book?")) {
            const id = this.id;
            try {
                const deletedEntities = await del("appdata", `books/${id}`);

                actions["loadBooks"]();
            } catch (error) {
                alert(error);
            }
        }
    }
}

function handleEvent(e) {
    e.preventDefault();
    if (typeof actions[e.target.id] === "function") {
        actions[e.target.id]();
    }
}

(function attachEvents(e) {
    document.addEventListener("click", handleEvent);
}())
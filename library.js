let library = [];
const btn_newbook = document.getElementById('btn_newbook');
const form = document.getElementById('form');
const btn_add = document.getElementById('btn_add');
const pages_text = document.getElementById('pages');
const btn_view = document.getElementById('btn_view');
const library_text = document.getElementById('library');


btn_newbook.addEventListener('click', visibleForm);
btn_add.addEventListener('click', addBookFromSite);
pages_text.addEventListener('input', () => {pages_text.value = pages_text.value.replace(/[^\d]/g, '')});
btn_view.addEventListener('click', viewBooks);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
}

function showBookFromLibrary(library) {
    let str = '';
    library.forEach((item) => str += `The ${item.title} by ${item.author}, ${item.pages} pages, ${(item.read) ? 'read' : 'not read'}\n`);
    return str;
}

function showBook(book_from_library) {
    let str = '';
    str += `The ${book_from_library.title} by ${book_from_library.author}, ${book_from_library.pages} pages, ${book_from_library.read}\n`;
    return str;
}

function visibleForm() {
    (form.style.display == 'flex') ? form.style.display = 'none' : form.style.display = 'flex';
}

function addBookFromSite() {
    const title_text = document.getElementById('title');
    const author_text = document.getElementById('author');
    const pages_text = document.getElementById('pages');
    const read_text = document.getElementById('read');
    if (title_text.value == '' || author_text.value == '' || pages_text.value == '' || read_text.value == '') {
        event.preventDefault();
    }
    else {
        addBookToLibrary(title_text.value, author_text.value, pages_text.value, read_text.value);
        viewBooks();
        event.preventDefault();
    }
}

function viewBooks() {
    const div_library = document.getElementById('library');
    div_library.innerText = '';
    for (let i = 0; i < library.length; i++) {
        const book = document.createElement('div');
        const btn_delete_book = document.createElement('button');
        const btn_read_book = document.createElement('button');
        book.setAttribute('data-index', `${i}`);
        btn_delete_book.classList.add('btn_book_delete');
        btn_read_book.classList.add('btn_read_delete');
        book.innerText = `${i+1}. ${showBook(library[i])}`;
        btn_delete_book.innerText = 'Delete';
        btn_read_book.innerText = 'Read';
        div_library.appendChild(book);
        book.classList.add('book');
        book.appendChild(btn_delete_book);
        book.appendChild(btn_read_book);
        const deleteButtons = document.querySelectorAll('.btn_book_delete');
        const readButtons = document.querySelectorAll('.btn_read_delete');
        deleteButtons.forEach(button => button.addEventListener('click', remove));
        readButtons.forEach(button => button.addEventListener('click', read));
    }
    event.preventDefault();
}

function read() {
    const bookDiv = this.parentElement;
    const bookIndex = bookDiv.getAttribute('data-index');
    library[bookIndex].read = 'read';
    viewBooks();

}

function remove() {
    const bookDiv = this.parentElement;
    const bookIndex = bookDiv.getAttribute('data-index');
    library.splice(bookIndex-1, 1);
    viewBooks();
}


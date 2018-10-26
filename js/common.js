/* eslint linebreak-style: ['error', 'windows'] */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-env jquery*/

let booksArray = {};

$(document).ready(() => {
  const btnAddBook = document.querySelector('#modal-add-book-ok');
  btnAddBook.addEventListener('click', addBookToLibrary);

  const saveBooks = localStorage.getItem('library');

  if (saveBooks) {
    booksArray = JSON.parse(saveBooks);
  }

  // for (let i = 0; i < booksArray.length; i++) {
  //   drawBook(booksArray[0]);
  // }
  for (const key in booksArray) {
    drawBook(key);
  }
});

const addBookToLibrary = function () {
  const newArr = {};
  const formData = $('form').serializeArray(); // take all inputs which have "name" and create array

  // console.log(formData);

  for (let i = 0; i < formData.length; i++) {
    const {
      name, // formData[i]['name'];
      value,
    } = formData[i];

    newArr[name] = value;
  }

  // console.log(newArr);

  const data = $(this).attr('data'); // document.querySelector('btn that was clicked (e.target)').getAttribute('data')

  if (data === undefined) {
    // console.log(data);
    const randomAtricle = Math.round(Math.random() * 100);
    booksArray[randomAtricle] = newArr;
    drawBook(randomAtricle);
  } else {
    console.log(data);
    booksArray[data] = newArr;
    drawBook(data);
  }

  console.log(booksArray);

  $('#modal-add-book').modal('hide');

  localStorage.setItem('library', JSON.stringify(booksArray));
};

const drawBook = (id) => {
  const bookDataArr = $(`.book[data = ${id}]`);
  // console.log(bookDataArr);

  const {
    book_cover, // booksArray[id]['book_cover'];
    book_name,
    book_year,
    book_author,
  } = booksArray[id];

  if (bookDataArr.length === 0) {
    const div = document.createElement('div');
    div.className = 'col-lg-4 book';
    div.setAttribute('data', id);

    const cover = document.createElement('div');
    cover.className = 'book-cover';
    cover.style.backgroundImage = `url(${book_cover})`;

    const bookName = document.createElement('h3');
    bookName.className = 'book-name';
    bookName.innerHTML = book_name;

    const bookAuthor = document.createElement('h5');
    bookAuthor.className = 'book-author';
    bookAuthor.innerHTML = book_author;

    const bookYear = document.createElement('p');
    bookYear.className = 'book-year';
    bookYear.innerHTML = book_year;

    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn btn-success btn-edit';
    btnEdit.innerHTML = 'Edit';
    btnEdit.setAttribute('data', id);
    btnEdit.addEventListener('click', editBook);

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-danger btn-delete';
    btnDelete.innerHTML = 'Delete';
    btnDelete.setAttribute('data', id);
    btnDelete.addEventListener('click', deleteBook);

    div.appendChild(cover);
    div.appendChild(bookName);
    div.appendChild(bookAuthor);
    div.appendChild(bookYear);
    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    document.querySelector('.book-panel').appendChild(div);
  } else {
    const bookCover = bookDataArr.find('.book-cover');
    bookCover.css({'background-image': `url(${book_cover})`}); // bookCover.style.backgroundImage = `url('${book_cover}')`;

    // console.log(book_name);

    const bookName = bookDataArr.find('.book-name').eq(0);
    bookName.html(book_name); // bookName.innerHTML = book_name;

    const bookAuthor = bookDataArr.find('.book-author').eq(0);
    bookAuthor.html(book_author);

    const bookYear = bookDataArr.find('.book-year').eq(0);
    bookYear.html(book_year);

    document.querySelector('#modal-add-book-ok').removeAttribute('data');
  }
};

const editBook = function () {
  const data = $(this).attr('data'); // document.querySelector('btn that was clicked').getAttribute('data')
  // console.log(data);

  const {
    book_name, // booksArray[data]['book_name'];
    book_author,
    book_year,
    book_cover,
  } = booksArray[data];

  // show modal
  $('#modal-add-book').modal('show'); // bootstrap jquery

  document.querySelector('#book_name').value = book_name;
  document.querySelector('#book_author').value = book_author;
  document.querySelector('#book_year').value = book_year;
  document.querySelector('#book_cover').value = book_cover;

  document.querySelector('#modal-add-book-ok').setAttribute('data', data);
};

const deleteBook = function () {
  $(this).parent('.book').remove();

  const data = $(this).attr('data');
  delete booksArray[data];

  localStorage.setItem('library', JSON.stringify(booksArray));
};

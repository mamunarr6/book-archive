const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');
const bookContainer = document.getElementById('book-container');
const resultContainer = document.getElementById('result-container');
const error = document.getElementById('error');

// event handler 
searchButton.addEventListener('click', () => {
    const searchText = searchField.value;
    bookContainer.textContent = '';
    searchField.value = '';
    resultContainer.textContent = '';
    error.textContent = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    // error handle
    if (searchText.length < 2) {
        error.innerHTML = `
            <h1 class="text-center">No Found Result</h1>
            `;
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs));


    }
});

// display book list
const displayBook = booksData => {
    const books = booksData.slice(0, 25);

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-5', 'bg-light', 'ms-5', 'me-5', 'my-3');
        div.innerHTML = `
            <div class="d-flex">
                <div class="rounded ">
                    <img style="width: 150px; height: 200px; border-radius: 2px;"
                        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
                </div>
                <div class="my-4 ms-4">
                    <h4 class="text-secondary fw-1">Name: ${book.title ? book.title : ''}</h4>
                    <p class="text-secondary">Author: ${book?.author_name?.[0] ? book?.author_name?.[0] : ''}</p>
                    <p class="text-secondary">Publisher: ${book?.publisher?.[0] ? book?.publisher?.[0] : ''}</p>
                    <p class="text-secondary">First publish: ${book.first_publish_year ? book.first_publish_year : ''}</p>
                </div>
            </div>
        `;
        bookContainer.appendChild(div);
    });

    resultShow(booksData);
}

// result show by number
const resultShow = data => {
    if (data.length == 0) {
        // error
        error.innerHTML = `
            <h1 class="text-center">No Found Result</h1>
            `;
    } else {
        // result
        const resultNumber = document.createElement('div');
        resultNumber.innerHTML = `
    <h1 class="text-center">Result : ${data.length}</h1>
    `;
        resultContainer.appendChild(resultNumber);
    }
}

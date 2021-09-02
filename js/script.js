const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');
const bookContainer = document.getElementById('book-container');

searchButton.addEventListener('click', () => {
    const searchText = searchField.value;
    bookContainer.textContent = '';
    searchField.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs));

});

const displayBook = books => {
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col-5', 'bg-light', 'ms-5', 'me-5', 'my-3');
        div.innerHTML = `
            <div class="d-flex onclick="loadCoverI('${book.cover_i}')">
                <div class="rounded ">
                    <img style="width: 150px; height: 200px; border-radius: 2px;"
                        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
                </div>
                <div class="my-4 ms-4">
                    <h4 class="text-secondary fw-1">name: ${book.title}</h4>
                    <p class="text-secondary">author: ${book?.author_name?.[0]}</p>
                    <p class="text-secondary">publisher: ${book?.publisher?.[0]}</p>
                    <p class="text-secondary">first publish: ${book.first_publish_year}</p>
                </div>
            </div>
        `;
        bookContainer.appendChild(div);
    })
}

const loadCoverI = data => {
    console.log(data);
}

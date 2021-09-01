const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');
const bookContainer = document.getElementById('book-container');

searchButton.addEventListener('click', () => {
    const searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs));

});

const displayBook = books => {
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="rounded">
                    <img style="width: 150px; height: 200px; border-radius: 2px;"
                        src="https://covers.openlibrary.org/b/id/${c}-M.jpg" alt="">
                </div>
                <div class="my-3">
                    <h2 class="text-secondary fw-1">${book.title}</h2>
                    <p class="text-secondary">${book.author_alternative_name}r</p>
                    // <p class="text-secondary">author</p>
                    <p class="text-secondary">${book.publisher}</p>
                    <p class="text-secondary">${book.first_publish_year}</p>
                </div>
        `;
    })
}
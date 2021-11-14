(function (window){

    let searchInput = document.getElementById('book-search-input')
    const searchBtn = document.getElementById('search-btn');

    let searchResults = [];
    let savedBooks = [];


    searchInput.addEventListener(("keyup"), event => event.code === "Enter" ? searchBtn.click() : false);
    searchBtn.addEventListener(('click'), event => getSearchResults(event));



    searchInput.focus();
    searchInput.select();

    function loadList() {
        if (window.location.pathname === '/finished-books.html') {

            console.log('Finished Books')
            savedBooks.forEach(book => {
                if (book.list == 'read'){
                    console.log(book)
                    displayListBooks(book)
                }
            })
        }  
        if (window.location.pathname === '/to-read-books.html'){

            console.log('Unread Books')
            savedBooks.forEach(book => {
                if (book.list == 'unread'){
                    console.log(book)
                    displayListBooks(book)
                }
            })
        }
    } loadList();

    async function getSearchResults (event) {

            let searchValue = searchInput.value;
            console.log('searching for -->', searchValue)

            searchResults = [];
            document.getElementById('search-results').innerHTML = '';

            let spinningLoader = document.getElementsByClassName('loader')[0];         
            spinningLoader.style.display = "block";

            const searchResponse = new Promise( (res, rej ) => {
                fetch(`https://openlibrary.org/search.json?q=${searchValue}&limit=12`)
                    .then(res => res.json())
                    .then(data => {
                    console.log('retrieving data...');

                        let bookArr = data.docs;
                        bookArr.forEach(bookObj => {
                        formatBookData(bookObj)   
                        });
                        spinningLoader.style.display = "none";
                        searchResults.forEach(item => displaySearch(item));
                        let toReadList = document.getElementsByClassName('add-to-read-btn');
                        for (var i = 0; i < toReadList.length; i++) {
                            toReadList[i].addEventListener('click', addToReadList, false);
                        }
                        let alreadyReadList = document.getElementsByClassName('completed-reading-btn');
                        for (var i = 0; i < alreadyReadList.length; i++) {
                            alreadyReadList[i].addEventListener('click', addToCompletedBookList, false);
                        }
                    })
                    .catch(console.error("Still Fetching Data..."))});
        
            searchInput.value = '';
        
    };

    function sortListBooks() {
        let path = window.location.pathname == '/finished-books.html' ? false : true;
        console.log(path)

        if (path === true){
            let displayListDivRead = document.getElementById('read-list-container');
            displayListDivRead.innerHTML = '';
        } else {
            let displayListDivUnread = document.getElementById('list-container');
            console.log('erasing')
            displayListDivUnread.innerHTML = '';
        }

        savedBooks.forEach((savedBook) =>{
            displayListBooks(savedBook, true)
        })
    }

    
    function addToReadList(event) {
        let idOfBookToAdd = event.target.parentNode.parentNode.id
        let isInList = false;
        let savedBookIndex;

        savedBooks.forEach(savedBook => {
            if (savedBook.id == idOfBookToAdd) {
                isInList = true;
                savedBookIndex = savedBooks.indexOf(savedBook);
            }
        })

        searchResults.forEach( book => {

            if (book.id == idOfBookToAdd && isInList == false) {
                book.list = 'unread'
                savedBooks.push(book)
                console.log(savedBooks)
            } else if (book.id == idOfBookToAdd && isInList == true){
                savedBooks[savedBookIndex].list = 'unread';
                savedBooks.push(book)
            } 
        })

        sortListBooks();
        console.log('in add to read list',savedBooks)

    }

    function addToCompletedBookList(event) {
        let idOfBookToAdd = event.target.parentNode.parentNode.id
        let isInList = false;
        let savedBookIndex;

        savedBooks.forEach(savedBook => {
            if (savedBook.id == idOfBookToAdd) {
                isInList = true;
                savedBookIndex = savedBooks.indexOf(savedBook);
            }
        })

        searchResults.forEach( book => {

            if (book.id == idOfBookToAdd && isInList == false) {
                savedBooks.push(book)
                book.list = 'read'
                displayListBooks(book, true)
                console.log(savedBooks)
            } else if (book.id == idOfBookToAdd && isInList == true){
                savedBooks[savedBookIndex].list = 'read';
                displayListBooks(book, true)
            } 
        })
        sortListBooks();
        console.log(savedBooks)

    }

    function displayListBooks(book, displayBookInList){
        let unreadDisplayListDiv = document.getElementById('read-list-container');
        let readDisplayListDiv = document.getElementById('list-container');

            if (window.location.pathname == '/finished-books.html' && book.list == 'read'){
                let bookCard = `
                <div class="list-card">
                    <div class="card-body-list">
                        <img class="placeholder" src="/images/placeholder.png">
                        <div class="list-book-info" id="${book.id}">
                            <h4>${book.title}</h4>
                            <h5>Author: ${book.author}</h5>
                            <p>ISBN:${book.isbn}</p>
                            <div id="stars-${book.id}" class="rating">
                                <i value="1" class="rating__star ${book.id} far fa-star"></i>
                                <i value="2" class="rating__star ${book.id} far fa-star"></i>
                                <i value="3" class="rating__star ${book.id} far fa-star"></i>
                                <i value="4" class="rating__star ${book.id} far fa-star"></i>
                                <i value="5" class="rating__star ${book.id} far fa-star"></i>
                                <span class="rating__result ${book.id}"></span>
                            </div>
                        </div>
                    </div>
                </div>
                `
                readDisplayListDiv.insertAdjacentHTML('beforeend', bookCard)
                let stars = [...document.getElementsByClassName(`rating__star ${book.id}`)];
                document.getElementById(`stars-${book.id}`).addEventListener('change', executeRating(stars, book.id))

            } else if (window.location.pathname == '/to-read-books.html' && book.list == 'unread') {

                console.log(book)
                
                bookCard = `
                <div class="list-card">
                    <div class="card-body-list">
                        <img class="placeholder" src="/images/placeholder.png">
                        <div class="list-book-info" id="${book.id}">
                            <h4>${book.title}</h4>
                            <h5>Author: ${book.author}</h5>
                            <p>ISBN:${book.isbn}</p>
                        </div>
                    </div>
                </div>
                `
                unreadDisplayListDiv.insertAdjacentHTML('beforeend', bookCard)
            } 

    }

    function displaySearch(book) {

        let displaySearchResultsDiv = document.getElementById('search-results');
         

            let bookCard = `
            <div class="card">
                <div class="card-body">
                    <img class="placeholder" src="/images/placeholder.png">
                    <div class="book-info" id="${book.id}">
                        <h4>${book.title}</h4>
                        <h5>Author: ${book.author}</h5>
                        <p>ISBN:${book.isbn}</p>
                        <div class="button-group">
                            <button class="completed-reading-btn"><img class="icons" src="/images/check-book.png"> Finished Book </button>
                            <button class="add-to-read-btn"><img class="icons" src="/images/future.png"> Read Later</button>
                        </div>
                    </div>
                </div>
            </div>
            `

            displaySearchResultsDiv.insertAdjacentHTML('beforeend',bookCard);

    }

    function formatBookData(bookInfo){

        const bookObject = {
            id : bookInfo.edition_key[0],
            title : bookInfo.title,
            author : bookInfo.author_name, //author name is returned in an array
            isbn : bookInfo.isbn === undefined ? "No ISBN at this time." : bookInfo.isbn[0],
            published : bookInfo.publish_date,
            image : bookInfo.cover_i,
            list : null,
            stars : null,
        };

        searchResults.push(bookObject);
    }


    function executeRating(stars, bookId) {
        const starClassActive = `rating__star ${bookId} fas fa-star`;
        const starClassInactive = `rating__star ${bookId} far fa-star`;
        const starsLength = stars.length;
        

        let i;
        
        stars.map((star) => {
            
            star.onclick = () => {
            i = stars.indexOf(star);
            if (star.className===starClassInactive) {
                for (i; i >= 0; --i) {
                    stars[i].className = starClassActive;
                }
                let ratingNumber = document.getElementsByClassName(starClassActive).length
                savedBooks.forEach(book => {
                    if (book.id == bookId){
                        book.stars = ratingNumber
                        console.log(book)
                    }
                })
                
            } else {
                i++;
                for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
                let ratingNumber = document.getElementsByClassName(starClassActive).length
                savedBooks.forEach(book => {
                    if (book.id == bookId){
                        book.stars = ratingNumber
                        console.log(book)
                    }
                })
            }
            };
        });

    }

})(window);
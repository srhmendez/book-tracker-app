(function (window){

    let searchInput = document.getElementById('book-search-input')
    const searchBtn = document.getElementById('search-btn');
    let searchResults = [];

    searchInput.addEventListener(("keyup"), event => event.code === "Enter" ? searchBtn.click() : false);

    searchBtn.addEventListener(('click'), event => getSearchResults(event));

    async function getSearchResults (event) {
        let searchValue = searchInput.value;
        console.log('searching for -->', searchValue)
        
        const searchResponse = new Promise( (res, rej ) => {
            fetch(`http://openlibrary.org/search.json?q=${searchValue}&limit=12`)
                .then(res => res.json())
                .then(data => {
                    console.log('success!');
                    let bookArr = data.docs;
                    bookArr.forEach(bookObj => {
                        formatBookData(bookObj)   
                    });
                    searchResults.forEach(item => display(item));
                    let toReadList = document.getElementsByClassName('add-to-read-btn');
                    console.log(toReadList)
                    for (var i = 0; i < toReadList.length; i++) {
                        toReadList[i].addEventListener('click', addToReadList, false);
                    }
                    let alreadyReadList = document.getElementsByClassName('completed-reading-btn');
                    for (var i = 0; i < alreadyReadList.length; i++) {
                        alreadyReadList[i].addEventListener('click', addToCompletedBookList, false);
                    }
                    
                })
                .catch(console.error("Still Fetching Data..."))});
        

    };

    
    function addToReadList() {
        console.log('added!')
    }
    function addToCompletedBookList() {
        console.log('read it :p')
    }


    function display(item) {
        let displaySearchResultsDiv = document.getElementById('card-display');
        
        let bookCard = `
        <div class="card">
            <div class="card-body">
                <img class="placeholder" src="/images/placeholder.png">
                <div class="book-info">
                    <h4>${item.title}</h4>
                    <h5>Author: ${item.author}</h5>
                    <p>ISBN:${item.isbn}</p>
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
        };

        searchResults.push(bookObject);
    }




})(window);
const express = require ('express');
const router = express.Router();

let books = [
    {
        "id": "OL29905539M",
        "title": "There's Nothing Like Your Hug",
        "author": [
            "Love Vision"
        ],
        "isbn": "1659198771",
        "published": [
            "2020"
        ],
        "list": "read",
        "stars": 5
    },
    {
        "id": "OL29926841M",
        "title": "Hug Makes You Feel Good All Day",
        "author": [
            "Love Vision"
        ],
        "isbn": "9781658910491",
        "published": [
            "2020"
        ],
        "list": "read",
        "stars": 3
    }

]

//get all books
router.get('/', (req, res) => {
    res.send(books);
})

//add book to savedBooks Array
router.post('/', (req, res) => {

    //Error handling
    if (req.body === false){
        res.status(400).send({message: "Request cannot be empty!!"})
        return
    }

    
    books.push(req.body)
    res.send(books)

})


module.exports = router;

const { isValidObjectId } = require('mongoose');
const bookDB = require('../model/model');


//function to retrieve saved books from DB
const getBooks = async () => {
    const savedBooks = await bookDB.find();
    return savedBooks;
}

//get all books
exports.find = async (req, res) => {
        
    //find data in db
    await getBooks()
    .then(book => {
        res.status(200).send(book)
        console.log('books', book)
    })
    .catch(error => {
        res.status(500).send({message: error.message || "Error occurred while retrieving user information in the controller getBooks operation"})
    });
   
}

//add book to savedBooks Array
exports.create = async (req, res) => {

    //Error handling
    if (req.body === false){
        res.status(400).send({message: "Request cannot be empty!!"})
        return
    }

    const newBook = bookDB({
        
        id : req.body.id,
        title : req.body.title,
        author : req.body.author,
        isbn : req.body.isbn,
        published : req.body.published,
        image : req.body.image,
        list : req.body.list,
        stars : req.body.stars

    });

    newBook
        .save(newBook)
        .then(data => res.send(data))
        .catch(error => {
            res.status(500).send(error, {
                message: error || "An Error has occurred while attempting to add book to Database in the controller create operation"
            })
    })


}

//update a book in DB
exports.update = async (req, res) => {
    
    //error handling for empty update request
    if (!req.body){
        return res
            .status(400)
            .send({message: "data to update cannot be empty!"});
    }

    //updating book
    const id = req.params._id;

    await bookDB.findOneAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => res.send(data))
    .catch(error => {
        res.status(500).send(error, { message: "An Error has occurred while attempting to update book in Database in the controller update operation"});
    });
}

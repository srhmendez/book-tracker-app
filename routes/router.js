const express = require ('express');
const router = express.Router();
const controller = require('../controller/controller')


//all routes are starting with /


//CRUD to database

//get all books
router.get('/', controller.find)

//add a book to saved list
router.post('/', controller.create)

//update a book by id
router.put('/:id', controller.update)



module.exports = router;


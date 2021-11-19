const mongoose = require('mongoose');

let schema = new mongoose.Schema({

    id : {
        type : String,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    author : {
        type : Array,
        required : true
    },
    isbn : {
        type : String,
    },
    published : {
        type : Array,
    },
    image : {
        type : String,
    },
    list : {
        type : String,
        required : true,
    },
    stars : {
        type : Number || Object,
    }
})

const savedBooks = mongoose.model('savedBooks',schema);

module.exports = savedBooks;
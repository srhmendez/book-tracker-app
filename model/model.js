const mongoose = require('mongoose');

let schema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        unique : true
    },
    id : {
        type : Number,
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
        type : Number,
    },
    published : {
        type : String,
    },
    image : {
        type : String,
    },
    list : {
        type : String,
        required : true,
    },
    stars : {
        type : Number,
        required : true
    }
})

const tododb = mongoose.model('tododb',schema);

module.exports = tododb;
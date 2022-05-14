const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const Book = new Schema({
    name: {
        type    : String,
        trim    : true,
        required: [true, 'Le nom est obligatoire'],
        unique   : true, // index unique
    },
    author: {
        type: String,
        trim: true,
        required: [true, "L'auteur est obligatoire"]
    },
    editor: {
        type     : String,
        trim     : true,
        required : [true, "L'éditeur obligatoire"],
    }
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});


module.exports = mongoose.model('Book', Book);

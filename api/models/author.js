const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcryptjs');

const Author = new Schema({
    firstname: {
        type    : String,
        trim    : true,
        required: [true, 'Le prénom est obligatoire'],
        unique   : true, // index unique
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, "Le nom est obligatoire"]
    },
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});


module.exports = mongoose.model('Author', Author);

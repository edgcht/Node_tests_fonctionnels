const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const ObjectId = require('mongodb').ObjectID;
const pass = bcrypt.hashSync("1234", salt);

module.exports = [
    {
        _id: ObjectId(),
        name: "valentin_1",
        lastname: "lemaire",
        email: 'toto1@gmail.com',
        role: "admin",
        password: pass
    },
    {
        _id: ObjectId(),
        name: "valentin_2",
        lastname: "lemaire",
        email: 'toto2@gmail.com',
        role: "users",
        password: pass
    }
];

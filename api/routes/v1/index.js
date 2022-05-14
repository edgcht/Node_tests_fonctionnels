var express = require('express');
var router = express.Router();

const userRoute = require('./user');
const bookRoute = require('./book');
const authorRoute = require('./author');

router.get('/', async (req, res) => {
    res.status(200).json({
        name   : 'API', 
        version: '1.0', 
        status : 200, 
        message: 'Bienvenue sur l\'API !'
    });
});

router.use('/users', userRoute);
router.use('/books', bookRoute);
router.use('/author', authorRoute);

module.exports = router;
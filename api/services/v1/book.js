const Book = require('../../models/book');

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let book = await Book.findById(id);

        if (book) {
            return res.status(200).json(book);
        }

        return res.status(404).json('book_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {
    const temp = {};

    ({ 
        name     : temp.name,
        author    : temp.author,
        editor : temp.editor
    } = req.body);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let book = await Book.create(temp);

        return res.status(201).json(book);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const temp = {};

    ({ 
        name     : temp.name,
        author    : temp.author,
        editor : temp.editor
    } = req.body);

    try {
        let book = await Book.findOne({ name: temp.name });

        if (book) {       
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    book[key] = temp[key];
                }
            });
            
            await book.save();
            return res.status(201).json(book);
        }

        return res.status(404).json('book_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.body;

    try {
        await Book.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}
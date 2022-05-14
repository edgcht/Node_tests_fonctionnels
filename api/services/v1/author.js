const Author = require('../../models/author');

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let author = await Author.findById(id);

        if (author) {
            return res.status(200).json(author);
        }

        return res.status(404).json('author_not_found');
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
        let author = await Author.create(temp);

        return res.status(201).json(author);
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
        let author = await Author.findOne({ name: temp.name });

        if (author) {       
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    author[key] = temp[key];
                }
            });
            
            await author.save();
            return res.status(201).json(author);
        }

        return res.status(404).json('author_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.body;

    try {
        await Author.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}
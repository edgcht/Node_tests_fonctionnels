const User = require('../../models/user');
const jwt  = require('jsonwebtoken');
const bcrypt   = require('bcryptjs');

exports.getById = async (req, res, next) => {
    const { name } = req.params;
    
    let user = await User.findOne({name: name});

    if (user) {
        return res.status(200).json(user);
    }

    return res.status(404).json('user_not_found');
}

exports.getAll = async (req, res, next) => {

    try {
        let user = await User.find({});

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(403).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.register = async (req, res, next) => {
    const temp = {};

    ({ 
        name     : temp.name,
        firstname: temp.firstname,
        email    : temp.email,
        password : temp.password,
        role : temp.role
    } = req.body);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const temp = {};

    const { name } = req.params;

        let user = await User.findOne({ name: name });

        if (user) {
            ({
                name     : temp.name,
                firstname: temp.firstname,
                email    : temp.email,
                password : temp.password,
                role : temp.role
            } = req.body);

            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(200).json(user);
        }
        
        return res.status(404).json('user_not_found');
}

exports.delete = async (req, res, next) => {
    const { name } = req.params;
    let user = await User.findOne({ name: name });

    if (user) {
        await User.deleteOne({ name: name });
        return res.status(200).json('delete_ok');
    } else {
        return res.status(404).json({});
    }
}

exports.login = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email })

    if(!email || !password ){
        return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
    }

    if(user) {

        bcrypt.compare(password, user.password, (err, data) => {
            //if error than throw error
            if (err) throw err

            //if both match than you can do anything
            if (data) {
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    role: user.role
                }, 'myKey', { expiresIn: '3 hours' })
            
                return res.status(200).json({ access_token: token })
            } else {
                return res.status(401).json({ msg: "Invalid credencial" })
            }

        })


    }else {
        return res.json({ message :"user not find" })
    }
}

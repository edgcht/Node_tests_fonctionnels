const jwt  = require('jsonwebtoken');

/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
exports.checkRoleAdmin = (req, res, next) => {
    // Récupération du token

    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    let decodeToken = jwt.decode(token);

    if(decodeToken.role !== 'admin') {
        return res.status(401).json({ message: 'Error. Unauthorized' })
    }else{
        return next()
    }
}
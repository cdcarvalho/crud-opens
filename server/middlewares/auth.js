const jwt = require('jsonwebtoken');
const httpEnum = require('../enum/Ehttp');

const auth = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(httpEnum.httpStatusCode.UNAUTHORIZED).json({ message: 'Token is required!' });
    }

    const [, token] = authHeader.split(' ');

    try {
        jwt.verify(token, process.env.SECRET);
        next()
    } catch (error) {
        return response.status(httpEnum.httpStatusCode.UNAUTHORIZED).json({ message: 'Token invalid!' });
    }
};

module.exports = auth;
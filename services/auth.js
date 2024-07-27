require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function createUserToken(user){
    const payload = {
        _id:user._id,
        email:user.email,
        name:user.name,
    }
    const token = jwt.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    createUserToken,
    validateToken
}
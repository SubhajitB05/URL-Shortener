const User = require('../models/user');

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({error: 'User already exists.'})
    }
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/login');
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie('token', token).redirect('/user/dashboard');
    } catch (error) {
        return res.status(400).render('login', {error: error})
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
const express = require('express')
const router = express.Router()
const {handleUserSignup, handleUserLogin} = require('../controllers/user');
const URL = require('../models/url')

router.get('/', (req, res)=>{
    return res.render('home', {
        user:req.user,
    })
})
router.get('/signup', (req, res)=>{
    return res.render('signup')
})
router.get('/login', (req, res)=>{
    return res.render('login')
})
router.get('/dashboard', async (req, res)=>{
    const allUrls = await URL.find({createdBy: req.user?._id});
    return res.render('dashboard', {
        user: req.user,
        allUrls: allUrls
    });
})
router.get('/logout', (req, res)=>{
    return res.clearCookie('token').redirect('/user');
})

router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);

module.exports = router;
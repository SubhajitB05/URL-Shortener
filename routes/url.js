const express = require('express')
const router = express.Router()
const {handleGenerateShortUrl, handleGetUrl} = require('../controllers/url');

router.get('/generate-url', (req, res)=>{
    res.render('generate-url', {
        user: req.user,
    });
})


router.get('/:id', handleGetUrl)

router.post('/generate-url', handleGenerateShortUrl)

module.exports = router;

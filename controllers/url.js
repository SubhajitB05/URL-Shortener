const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortUrl(req, res){
    const { url } = req.body;
    const shortUrl = shortid();
    await URL.create({
        shortUrl:shortUrl,
        redirectUrl: url,
        visitHistory:[],
        createdBy: req.user._id,
    })
    return res.render('generate-url', {
        user: req.user,
        shortUrl: shortUrl
    })
}
async function handleGetUrl(req, res){
    const id = req.params.id;
    const entry = await URL.findOneAndUpdate({shortUrl:id}, {
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    return res.redirect(entry.redirectUrl);
}

module.exports = {
    handleGenerateShortUrl,
    handleGetUrl
}
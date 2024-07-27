require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
const port = process.env.PORT || 8003;
const URI = process.env.URI;
const connectToMongoDB = require('./connection/connect')
const userRoute = require('./routes/user')
const urlRoute = require('./routes/url')
const cookieParser = require('cookie-parser');
const { checkForAuthCookie } = require('./middlewares/auth');

// COnnection of MongoDB
connectToMongoDB(URI)
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    })
})
.catch(err=>console.log('MongoDB connection error...', err));

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('views', path.resolve('./views'))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(checkForAuthCookie('token'))
app.use(express.static(path.resolve('./public')))

// Route
app.get('/', (req, res)=>{
    return res.render('home', {user:req.user})
})
app.use('/user', userRoute)
app.use('/url', urlRoute)

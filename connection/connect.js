const { default: mongoose } = require("mongoose");

async function connectToMongoDB(url){
    try{
        const connect =  await mongoose.connect(url);
        console.log("Connected to MongoDB");
        return connect;
    }
    catch(err){
        console.log('MongoDB Connection failed! ',err);
    }
}

module.exports = connectToMongoDB;
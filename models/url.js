const {Schema, model} = require('mongoose')

const urlSchema = new Schema({
    shortUrl:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required: true
    },
    visitHistory:[
        {
            timestamp:{
                type:Number
            }
        }
    ],
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
}, {timestamps:true});

const URL = model('url', urlSchema);

module.exports = URL;
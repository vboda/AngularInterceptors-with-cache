const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
    name:{type:String},
    mobileNumber:{type:Number},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    country:{type:String}
}) 

module.exports = mongoose.model('User', userModel);

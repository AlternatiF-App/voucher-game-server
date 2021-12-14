const mongoose = require('mongoose');
let bankSchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, "Bank owner must be filled"]
    },
    nameBank : {
        type : String,
        require: [true, "Bank name must be filled"]
    },
    accountNumber : {
        type : String,
        require: [true, "Account number must be filled"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Bank', bankSchema)
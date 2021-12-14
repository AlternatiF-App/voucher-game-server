const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName : {
            type: String,
            require: [true, "Game Name must be filled"]
        },
        category : {
            type: String,
            require: [true, "Category must be filled"]
        },
        thumbnail : {
            type: String
        },
        coinName : {
            type: String,
            require: [true, "Coin Name must be filled"]
        },
        coinQuantity : {
            type: String,
            require: [true, "Coin Quantity must be filled"]
        },
        price : {
            type: Number
        },
    },
    historyPaymen : {
        name: { type: String, require: [true, "Name must be filled"]},
        type: { type: String, require: [true, "Payment Type must be filled"]},
        bankName: { type: String, require: [true, "Bank Name must be filled"]},
        accountNumber: { type: String, require: [true, "Account Number must be filled"]}
    },
    name: { 
        type: String, 
        require: [true, "Name must be filled"],
        maxLength: [225, "Name length must be 3 - 255 characters"],
        minLength: [3, "Name length must be 3 - 255 characters"]
    },
    accountUser: { 
        type: String, 
        require: [true, "Account Name must be filled"],
        maxLength: [225, "Account Name length must be 3 - 255 characters"],
        minLength: [3, "Account Name length must be 3 - 255 characters"]
    },
    tax : {
        type: Number, 
        default: 0
    },
    value : {
        type: Number, 
        default: 0
    },
    status : {
        type : String,
        enum: ['Pending', 'Success', 'Failed'],
        default: 'Pending'
    },
    player : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    historyUser : {
        name: { type: String, require: [true, "Name must be filled"]},
        phoneNumber: {
            type: Number,
            require: [true, "Account Name must be filled"],
            maxLength: [13, "Account Name length must be 9 - 13 characters"],
            minLength: [9, "Account Name length must be 9 - 13 characters"]
        }
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)
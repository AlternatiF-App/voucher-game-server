const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

let playerSchema = mongoose.Schema({
    email : {
        type : String,
        require: [true, "Email must be filled"]
    },
    name : {
        type : String,
        require: [true, "Name must be filled"],
        maxLength: [225, "Name length must be 3 - 255 characters"],
        minLength: [3, "Name length must be 3 - 255 characters"]
    },
    username : {
        type : String,
        require: [true, "Name must be filled"],
        maxLength: [225, "Username length must be 3 - 255 characters"],
        minLength: [3, "Username length must be 3 - 255 characters"]
    },
    password : {
        type : String,
        require: [true, "Password must be filled"],
        maxLength: [225, "Password length must be 8 - 255 characters"],
        minLength: [8, "Password length must be 8 - 255 characters"]
    },
    phoneNumber : {
        type : String,
        require: [true, "Phone Number must be filled"],
        maxLength: [13, "Phone Number length must be 9 - 13 characters"],
        minLength: [9, "Phone Number length must be 9 - 13 characters"]
    },
    role : {
        type : String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    avatar : {
        type : String
    },
    fileName : {
        type : String
    },
    favourite : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    status : {
        type : String,
        enum: ['Y', 'N'],
        default: 'Y'
    }
}, {timestamps: true})

playerSchema.path('email').validate(async function (value){
    try {
      const count = await this.model('Player').countDocuments({ email : value })
      return !count;
    } catch (error) {
      throw error
    }
}, attr => `${attr.value} Already Exists`)

playerSchema.pre('save', function (next){
    this.password = bycrypt.hashSync(this.password, 12)
    next()
})

module.exports = mongoose.model('Player', playerSchema)
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true , required: true, trim: true},
    displayName: { type: String, unique: true, lowercase: true, required : true, trim:true},
    avatar: String,
    password: { type: String, required: true },
    signupDate: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false},
    lastLogin: Date
})

UserSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err ,salt) {
        if(err) {
            return next();
        }
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) {
                return next();
            }
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema)
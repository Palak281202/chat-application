// creating a user model

const mongoose = require("mongoose"); //install mongoose because it provides a schema based approach
const bcrypt = require('bcrypt'); // installing bcrypt for encrypting the password by hashing.

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}); // defining a user schema that every user must have a name, email id and a password.

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next(); // if password is not modified then it will directly jump to the next to avoid re-hashing.
    }
    else{
        this.password = await bcrypt.hash(this.password, 12); // hashing the password in a string of length 12
        next();
    }
})

userSchema.methods.comparePwd = function(pwd){
    return bcrypt.compare(pwd, this.password);
} // comaprePwd is a custom method to compare the plain pwd without hashing and this.password with hasj=hing if they match or not if they match then return true else false.

module.exports = mongoose.model('User', userSchema)
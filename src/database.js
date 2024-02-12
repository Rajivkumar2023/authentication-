mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Authentication").then(()=>{
    console.log('connected successfully to local mongodb');

}).catch((error)=>{console.log(error)})

Schema = mongoose.Schema({
    username: String,
    password:String,
})

StudentModel = mongoose.model('Student',Schema);
module.exports = StudentModel
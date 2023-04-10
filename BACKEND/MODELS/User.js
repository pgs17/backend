// in this we will make a user schema and  out of schema we will model it
// mongoose.schema object is used 

const mongoose = require("mongoose")


// schema creation
const UserSchema = new mongoose.Schema({ 

name:{
    type: String,
    required: true
},
age:{
    type: Number,
    required: true
},
UserName: {
    type: String,
    required: true
}
});

// schema model takes two input schema name and the collection or table name in file 
const UserModel = mongoose.model("users", UserSchema)

module.exports=UserModel;
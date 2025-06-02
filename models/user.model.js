const mongoose=require('mongoose');
userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength: [2,"First Name Must be Atleast 2 Characters Long"]
    },
    last_name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength: [3,"Last Name Must be Atleast 3 Characters Long"]
    
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength: [13,"Email Must be Atleast 13 Characters Long"]
    
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: [5,"Password Must be Atleast 5 Characters Long"]
    
    },
   
})

const user=mongoose.model('user',userSchema)

module.exports=user;
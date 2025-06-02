const express =require('express')
const userRouter=require('./routes/user.routes')
const app=express()
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
dotenv.config();

const connectToDB=require('./config/db')
connectToDB();
const indexRouter= require('./routes/index.routes')



app.set('view engine','ejs');
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/',indexRouter)
app.use('/user',userRouter);


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
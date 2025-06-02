const express= require('express');
const router =express.Router();
const { body, validationResult } = require('express-validator');
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.get('/register',(req,res)=>{
    res.render('register');
})
router.post('/register',
    body('email').trim().isEmail().isLength({min:12}),
    body('password').trim().isLength({min:5}),
    body('first_name').trim().isLength({ min: 2, max: 12 }),
    body('last_name').trim().isLength({ min: 5, max: 20 }),


    async (req,res)=>{
        const errors=validationResult(req);

        console.log(errors)
        if(errors.isEmpty()){
            const {email,first_name,last_name,password,}=req.body;
            const hashPassword= await bcrypt.hash(password,10)
            const newUser = await userModel.create({
                email,
                first_name,
                last_name,
                password:hashPassword
            })

            res.json(newUser)
        }
        else{
            return res.status(400).json({
                errors:errors.array(),
                message: 'Invalid Data'
            })
        }
        
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',
    body('email').trim().isEmail().isLength({min: 12}),
    body('password').trim().isLength({min:5}),
    async (req,res)=>{
        const errors= validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errir:error.array(),
                message:'Invalid Data'
            })
        }

        const{email,password}=req.body;

        const user=await userModel.findOne({
            email: email
        })
        if(!user) {
            return res.status(400).json({
            message: 'Email or password is incorrect'
            }) 
}

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message: 'Email or password is incorrect'
            })
        }
        const token=jwt.sign({
            userID:user._id,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name
        },
        process.env.JWT_SECRET,
    
    )

    res.cookie('token',token)
        res.send('Logged in')



    })

module.exports=router
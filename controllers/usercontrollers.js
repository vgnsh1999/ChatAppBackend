const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function isstringinvalid(string){
    if(string === undefined || string.length === 0){
        return true;
    } else {
        return false;
    }
}

const signup = async(req,res,next)=>{
    try{
        const {username,email,phonenumber,password} = req.body;
        if(isstringinvalid(username) || isstringinvalid(email) || isstringinvalid(phonenumber) ||isstringinvalid(password)){
            return res.status(400).json({message:'Bad parameters.Something is missing',success:false});
        }
        const saltrounds = 10;
        bcrypt.hash(password , saltrounds , async(err,hash)=>{
            console.log(err);
            await User.create({username,email,phonenumber,password:hash});
            res.status(201).json({message:'Succesfully created new user',success:true});
        });
        const user = await User.findOne({where:{username:username}});
        if(user){
            res.status(200).json({message:'user already exist',success:false});
        }
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};

const generateAccessToken = (id,username) =>{
    return jwt.sign({userId:id,username:username},process.env.TOKEN_SECRET);
}

const login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({message:'email or password is missing',success:false});
        }
        //Using bcrypt
        const user = await User.findAll({where:{email}})
        if(user.length > 0){
            bcrypt.compare(password , user[0].password ,(err,result)=>{
                if(err){
                    throw new Error('Something went wrong!');
                }
                if(result === true){
                    res.status(200).json({message:'User logged in successfully',success:true,token:generateAccessToken(user[0].id,user[0].username)});
                } else {
                    return res.status(400).json({message:'Password is incorrect',success:false});
                }
            });
        } else {
            return res.status(404).json({message:'User does not exist',success:false});
        }
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};

module.exports = {
    signup,
    login,
    generateAccessToken,
};
const Chat = require('../models/Chat');
const User = require('../models/User');
const sequelize = require('../util/database');
require('dotenv').config();

const addMessage = async (req,res,next)=>{
    try{
        const {message} = req.body;
        if(message === undefined || message.length === 0){
            return res.status(400).json({message:'Parameters are missing',success:false});
        }
        const data = await Chat.create({message,userId:req.user.id}); 
        res.status(201).json({allChats:data,success:true});
    } catch(error){
        console.log(error)
        return res.status(500).json({message:error,success:false});
    }
};

const getMessage = async (req,res,next)=>{
    try{
        const chats = await Chat.findAll();
        res.status(200).json({allChats:chats,success:true});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};

module.exports = {
    addMessage,
    getMessage
}
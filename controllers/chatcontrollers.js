const Chat = require('../models/Chat');
const User = require('../models/User');
const Group = require('../models/Group');
const sequelize = require('../util/database');
require('dotenv').config();

const addMessage = async (req,res,next)=>{
    try{
        const {message} = req.body;
        const {id} = req.params;
        console.log(id);
        if(message === undefined || message.length === 0){
            return res.status(400).json({message:'Parameters are missing',success:false});
        }
        const user = await User.findAll({where:{id:req.user.id}});
        const data = await Chat.create({message,userId:req.user.id,username:user[0].username,groupId:id});
        res.status(201).json({allChats:data,success:true});
    } catch(error){
        console.log(error)
        return res.status(500).json({message:error,success:false});
    }
};

const getMessage = async (req,res,next)=>{
    try{
        //const limit = +req.query.limit;
        const {id} = req.params;
        const chats = await Chat.findAll({ where: { groupId:id }});
        res.status(200).json({allChats:chats,success:true});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};

// const getMessage2 = async (req,res,next)=>{
//     try{
//         //const limit = +req.query.limit;
//         const {id} = +req.params;
//         const chats = await Chat.findAll({ where: { userId:req.user.id,groupId:id }});
//         res.status(200).json({allChats:chats,success:true});
//     } catch(error){
//         console.log(JSON.stringify(error));
//         res.status(500).json({message:error,success:false});
//     }
// };

module.exports = {
    addMessage,
    getMessage,
    //getMessage2
}
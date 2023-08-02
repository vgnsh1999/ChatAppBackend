const Chat = require('../models/Chat');
const User = require('../models/User');
const Group = require('../models/Group');
const sequelize = require('../util/database');
require('dotenv').config();

const addGroup = async (req,res,next)=>{
    try{
        const {groupname} = req.body;
        if(groupname === undefined || groupname.length === 0){
            return res.status(400).json({message:'Parameters are missing',success:false});
        }
        const user = await User.findAll({where:{id:req.user.id}});
        const data = await Group.create({groupname,userId:req.user.id,isAdmin:true});
        res.status(201).json({allGroups:data,success:true});
    } catch(error){
        console.log(error)
        return res.status(500).json({message:error,success:false});
    }
};

const getGroup = async (req,res,next)=>{
    try{
        // const groups = await Group.findAll({where:{userId:req.user.id}});
        const groups = await Group.findAll();
        res.status(200).json({allGroups:groups,success:true});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};

module.exports = {
    addGroup,
    getGroup
}
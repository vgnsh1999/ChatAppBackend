const Member = require('../models/Member');

const addMember = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const {member} = req.body;
        if(member === undefined || member.length === 0){
            return res.status(400).json({message:'Parameters are missing',success:false});
        }
        //const user = await User.findAll({where:{id:req.user.id}});
        const data = await Member.create({membername:member,isAdmin:false,groupId:id});
        res.status(201).json({allMembers:data,success:true});
    } catch(error){
        console.log(error)
        return res.status(500).json({message:error,success:false});
    }
};

const getMember =  async (req,res,next)=>{
    try{
        const {id} = req.params;
        const members = await Member.findAll({ where: { groupId:id }});
        res.status(200).json({allMembers:members,success:true});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};

const getMembers =  async (req,res,next)=>{
    try{
        const members = await Member.findAll();
        res.status(200).json({allMembers:members,success:true});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};

const deleteMember = async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(id === undefined || id.length === 0){
            return res.status(400).json({message:'Member ID is missing',success:false});
        }
        const noofrows = await Member.destroy({where:{id:id}});
        if(noofrows === 0){
            return res.status(404).json({message:'member doesnot belongs to group'});
        }
        res.status(200).json({message:'Member Deleted Successfully',success:true});
    } catch(error){
        console.log(error)
        return res.status(500).json({message:error,success:false});
    }
};

const makeAdmin = async (req,res,next)=>{
    try{
        const {id} = req.params;
       // const members = await Member.update({ isAdmin:true,where: { id:id }});
        const member  = await Member.findOne({where : {id : id}}) ;
        member.update({ isAdmin:true});
        res.status(200).json({allMembers:member,success:true});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({message:error,success:false});
    }
};


module.exports = {
    addMember,
    getMember,
    deleteMember,
    makeAdmin,
    getMembers
}
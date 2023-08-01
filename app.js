const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors({
    origin:'*',
    methods:["PUT","DELETE","POST","GET"],
    credentials:true
}));

app.use(bodyParser.json({extended:false}));

const User = require('./models/User');
const Chat = require('./models/Chat');
const Group = require('./models/Group');

const sequelize = require('./util/database');

//Relationships
User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(Group);

Group.hasMany(Chat);
Chat.belongsTo(Group);

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const groupRoutes = require('./routes/group');

app.use('/user',userRoutes);
app.use('/message',chatRoutes);
app.use('/group',groupRoutes);


sequelize.sync().then((response)=>{
    console.log(response);
    app.listen(3000);
}).catch(error=>console.log(error));

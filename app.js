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

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');

app.use('/user',userRoutes);


sequelize.sync().then((response)=>{
    console.log(response);
    app.listen(3000);
}).catch(error=>console.log(error));

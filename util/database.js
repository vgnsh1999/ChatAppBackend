const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat-app','root','MySQL123',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;
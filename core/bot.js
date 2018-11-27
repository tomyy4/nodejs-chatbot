var builder = require('botbuilder');
var server = require('./server');
//CHAT CONNECTOR
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});


server.post('/api/messages', connector.listen());



//CREATE BOT
var bot = new builder.UniversalBot(connector);  

module.exports = bot;
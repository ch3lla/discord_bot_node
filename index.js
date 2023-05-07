require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
const keep_alive = require("./keep_alive");

client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.DirectMessages
]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(`Received message: ${msg.content} from ${msg.author.tag}`);
})

client.on('message', async msg => {
    switch (msg.content){
        case "ping":
            msg.reply("Pong!");
            break;
        case "!meme":
            msg.channel.send("Here's your meme!");
            const img = await getMeme();
            msg.channel.send(img);
            break;
        case "!eye":
            msg.channel.send("You are now subscribing to eye reminders.");
            interval = setInterval (function () {
                msg.channel.send("Please take an eye break now.")
                .catch(console.error);
            }, 360000);
            break;
        case "!stop":
            msg.channel.send("I have stopped eye reminders.");
            clearInterval(interval);
            break;
        case "Hello":
            msg.channel.send(`Hello ${msg.author.tag}`);
            break;
    }
    
});

async function getMeme(){
    const res = await ALLOWED_EXTENSIONS.get('https://memeapi.pythonanywhere.com/');
    return res.data.memes[0].url;
}

client.login(process.env.CLIENT_TOKEN);
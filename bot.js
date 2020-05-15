const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

var allSettings = [
    "prefix"
];
var allDefaults = [
    "??"
];

function setSettingsArray(id, newSet, value){
    var path = "DataBase\\" + id + "\\settings.txt"
    var json = fs.readFileSync(path);
    var oldSets = JSON.parse(json);
    oldSets[newSet.toString()] = value;
    var j = JSON.stringify(oldSets);
    fs.writeFileSync(path, j);
};

function genArray(id){
    var folder = "DataBase\\" + id.toString();
    if (fs.existsSync(folder) == false){
        fs.mkdirSync(folder);
    }
    var path = "DataBase\\" + id.toString() + "\\settings.txt";
    if (fs.existsSync(path) == true){
        const data = fs.readFileSync(path);
        var settings = JSON.parse(data);
        var le = allSettings.length;
        for(i = 0 ; i < le; i++) {  
            if (settings[allSettings[i]] == null){
                console.log(allSettings[i] + " not found");
                var a = allSettings[i].toString()
                //settings[a] = allDefaults[i];
                setSettingsArray(id, a, allDefaults[i]);
            }
        }
    }
    else
    {
        freshSettingsArray = {};
        var le = allSettings.length;
        for(i = 0 ; i < le; i++) {  
            var a = allSettings[i].toString();
            freshSettingsArray[a] = allDefaults[i];
        }

        var json = JSON.stringify(freshSettingsArray);
        fs.writeFileSync(path, json);
        const data = fs.readFileSync(path);
        settingsArray = JSON.parse(data);
        Prefix = settingsArray.prefix;
    }
}

function checkGuildFiles(){
    var allGuilds = discordbot.guilds.cache.array();
    var len = allGuilds.length;
    for(let i = 0; i < len; i++) {
        let guildID = allGuilds[i].id;
        genArray(guildID);
    }
}

client.on('ready', () => {
    checkGuildFiles();
});

client.on('message', message => {
    //var settings = getSettingsArray(message.guild.id);
    //if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
    //const args = message.content.slice(settings.prefix.length).split(/ +/);
    //const command = args.shift().toLowerCase();
    //message.reply("test");
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

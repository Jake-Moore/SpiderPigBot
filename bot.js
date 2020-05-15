const Discord = require('discord.js');
const client = new Discord.Client();

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
        //console.log(guildID);
        genArray(guildID);
    }
}


client.on('ready', () => {
    checkGuildFiles();
});

 

client.on('message', message => {
    var settings = getSettingsArray(message.guild.id);
	   if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
    const args = message.content.slice(settings.prefix.length).split(/ +/);
	   const command = args.shift().toLowerCase();

    if(message.member.roles.cache.find(r => r.name === "Faction")){
        if (command === 'help') {
            var settingsEmbed = new Discord.MessageEmbed().setTitle('Commands help');
            var configs = "**prefix (string)**: sets the bot prefix\n**ftopChannel (string)**: set the channel name for f top notifications";
            settingsEmbed.setDescription('Type ' + settings.prefix + 'commandname with new value')
            settingsEmbed.addField('Config commands:', configs, true);
            settingsEmbed.setColor('#000000');
            settingsEmbed.setTimestamp();
            settingsEmbed.setFooter('Kami Bots');
            message.channel.send(settingsEmbed);
        }else if(command === 'prefix'){
            newPrefix = args[0]
            if (newPrefix){
                setSettingsArray(message.guild.id, "prefix", newPrefix);
                message.channel.send("set new prefix to " + newPrefix);
            }else{
                message.channel.send("please specify a prefix");
            }
        }else if(command === 'ftop'){
            if (calculatingFTop == true){
                message.channel.send("This command is on cooldown, please wait (called by: " + message.member.user.tag + ")");
            }else{
                messageAuthor = message.member.user.tag;
                bot.chat('/f top');
                message.channel.send("Calculating f top values, please wait (aprox 10 sec to prevent spam)").then((sentMessage) => {
                    ftopChatMessage = sentMessage
                })
                calculatingFTop = true;
                setTimeout(function() {
                    calculatingFTop = false;
                }, 25000);
            }
            message.delete();
        }else if(command === 'ftopchannel'){
            var a = args[0]
        }
    }else{
        message.channel.send('you are not allowed to run this');
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

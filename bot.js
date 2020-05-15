const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("SpiderBot running")
});

client.on('message', message => {
    if (!message.content.startsWith("??") || message.author.bot) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't use that command!")
    const args = message.content.slice(2).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command == "dm"){
        if (args[0] == "everyone"){
            message.channel.send("will send to all"); 
        }else{
            var dmTo = client.users.get("name", args[0]); 
            dmTo.send("test");
        }
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

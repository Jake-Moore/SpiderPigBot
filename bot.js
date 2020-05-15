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
        console.log(args[0])
        if (args[0] == "everyone"){
            message.channel.send("will send to all"); 
        }else{
            var giventxt = args[0].toString();
            var regex = "([0-9]+)"
            var groups = giventxt.match(regex);
            if (groups){
                var id = groups[0];
                var dmTo = client.users.cache.get(id); 
                if (dmTo){
                    message.channel.send("user found, sending test message");
                    var send = "";
                    for (let z = 0; z < args.length; z++){
                        send = send + args[i];
                    }
                    dmTo.send(send);
                }else{
                    message.channel.send("user not found");
                }
            }else{
                message.channel.send("user not found");
            }
        }
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

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
        //console.log(args[0]);
        var send = "";
        for (let z = 1; z < args.length; z++){
            send = send + args[z] + " ";
        }
        if (args[0] == "@everyone" || args[0] == "everyone"){
            var guildID = message.guild.id;
            const list = client.guilds.cache.get(guildID); 
            list.members.cache.forEach(member => {
                var id = member.user.id;
                if (id != 710652108541657090){
                    var dmTo = client.users.cache.get(id);
                    if (dmTo){
                        dmTo.send(send);
                    }   
                }
            });
            message.channel.send("sending message to all guild members");
        }else{
            var giventxt = args[0].toString();
            var regex = "([0-9]+)"
            var groups = giventxt.match(regex);
            if (groups){
                var id = groups[0];
                var dmTo = client.users.cache.get(id);
                var role = message.guild.roles.cache.get(id);
                if (dmTo){
                    message.channel.send("user found, sending message");
                    dmTo.send(send);
                }else{
                    if (role){
                        role.members.map(m=>{
                            var userID = m.user.id;
                            var dmTo = client.users.cache.get(userID);
                            dmTo.send(send);
                        });
                    }else{
                        message.channel.send("could not find user or role");
                    }
                }
            }else{
                message.channel.send("user not found");
            }
        }
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

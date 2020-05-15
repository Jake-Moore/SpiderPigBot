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
            var a = args[0];
            var b,c;
            if (a.search("<@")){
                b = a.replace("<@","");
            }else{
                b = a   
            }
            if (b.search(">")){
                c = b.replace(">","");   
            }
            else{   
                c = b;
            }
            console.log(c);
            var dmTo = client.users.cache.get("name", args[0]); 
            if (dmTo){
                message.channel.send("user found, sending test message");
                dmTo.send("test1");
            }else{
                message.channel.send("user not found");
            }
        }
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

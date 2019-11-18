const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {
    console.log(`O bot foi iniciado com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    // client.user.setGame(`Eu estou em ${client.guilds.size} servidores`);
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: (guild.id)). População: ${guild.memberCount} menbros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores`)
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id}).`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;


    const args = message.content.slice(config.prefix.length).trim().split(/  +/g);
    const comando = args.shift().toLowerCase();


    if (comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latência da API é ${Math.round(client.ping)}ms`)
    }
});

client.on('message', message => {
    const args = message.content.slice(config.prefix.length).split(" ");
    
    switch (args[0]) {
        case 'kick':

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.kick({ression: `Oops!`}).then(() =>{
                        message.reply(`${user.tag} foi kickado`);
                    }).cactch(err => {
                        message.reply(`Não foi possivel kickar este membro`);
                        console.log(err);
                    });
                } else {
                    message.reply(`esse membro não faz parte deste servidor`);
                }
            } else {
                message.reply(`Você precisa especificar uma pessoa`);
            }
        break;
    }
});

client.on('message', message => {
    const args = message.content.slice(config.prefix.length).split(" ");

    switch (args[0]) {
        case 'ban':

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.ban({ression: `Vish!`}).then(() =>{
                        message.reply(`${user.tag} foi banido`);
                    })
                } else {
                    message.reply(`esse membro não faz parte deste servidor`);
                } 
            } else {
                message.reply(`Você precisa especificar uma pessoa`);
            }
        break;
    }
});


client.login(config.token);
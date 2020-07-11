const Discord = require("discord.js");
const Client = new Discord.Client();
const keyAPIlol = "Key API"

const ApiController = require('./Controllers/Api');

Client.on("ready",()=>{
    const idServes = Client.guilds.cache.map(procuraId => procuraId.id)
    const nomesSevers = Client.guilds.cache.map(procuraName => procuraName.name)
    const membrosServidor = Client.guilds.cache.map(procuraMember => procuraMember.memberCount)
    
    const tabelaServidores = {"Servidores":nomesSevers, "ID":idServes, "Membros": membrosServidor}

    console.log(`LOGADO COM:${Client.user.tag}`);
    console.log(tabelaServidores)
    Client.generateInvite("ADMINISTRATOR").then(link => console.log(`Convite Bot:${link}`))
})

Client.on("message",(msg) =>{
    if(!msg.author.bot){        
        
        console.log(`Servidor:"${msg.guild.name}": Usuario:"${msg.author.username}": Diz:"${msg.content}"`)
        
       if(msg.content.startsWith("-BOTeu")){
            const idUser = ApiController.getUserId("LENILSON SCANIA",keyAPIlol);    
            ApiController.getElo(idUser,keyAPIlol).then(infoUser => msg.reply
            (`${infoUser.summonerName} Seu elo ${infoUser.tier} ${infoUser.rank}`))
        }
    }
})


Client.login("TOKEN BOT")
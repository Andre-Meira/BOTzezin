const Discord = require("discord.js");
const Client = new Discord.Client();
const keyAPIlol = "RGAPI-1a296f7c-d5b5-47a5-b76d-4c30a87b6d6b"

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
        
       if(msg.content.startsWith("-EuLOL")){
            const nameUser = msg.content.split("-EuLOL");
            const nomeLOL = 1;
            
            if(nameUser[nomeLOL]){
                const idUser = ApiController.getUserId(nameUser[nomeLOL], keyAPIlol);     
                ApiController.getElo(idUser,keyAPIlol).then(infoUser => msg.reply
                    (`${infoUser.summonerName} Seu elo 
                    (${infoUser.tier} ${infoUser.rank}), Partidas: W:${infoUser.wins} L:${infoUser.losses}`))        
            
            }
            else{
                msg.reply("Favor Colocar o seu nome do LOL!")
            }
        }
    }
})


Client.login("NzMwODYyNTAxMDQyMDYxMzY0.XwpWrA.4Usuaxw0vW9jVR2u1sK1mX7bWVc")
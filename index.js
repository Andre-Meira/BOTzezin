const Discord = require("discord.js");
const Client = new Discord.Client();
const ApiController = require('./Controllers/Api');
const { getEloSolo } = require("./Controllers/Api");
const keyAPIlol = "RGAPI-d026d8c3-2d01-4960-b7bf-d136ae81f95e"


Client.on("ready",()=>{
    const idServes = Client.guilds.cache.map(procuraId => procuraId.id);
    const nomesSevers = Client.guilds.cache.map(procuraName => procuraName.name);
    const membrosServidor = Client.guilds.cache.map(procuraMember => procuraMember.memberCount);
    const tabelaServidores = {"Servidores":nomesSevers, "ID":idServes, "Membros": membrosServidor};

    console.log(`LOGADO COM:${Client.user.tag}`);
    console.log(tabelaServidores);
    
    Client.generateInvite("ADMINISTRATOR").then(link => console.log(`Convite Bot:${link}`))
})

Client.on("message",(msg) => {   
    
    if(!msg.author.bot) {               
        console.log(`Servidor:"${msg.guild.name}": Usuario:"${msg.author.username}": Diz:"${msg.content}"`)
        
        if(msg.content.startsWith("-rankLOL")) {   
            
            const getNomeLOL = 1;
            const nameUser = msg.content.split("-rankLOL ");
            
            if(nameUser[getNomeLOL]) {    
        
                const idUser = ApiController.getUserId(nameUser[getNomeLOL], keyAPIlol)

                ApiController.getEloSolo(idUser, keyAPIlol)
                    .then(infoRank => {
                        if(infoRank == undefined){
                            msg.reply("Erro essa conta não Possui Elo")
                        }else{
                            msg.reply(`${infoRank.summonerName} seu Elo:${infoRank.tier} ${infoRank.rank} PDL:${infoRank.leaguePoints} W:${infoRank.wins} L:${infoRank.losses}`)
                        }
                    })
            
            }
            else{
                msg.reply("Favor Colocar o seu nome do LOL!");
            }
        }

        if(msg.content.startsWith("-mainLOL")){
            const getNomeLOL = 1;
            const nameUser = msg.content.split("-mainLOL ");
            
            if(nameUser[getNomeLOL]){
                
                const idUser = ApiController.getUserId(nameUser[getNomeLOL], keyAPIlol)
                ApiController.getChampionMain(idUser, keyAPIlol).then(infoChamp => {
                    msg.reply(
                        `${nameUser[getNomeLOL]} Champion Name:(${infoChamp["namesChamp"][1]}) Level Maestria: (${infoChamp["infoChamp"][0]["championLevel"]}) Pontos de Maestria:(${infoChamp["infoChamp"][0]["championPoints"]}) \\
                         Champion Name: (${infoChamp["namesChamp"][1]}) Level Maestria: (${infoChamp["infoChamp"][1]["championLevel"]}) Pontos de Maestria:(${infoChamp["infoChamp"][1]["championPoints"]}) \\
                         Champion Name: (${infoChamp["namesChamp"][2]}) Level Maestria: (${infoChamp["infoChamp"][2]["championLevel"]}) Pontos de Maestria:(${infoChamp["infoChamp"][2]["championPoints"]})`
                        )
                })

            }
            else{
                msg.reply("Favor Colocar o seu nome do LOL!")
            }
        
        }

    }
})


Client.login("NzMwODYyNTAxMDQyMDYxMzY0.XxGVWA.j5r9slpah68ZBHHrY7i37JGzE0k")

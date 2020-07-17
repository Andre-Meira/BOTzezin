const rp = require('request-promise-native')

module.exports = {
  
  async getUserId(userName,apiKey){
    
    const apiSummoner = {
      uri:`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${apiKey}`,
      json: true 
    }

    const getIdUser = await rp(apiSummoner)
      .then(idUser => {
        return idUser.id
      })
      .catch(erroApi => {
        console.log(erroApi.message)
      })
    
    return getIdUser
  },

  async getEloSolo(idUser,apiKey){
    
    const apiLeague = {
      uri:`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${await idUser}?api_key=${apiKey}`,
      json: true 
    }
    
    const infoUser = await rp(apiLeague)
      .then(getRank => {
        for(let contador = 0; contador < getRank.length; contador++){
          if(getRank[contador].queueType == 'RANKED_SOLO_5x5'){
            return getRank[contador]
          }
        }
      })
      .catch(err => {
        console.log(err.message)
      })
  
    return infoUser;
  },




}
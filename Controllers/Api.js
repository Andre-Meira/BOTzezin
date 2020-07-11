const rp = require('request-promise-native')

module.exports = {
  async getUserId(userName,apiKey){
    const api = {
      uri:`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${apiKey}`,
      json: true 
    }

    const idUser = await rp(api);
    return idUser.id;
  },

  async getElo(idUser,apiKey){
  
    const api = {
      uri:`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${await idUser}?api_key=${apiKey}`,
      json: true 
    }
    
    const infoUser = await rp(api);
    
    return infoUser[0];
  }
}
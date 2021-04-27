const fetch = require("node-fetch");
const HestiError = require("./utils/HestiError.js");

class HestiBots {
  /**
  * @constructor
  * @param {string} token - Your api key of HestiBots
  */
  constructor(token) {
    this.baseURL = "https://hestibots.xyz/api/v1";
    this.token = token;
    
    if(!this.token || typeof this.token !== 'string') throw new HestiError('Api Key is required');
  }
  
  /**
  * Gets information about the specified bot
  * @param {string} botID - The bot's ID
  * @returns {Promise} - Bot information in JSON format
  */
  getBot(botID) {
    if(typeof botID !== 'string') throw new HestiError('User ID must be a string.');
    if(!botID.length || botID.length == 0) throw new HestiError('You cannot leave the bot string empty.')
    
    return new Promise(async (resolve, reject) => {
      const res = await fetch(`${this.baseURL}/bot/${botID}`)
      const data = await res.json();
        
      if(data.error === true) return reject(new Error(data.message));
      resolve(data);
    });
  }
  
  /**
  * Gets information about the specified user
  * @param {string} userID - The user's ID
  * @returns {Promise} - User information in JSON format
  */
  getUser(userID) {
    if(typeof userID !== 'string') throw new HestiError('User ID must be a string.');
    if(!userID.length || userID.length == 0) throw new HestiError('You cannot leave the user string empty.')
    
    return new Promise(async (resolve, reject) => {
      const res = await fetch(`${this.baseURL}/user/${userID}`)
      const data = await res.json();

      if(data.error == true) return reject(new Error(data.message));
      resolve(data);
     });
  };
  
  /**
  * Checks if the specified user has voted for a certain bot
  * @param {string} botID - The bot's ID
  * @param {string} userID - The user's ID
  * @returns {Promise} - True/False in JSON format
  */
  getVoted(botID, userID) {
    if(typeof botID !== 'string') throw new HestiError('Bot ID must be a string.');
    if(!botID.length || botID.length == 0) throw new HestiError('You cannot leave the bot string empty.')
    if(typeof userID !== 'string') throw new HestiError('User ID must be a string.');
    if(!userID.length || userID.length == 0) throw new HestiError('You cannot leave the user string empty.')
    return new Promise(async (resolve, reject) => {
	    const res = await fetch(`${this.baseURL}/voted/${botID}/${userID}`);
      const dataObtained = await res.json();
      
      let data;
      if(dataObtained.error) {
        data = dataObtained.error
      } else {
        data = dataObtained
      }

      resolve(data);
    });
  };
  
  /**
  * Post bot Statistics to API.
  * @param {string} botID - the bot's ID
  * @param {number} serverCount - Bot's server count
  * @param {number} userCount - Bot's user count
  */
  postStats(botID, serverCount, userCount) {
    if(typeof botID !== 'string') throw new HestiError('Bot ID must be a string.');
    if(!botID.length || botID.length == 0) throw new HestiError('You cannot leave the bot string empty.')
    if(typeof serverCount !== 'number') throw new HestiError('Server Count must be a number.');
    if(userCount && typeof userCount !== 'number') throw new HestiError('User Count must be a number');
    
    const stats = {
      servers_count: serverCount,
      users_count: userCount
    }
    
    return fetch(`${this.baseURL}/stats/${botID}`, {
      method: 'POST',
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stats)
    }).then(async (res) => {
      let dataObtained = await res.json();
      let data;
      if(dataObtained.success) {
        data = dataObtained.success
      } else {
        data = dataObtained.error
      }
      return data;
    });
  };
};

module.exports = HestiBots;

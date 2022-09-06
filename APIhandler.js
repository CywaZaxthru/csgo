require('dotenv').config()

const fetch = require('node-fetch');
const faceit = require('./faceitAPI')
const esportal = require('./esportalAPI');
const matchmaking = require('./matchmakingAPI');
const { useSyncExternalStore } = require('react');

async function APIcaller(ID){
    const user = {}
    user.query = ID;
    user.Matchmaking  = await matchmaking.call(ID)
    if(!user.Matchmaking.ID64){
        user.Faceit = [["Couldn't get Faceit Data", "No ID 64"]]
        user.Esportal = [["Couldn't get Esportal Data", ["No ID 64"]]]
    }
    user.Faceit = await faceit.call(user.Matchmaking.ID64)
    if(!user.Matchmaking.ID32){
        user.Matchmaking.Error.push(["Couldn't get Steam ID 32", ""])
        user.Esportal = {}
        user.Esportal.Error = [["Couldn't get Esportal Data", "No ID 32"]]
    } else{
        try{
            user.Esportal = await esportal.call(user.Matchmaking.ID32)
        } 
        catch(err){
            user.Esportal = {}
            user.Esportal.Error = [["No Profile Found", err]]
        }
    }
    return user
};

exports.caller = APIcaller;
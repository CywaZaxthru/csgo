require('dotenv').config()

const fetch = require('node-fetch');
const faceit = require('./faceitAPI')
const esportal = require('./esportalAPI');
const steam = require('./steamAPI');
const { useSyncExternalStore } = require('react');

async function APIcaller(ID){
    const user = {}
    user.Steam  = await steam.call(ID)
    if(!user.Steam.ID64){
        user.Faceit = [["Couldn't get Faceit Data", "No ID 64"]]
        user.Esportal = [["Couldn't get Esportal Data", ["No ID 64"]]]
    }
    user.Faceit = await faceit.call(user.Steam.ID64)
    if(!user.Faceit.SteamName){
        user.Steam.Error.push(["Couldn't get Steam Name", ""])
    } else{
        user.Steam.name = user.Faceit.SteamName;
    }
    if(!user.Steam.ID32){
        user.Steam.Error.push(["Couldn't get Steam ID 32", ""])
        user.Esportal = {}
        user.Esportal.Error = [["Couldn't get Esportal Data", "No ID 32"]]
    } else{
        try{
            user.Esportal = await esportal.call(user.Steam.ID32)
        } 
        catch(err){
            user.Esportal = {}
            user.Esportal.Error = [["No Profile Found", err]]
        }
    }
    return user
};

exports.caller = APIcaller;
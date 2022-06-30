require('dotenv').config()

const fetch = require('node-fetch');
const faceit = require('./faceitAPI')
const esportal = require('./esportalAPI');
const steam = require('./steamAPI');
const { useSyncExternalStore } = require('react');

async function APIcaller(ID){
    const user = {}
    try {
        user.Steam  = await steam.call(ID)
    }
    catch(err){
        user.Error = []
        user.Error.push({
            APIresponse: err,
            meaning: "Couldn't get Steam Data or wrong input"
        })
        return user
    }
    try{
        user.Faceit = await faceit.call(user.Steam.ID64)
        user.Steam.name = user.Faceit.SteamName;
        delete user.Faceit.SteamName
    }
    catch(err){
        if(!user.Error){
            user.Error = []
        }
        user.Error.push({
            APIresponse: err,
            meaning: "Couldn't reach Faceit API or wrong input"
        })
    }
    try{
        user.Esportal = await esportal.call(user.Steam.ID32)
    }
    catch(err){
        if(!user.Error){
            user.Error = []
        }
        user.Error.push({
            APIresponse: err,
            meaning: "Couldn't reach Esportal API or wrong input"
        })
    }
    return user
};

exports.caller = APIcaller;
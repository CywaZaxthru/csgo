require('dotenv').config()

const fetch = require('node-fetch');
const faceit = require('./faceitAPI')
const esportal = require('./esportalAPI');
const { useSyncExternalStore } = require('react');

async function APIcaller(query){
    const ID = query["account"];
    const user = {}
    if(!/^[0-9]+$/.test(ID)){
        try {
            user.ID64 = await getSteamId(ID)
        }
        catch(err){
            user.Error = []
            user.Error.push({
                APIresponse: err,
                meaning: "Couldn't get Steam ID64 or wrong input"
            })
            return user
        }
    } else{
        user.ID64 = ID
    }
    try{
        user.ID32 = Number(user.ID64.substr(-16,16)) - 6561197960265728
    }
    catch(err) { 
        if(!user.Error){
            user.Error = []
        }
        user.Error.push({
            meaning: "Couldn't get Steam ID32 or wrong input"
        })
    }
    try{
        user.Faceit = await faceit.call(user.ID64)
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
        user.Esportal = await esportal.call(user.ID32)
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

async function getSteamId(vanityUrlName){
    const KEY = process.env.Steam_API_KEY;
    const URL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${vanityUrlName}`
    const response = await fetch(URL)
    .then(res => res.json())
    return response["response"]["steamid"]
}

exports.caller = APIcaller;
const fetch = require('node-fetch');
require('dotenv').config()

async function APIcaller(query){
    const ID = query["account"];
    let faceitData = await callFaceit(ID)
    return [faceitData, faceitData, faceitData]
};

async function callFaceit(id){
    const KEY = process.env.Faceit_API_KEY;
    let configuration = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + KEY
        }
    }
    if(!/^[0-9]+$/.test(id)){
        id = await getSteamId(id)
    }
    let players = await callPlayers(id, configuration)
    let player_id = players["player_id"]
    let stats = await callStats(player_id, configuration)
    return [players, stats]
}

async function getSteamId(vanityUrlName){
    const KEY = process.env.Steam_API_KEY;
    const URL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${vanityUrlName}`
    const response = await fetch(URL)
    .then(res => res.json())
    return response["response"]["steamid"]
}

async function callPlayers(id, configuration){
    const URL = `https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${id}`;
    const response = await fetch(URL, configuration)
    .then(res => res.json())
    return response
}

async function callStats(id, configuration){
    let URL = `https://open.faceit.com/data/v4/players/${id}/stats/csgo`
    const response = await fetch(URL, configuration)
    .then(res => res.json())
    return response
}

async function callFaceitAPI(configuration, URL){
    const response = await fetch(URL, configuration)
    .then(res => res.json())
    return response
}

exports.caller = APIcaller;
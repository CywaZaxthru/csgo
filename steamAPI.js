require('dotenv').config()
const fetch = require('node-fetch');

async function callSteamAPI(id){
    let steam = {};
    if(!/^[0-9]+$/.test(id)){
        steam.ID64 = await getSteamId(id)
    } else{
        steam.ID64 = id;
    }
    steam.ID32 = Number(steam.ID64.substr(-16,16)) - 6561197960265728
    Object.assign(steam, await getStats(steam.ID64))
    return steam
}

async function getSteamId(vanityUrlName){
    const KEY = process.env.Steam_API_KEY;
    const URL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${vanityUrlName}`
    const response = await fetch(URL)
    .then(res => res.json())
    return response["response"]["steamid"]
}

async function getStats(id){
    const KEY = process.env.Steam_API_KEY;
    const URL = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${KEY}&steamid=${id}&appid=730`
    const response = await fetch(URL)
    .then(res => res.json())
    .then(res => {
        let kills;
        let deaths;
        let won;
        let matches;
        res["playerstats"]["stats"].forEach(element => {
            switch(element["name"]){
                case "total_kills":{
                    kills = element["value"]
                    break;
                }
                case "total_deaths":{
                    deaths = element["value"]
                    break;
                }
                case "total_matches_won":{
                    won = element["value"]
                }
                case "total_matches_played":{
                    matches = element["value"]
                }

            }
        })
        return({
            kd: Math.round((kills/deaths)*100)/100,
            wr: Math.round((won/matches)*100)/100,
            matches: matches,
            frags: Math.round((kills/matches)*100)/100,
        })
    })
    return response
}

exports.call = callSteamAPI
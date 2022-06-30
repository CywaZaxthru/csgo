require('dotenv').config()
const { getAllByPlaceholderText } = require('@testing-library/react');
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
    Object.assign(steam, await getDate(steam.ID64))
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
        let headshots
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
                    break;
                }
                case "total_matches_played":{
                    matches = element["value"]
                    break;
                }
                case "total_kills_headshot":{
                    headshots = element["value"]
                    break;
                }
            }
        })
        return({
            kd: Math.round((kills/deaths)*100)/100,
            wr: Math.round((won/matches)*100)/100,
            matches: matches,
            frags: Math.round((kills/matches)*100)/100,
            headshot_rate: Math.round((headshots/kills)*100)/100
        })
    })
    return response
}

async function getDate(ID){
    const KEY = process.env.Steam_API_KEY;
    const URL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2?key=${KEY}&steamids=${ID}`
    const response = await fetch(URL)
    .then(res => res.json())
    .then(res => {
        let date = new Date(res.response.players[0].timecreated*1000).toString()
        date = date.split(" ")
        date = [date[2], date[1], date[3]]

        switch(date[1]){
            case "Jan":
                date[1] = "January"
                break;
            case "Feb":
                date[1] = "February"
                break;
            case "Mar":
                date[1] = "March"
                break;
            case "Apr":
                date[1] = "April"
                break;
            case "May":
                date[1] = "May"
                break;
            case "Jun":
                date[1] = "June"
                break;
            case "Jul":
                date[1] = "July"
                break;
            case "Aug":
                date[1] = "August"
                break;
            case "Sep":
                date[1] = "September"
                break;
            case "Oct":
                date[1] = "October"
                break;
            case "Nov":
                date[1] = "November"
                break;
            case "Dec":
                date[1] = "December" 
                break;
        }

        date = date.join(" ")

        return({
            creationDate: date
        })
    })
    return response
}

exports.call = callSteamAPI
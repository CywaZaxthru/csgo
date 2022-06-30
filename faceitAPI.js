require('dotenv').config()
const fetch = require('node-fetch');

async function callFaceitAPI(id) {
    const KEY = process.env.Faceit_API_KEY;
    let configuration = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + KEY
        }
    }
    let faceit = await callPlayers(id, configuration)
    Object.assign(faceit, await callStats(faceit["player_id"], configuration))
    return faceit
}

async function callPlayers(id, configuration) {
    const URL = `https://open.faceit.com/data/v4/players?game=csgo&game_player_id=${id}`;
    const response = await fetch(URL, configuration)
        .then(res => res.json())
        .then(res => {
            return ({
                player_id: res["player_id"],
                skill_level: res["games"]["csgo"]["skill_level"],
                faceit_elo: res["games"]["csgo"]["faceit_elo"],
                faceit_url: res["faceit_url"].replace("{lang}", "en"),
                game_player_name: res["games"]["csgo"]["game_player_name"],
                nickname: res["nickname"],
                SteamName: res["games"]["csgo"]["game_player_name"]
            })
        })
    return response
}

async function callStats(id, configuration) {
    let URL = `https://open.faceit.com/data/v4/players/${id}/stats/csgo`
    const response = await fetch(URL, configuration)
        .then(res => res.json())
        .then(res => {
            let frags = 0;
            let matches = 0;
            res["segments"].forEach(element => {
                frags += parseInt(element["stats"]["Kills"])
                matches += parseInt(element["stats"]["Matches"])
            })
            let averageFrags = Math.round(frags/matches*100)/100
            return ({
                matches: matches,
                average_KD: (res["lifetime"]["Average K/D Ratio"]),
                average_frags:  averageFrags,
                wr: Math.round(parseInt(res["lifetime"]["Wins"]) / parseInt(res["lifetime"]["Matches"])*100)/100,
                headshot_rate: res["lifetime"]["Average Headshots %"]
            })
        })
    return response
}

exports.call = callFaceitAPI
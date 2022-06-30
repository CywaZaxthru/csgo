const libesportal = require("@macksterino/esportal-wrapper");

const esportal = new libesportal.Esportal();

async function callEsportalAPI(ID){
    const response = await esportal.fetchUserProfile(ID)
            .then(res => {
                let wins = res.stats["recent_wins"]
                let losses = res.stats["recent_losses"]
                return(
                {
                    username: res.general.username,
                    kd: Math.round((res.stats.kills/res.stats.deaths)*100)/100,
                    matches: wins + losses,
                    elo: res.stats.elo,
                    thumbs_up: res.stats["thumbs_up"],
                    thumbs_down: res.stats["thumbs_down"],
                    frags: Math.round((res.stats.kills / res.stats.matches)*100)/100,
                    wr: Math.round((wins / (wins + losses))*100)/100,
                    headshot_rate: Math.round((res.stats["recent_headshots"]/res.stats["recent_kills"])*100)/100
                }
            )
        }) 
    return response 
}

exports.call = callEsportalAPI
require('dotenv').config()
const { getAllByPlaceholderText } = require('@testing-library/react');
const fetch = require('node-fetch');
const Hero = require('@ulixee/hero-playground');
const { response } = require('express');
const { type } = require('@testing-library/user-event/dist/type');

async function callSteamAPI(id){
    let steam = {};
    steam.Error = []
    if(!/^[0-9]+$/.test(id)){
        if(id.includes("STEAM")){
            try{
                id = id.split(":");
                let a = id[1];
                let b = id[2]
                steam.ID64 = BigInt(76561197960265728) + BigInt(parseInt(a)) +BigInt(2*b);
                steam.ID64 = steam.ID64.toString()
                steam.ID32 = Number(steam.ID64.substr(-16,16)) - 6561197960265728
            }
            catch(err){
                steam.Error.push(["Couldn't process ID", err])
            }
        } else{
            try{
                steam.ID64 = await getSteamId(id)
                steam.ID32 = Number(steam.ID64.substr(-16,16)) - 6561197960265728
            }
            catch(err){
                steam.Error.push(["Couldn't get ID64", err])
            }
        }
    } else{
        steam.ID64 = id;
        steam.ID32 = Number(steam.ID64.substr(-16,16)) - 6561197960265728
    }
    try{
        Object.assign(steam, await getStats(steam.ID64))
    }
    catch(err){
        steam.Error.push(["Couldn't get Steam Data", err])
    }
    if(steam.ID64){
        try{
        
            Object.assign(steam, await getDate(steam.ID64))
        }
        catch(err){
            steam.Error.push(["Couldn't get Steam Creation Date", err])
        }
    } else {
        steam.Error.push(["Couldn't get Steam Creation Date", "No Data"])
    }
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
    const hero = new Hero();
    await hero.goto(`https://csgostats.gg/player/${id}`);
    let stats = await hero.document.querySelector('.stats-col-1').innerText;
    let topStats = await hero.document.querySelector('.main-container :nth-child(1)').innerHTML;
    let kd = await hero.document.querySelector('.stats-col-1 :nth-child(1)').innerHTML;
    await hero.close();
    stats = stats.replace(/ /g,"");
    stats = stats.replace(/\n/g, "");
    topStats = topStats.replace(/ /g,"");
    topStats = topStats.replace(/\n/g, "");
    kd = kd.replace(/\n/g, "");
    kd = kd.replace(/ /g,"");
    kd = kd.match(/>[0123456789.]+</)[0];
    kd = kd.match(/[0123456789.]+/)[0];
    let headshot_rate = stats.match(/HS%\d{2}%/)[0];
    let kills = stats.match(/KILLS\d*/i)[0];
    let matches = stats.match(/PLAYED\d*/i)[0];
    let wr = stats.match(/WINRATE\d{2}%/i)[0];
    let compWins = topStats.match(/Comp\.Wins.*\d/i)[0];
    let rank = topStats.match(/imgsrc="https:\/\/static.csgostats.gg\/images\/ranks\/.*\.png"wi/)[0];
    let pb = topStats.match(/imgsrc=".*?"/)[0];
    let name = topStats.match(/player-name.*?<\//)[0];
    name = name.replace('player-name">', "");
    name = name.replace("</", "");
    pb = pb.replace('imgsrc="',"");
    pb = pb.replace('"',"");
    rank = rank.match(/https:.*png/)[0];
    compWins = compWins.match(/\d*$/)[0]
    let frags;
    headshot_rate = headshot_rate.replace("HS%", "");
    kills = kills.replace(/KILLS/i, "");
    matches = matches.replace(/PLAYED/i, "");
    wr = wr.replace(/WINRATE/i, "");
    kd = kd.replace(/K\/D/, "");
    frags = Math.round((kills/matches)*100)/100;
    return({
        kd: kd,
        wr: wr,
        matches: matches,
        frags: frags,
        headshot_rate: headshot_rate,
        compWins: compWins,
        rank: rank,
        pb: pb,
        name: name
    })
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
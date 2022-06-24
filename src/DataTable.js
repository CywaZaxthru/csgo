import Elo from './Elo'

function DataTable(props){
    let segments = props["dataset"][1]["segments"]; 
    let matches = 0;
    let totalFrags = 0;
    segments.forEach(element => {
        matches += parseInt(element["stats"]["Matches"]);
        totalFrags += element["stats"]["Average Kills"] * element["stats"]["Matches"];
    })
    let profileLink = props["dataset"][0]["faceit_url"]
    profileLink = profileLink.replace("{lang}", "en");

    return(
        <div className="border border-dark border-2 rounded-3 table"> 
            <p>Faceit Account: <a href={profileLink}>{profileLink}</a></p>
            <Elo value={props["dataset"][0]["games"]["csgo"]}/>
            <p>Matches: {matches}</p>
            <p>Average KD: {props["dataset"][1]["lifetime"]["Average K/D Ratio"]}</p>
            <p>Average Frags: {Math.round(totalFrags/matches*100)/100}</p>
        </div>
    )
}

export default DataTable;
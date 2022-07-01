function Faceit(props){
    let imagePath = `/Level Icons Faceit/${props.data["skill_level"]}.png`

    if(!props.data.Error){
        return(
            <div className="d-flex flex-column data-div justify-content-around" id="faceit">
                <p className="stats">Profile: <a href={props.data["faceit_url"]} target="_blank">{props.data.nickname}</a></p>
                <p className="stats">Elo: {props.data["faceit_elo"]} <img src={imagePath} alt="Faceit Skill Level"></img></p>
                <p className="stats">Headshot Rate: {props.data["headshot_rate"] + "%"}</p>
                <p className="stats">Winrate: {props.data.wr * 100 + "%"}</p>
                <p className="stats">Matches: {props.data.matches}</p>
                <p className="stats">Average KD: {props.data["average_KD"]}</p>
                <p className="stats">Average Frags: {props.data["average_frags"]}</p>
            </div>
        )
    } else{
        return(
            props.data.Error.map(element => {
                return(
                    <p className="stats">{element[0]}</p>
                )
            })
        )
    }
}

export default Faceit
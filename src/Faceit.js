function Faceit(props){
    let imagePath = `/Level Icons Faceit/${props.data["skill_level"]}.png`
    let styleP= {
        "line-height": 1,
        "font-size": props.height/21
    }
    let styleI = {
        width: props.height/12
    }
    let style
    if(props.faceit){
        style = {
            "padding-bottom": 45
        }
    }
    if(!props.data.Error){
        return(
            <div id="faceit" style={style} className="d-flex flex-column justify-content-around">
                <p style={styleP} className="stats">Profile: <a href={props.data["faceit_url"]} target="_blank">{props.data.nickname}</a></p>
                <p style={styleP} className="stats">Elo: {props.data["faceit_elo"]} <img style={styleI} src={imagePath} alt="Faceit Skill Level"></img></p>
                <p style={styleP} className="stats">Headshot Rate: {props.data["headshot_rate"] + "%"}</p>
                <p style={styleP} className="stats">Winrate: {Math.round(props.data.wr * 100) + "%"}</p>
                <p style={styleP} className="stats">Matches: {props.data.matches}</p>
                <p style={styleP} className="stats">Average KD: {props.data["average_KD"]}</p>
                <p style={styleP} className="stats">Average Frags: {props.data["average_frags"]}</p>
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
function Faceit(props){
    let imagePath = `/Level Icons/${props.data["skill_level"]}.png`
    return(
        <div>
            <p>Faceit Account: <a href={props.data["faceit_url"]} target="_blank">{props.data.nickname}</a></p>
            <p>Elo: {props.data["faceit_elo"]} <img src={imagePath} alt="Skill Icon"></img></p>
            <p>Matches: {props.data.matches}</p>
            <p>Average KD: {props.data["average_KD"]}</p>
            <p>Average Frags: {props.data["average_frags"]}</p>
        </div>
    )
}

export default Faceit
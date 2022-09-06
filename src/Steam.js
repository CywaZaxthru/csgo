function Steam(props){
    let profileLink = `http://steamcommunity.com/profiles/${props.data.ID64}`
    let classname = "stats";
    let style
    let styleI
    let styleP = {
        width: props.height/10
    }
    
    if(props.height !== 400){
        style = {
            "line-height": 1,
            "font-size": props.height/21
        }
    }
    if(props.matchmaking){
        styleI={
            "padding-bottom": 40
        }
    }
    
    if(!props.data.Error[0]){
        return(
            <div id="matchmaking" style={styleI} className="d-flex flex-column justify-content-around data-div">
                <div className="d-flex justify-content-center">
                    <h2 className="whiteText">Matchmaking</h2>
                </div>
                <p style={style} className={classname}>Profile: <span><a href={profileLink} target="_blank">{props.data.name}</a></span></p>
                <p style={style} className={classname}>Competitive Wins: {props.data.compWins}</p>
                <p style={style} className={classname}>Rank: <img id="matchmakingIMG" src={props.data.rank}></img></p>
                <p style={style} className={classname}>Headshot Rate: {props.data.headshot_rate}</p>
                <p style={style} className={classname}>Winrate: <span>{props.data.wr}</span></p>
                <p style={style} className={classname}>Matches: <span>{props.data.matches}</span></p>
                <p style={style} className={classname}>Average KD: <span>{props.data.kd}</span></p>
                <p style={style} className={classname}>Average Frags: <span>{props.data.frags}</span></p>
                <p style={style} className={classname}>Account Created: <span>{props.data.creationDate}</span></p>
            </div>
        )
    } else{
        return(
            props.data.Error.map(element => {
                return(
                    <>
                        <p className="stats" key={element[0]}>{element[0]}</p>
                    </>
                )
            })
        )
    }
}

export default Steam
function Steam(props){
    let profileLink = `http://steamcommunity.com/profiles/${props.data.ID64}`
    let classname = "stats";
    let style
    let styleI
    if(props.height !== 400){
        style = {
            "line-height": 1,
            "font-size": props.height/21
        }
    }
    if(props.matchmaking){
        styleI={
            "padding-bottom": 50
        }
    }
    
    if(!props.data.Error[0]){
        return(
            <div id="matchmaking" style={styleI} className="d-flex flex-column justify-content-around data-div">
                <p style={style} className={classname}>Profile: <span><a href={profileLink} target="_blank">{props.data.name}</a></span></p>
                <p style={style} className={classname}>Headshot Rate: {Math.round(props.data["headshot_rate"]*100) + "%"}</p>
                <p style={style} className={classname}>Winrate: <span>{Math.round(props.data.wr * 100) + "%"}</span></p>
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
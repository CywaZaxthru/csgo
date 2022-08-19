function Esportal(props){
    let profileLink = `https://esportal.com/de/profile/${props.data.username}` 
    let levelBorders = [[999, "Silver"], [1099, "Gold-I"], [1199,"Gold-II"], [1299,"Veteran-I"], [1399,"Veteran-II"], [1499,"Master-I"], [1599,"Master-II"], [1699,"Elite-I"], [1799,"Elite-II"], [1899,"Pro-I"], [1999,"Pro-II"]]
    let imagePath = `/Level Icons Esportal/`;
    let styleP = {
        "line-height": 1,
        "font-size": props.height/21
    }
    let styleI = {
        width: props.height/12
    }
    let style;
    if(props.esportal){
        style = {
            "padding-bottom": 40
        }
    }

    let temp = levelBorders.filter(element => {
        return element[0] >= props.data.elo
    })

    if(temp.length > 0){
        imagePath += `${temp[0][1]}`
    } else{
        imagePath += `Legend`
    }

    imagePath += `.webp`

    if(!props.data.Error){
        return(
            <div id="esportal" style={style} className="d-flex flex-column justify-content-around">
                <p style={styleP} className="stats">Profile: <a href={profileLink} target="_blank">{props.data.username}</a></p>
                <p style={styleP} className="stats">Elo: {props.data.elo} <img style={styleI} src={imagePath} alt="Esportal Skill Level"></img></p>
                <p style={styleP} className="stats">Headshort Rate: {Math.round(props.data["headshot_rate"] * 100) + "%"}</p>
                <p style={styleP} className="stats">Winrate: {Math.round(props.data.wr*100) + "%"}</p>
                <p style={styleP} className="stats">Matches: {props.data.matches}</p>
                <p style={styleP} className="stats">Average KD: {props.data.kd}</p>
                <p style={styleP} className="stats">Average Frags: {props.data.frags}</p>
                <p style={styleP} className="stats">Rating: {props.data["thumbs_up"]} <i class="fa-solid fa-thumbs-up"></i> {"/" + props.data["thumbs_down"]} <i class="fa-solid fa-thumbs-down"></i></p>
            </div>
        )
    } else{
        return(
            props.data.Error.map(element => {
                return(
                    <>
                        <p className="stats">{element[0]}</p>
                    </>
                )
            })
        )
    }
}

export default Esportal
import './styles.css';

function Elo (props){
    let elo = props["value"]["faceit_elo"];
    let level = props["value"]["skill_level"];
    let imagePath = `/Level Icons/${level}.png`;

    return(
        <>
            <p>Elo: {elo} <img src={imagePath} alt='skill level'></img></p>
        </>
    )  
}

export default Elo
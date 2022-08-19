import DataTable from './DataTable'

function Databox(props){
    let usefulData = props.data
    delete usefulData.query
    const keys = Object.keys(usefulData)
    const style = {
        height: props.height
    }
    return(
        keys.map((element) => {
            return(
                <div key={element} style={style} className="DataTable-margin rounded-4 dataBox-div data-div justify-content-evenly" >
                    <DataTable dataset={props.data[element]} title={element} height={props.height} faceit={props.faceit} matchmaking={props.matchmaking} esportal={props.esportal}/>
                </div>  
            )
        })
    )
}

export default Databox;
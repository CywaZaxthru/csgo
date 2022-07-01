import DataTable from './DataTable'

function Databox(props){
    let usefulData = props.data
    delete usefulData.query
    const keys = Object.keys(usefulData)
    return(
        keys.map((element) => {
            return(
                <div key={element} className="DataTable-margin rounded-4 dataBox-div">
                    <DataTable dataset={props.data[element]} title={element}/>
                </div>  
            )
        })
    )
}

export default Databox;
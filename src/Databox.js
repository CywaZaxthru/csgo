import DataTable from './DataTable'

function Databox(props){
    const keys = Object.keys(props.data)
    return(
        keys.map((element) => {
            return(
                <div key={element} className="DataTable-margin">
                    <DataTable dataset={props.data[element]} title={element}/>
                </div>  
            )
        })
    )
}

export default Databox;
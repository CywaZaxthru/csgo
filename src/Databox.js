import DataTable from './DataTable'

function Databox(props){
    const keys = Object.keys(props.data)
    return(
        keys.map((element) => {
            if(element !== "ID64" && element !== "ID32"){
                return(
                    <div key={element}>
                        <DataTable dataset={props.data[element]} title={element}/>
                    </div>  
                )
            }
        })
    )
}

export default Databox;
import Faceit from './Faceit'
import Esportal from './Esportal'
import Steam from './Steam'

function DataTable(props){
    if(props.title === "Faceit"){
        return(
            <>
                <h1>Faceit</h1>
                <Faceit data={props.dataset}/>
            </>
        )
    } else if(props.title === "Esportal"){
        return(
            <>
                <h1>Esportal</h1>
                <Esportal data={props.dataset}/>
            </>
        )
    } else if(props.title === "Steam"){
        return(
            <>
                <h1>Steam</h1>
                <Steam data={props.dataset}/>
            </>
        )
    }
}

export default DataTable;
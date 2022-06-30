import Faceit from './Faceit'
import Esportal from './Esportal'
import Steam from './Steam'

function DataTable(props){
    if(props.title === "Faceit"){
        return(
            <>
                <h1 className='dataTable-head text-center'>Faceit</h1>
                <br />
                <Faceit data={props.dataset}/>
            </>
        )
    } else if(props.title === "Esportal"){
        return(
            <>
                <h1 className='dataTable-head text-center'>Esportal</h1>
                <br />
                <br />
                <Esportal data={props.dataset}/>
            </>
        )
    } else if(props.title === "Steam"){
        return(
            <>
                <h1 className='dataTable-head text-center'>Matchmaking</h1>
                <br />
                <Steam data={props.dataset}/>
            </>
        )
    }
}

export default DataTable;
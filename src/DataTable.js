import Faceit from './Faceit'
import Esportal from './Esportal'
import Steam from './Steam'

function DataTable(props){
    if(props.title === "Faceit"){
                if(props.height !== 400){
                    return(
                        <Faceit data={props.dataset} height={props.height}/>
                    )
                } else{
                    return(
                    <>
                        <Faceit data={props.dataset} faceit={props.faceit}/>
                    </>
                    )
                }
           
    } else if(props.title === "Esportal"){
       if(props.height !== 400){
        return(
            <Esportal data={props.dataset} height={props.height}/>
        )
       } else{
        return(
            <>
                <Esportal data={props.dataset} esportal={props.esportal}/>
            </>
        )
       }
    } else if(props.title === "Matchmaking"){
        if(props.height !== 400){
            return(
                <Steam data={props.dataset} height={props.height}/>
            )
        } else{
            return(
            <>
                <Steam data={props.dataset} matchmaking={props.matchmaking}/>
            </>
            )
        }
    }
}

export default DataTable;
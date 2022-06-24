import DataTable from './DataTable'

function Databox(props){
    const keys = props.data
    let text
    return(
        keys.map((element, index) => {
            switch(index){
                case 0:{
                    text = "Faceit";
                    break;
                }
                default: {
                    text = "Unbekannte API"
                }
            }
            return(
                <div key={text}>
                    <DataTable dataset={element}/>
                </div>   
            )
        })
    )
}

export default Databox;
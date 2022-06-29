function Error(props){
    return( 
        props["errors"].map(element => {
            return(
                <div key={element}>
                    <p className="text-center error">ERROR: {element}</p>
                </div>
            )
        })
    )
}

export default Error
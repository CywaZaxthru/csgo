function Error(props){
    return( 
        props["errors"].map(element => {
            return(
                <div key={element}>
                    <p>{element}</p>
                </div>
            )
        })
    )
}

export default Error
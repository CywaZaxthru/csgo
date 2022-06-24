function Error(props){
    return( 
        props["errors"].map(element => {
            return(
                <>
                    <p className="text-center">{element}</p>
                </>
            )
        })
    )
}

export default Error
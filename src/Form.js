import { useState } from 'react';
function Form(props){
    const initialState = "";
    const [text, setText] = useState(initialState);

    
    if(props.data !== undefined){
        Submitfunction(props.data)
    }

    async function Submitfunction(account){
        let id = cutData(account)
        let userData = await requestData(id);
        props.setMainState(userData)
    }

    async function requestData(userId){
        const URL =`/api?account=${userId}`; 
        const configuration = {
            method: 'GET'
        };
        const response = await fetch(URL, configuration).then(res => res.json())
        return response;
    }

    function cutData(link){
        let formats = ["https://steamcommunity.com/id/", "https://steamcommunity.com/profiles/"]
        formats.forEach(element => {
            if(link.includes(element)){
                link = link.replace(element, "")
            }
        })
        link = link.replace("/", "") 
        return link
    }



    return(
        <>
            <div className="d-flex align-items-center">
                <fieldset className='d-flex align-items-center'>
                    <div className='col-sm form-group mb-3'>
                        <label htmlFor="url-input"></label> 
                            <input placeholder="Steam ID 64/Steam Profile URL/Steam ID URL" type="text" id="url-input" name="account" onChange={(e) => {
                            setText(e.target.value)
                            }} value={text} className="rounded-pill rounded-4"></input>
                        </div>
                        <div className='col-auto text-end form-group mb-3' id="button-div">
                            <a href={`./answer?account=${text}`} className='search-link'>
                                <div id="submit" className='rounded-pill rounded-4 button d-flex justify-content-center align-items-center'><i class="fa-solid fa-magnifying-glass"></i></div>
                            </a>
                        </div>
                    </fieldset>
            </div>   
        </>
    )
}

export default Form;
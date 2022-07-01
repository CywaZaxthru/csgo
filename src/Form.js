import { useState } from 'react';
import {Link, useResolvedPath} from "react-router-dom"

function Form(props){
    const initialState = "";
    const [text, setText] = useState(initialState);

    if(window.location.search !== ""){
        let search = window.location.search.replace("?account=", "")
        Submitfunction(search)
    }
    

    async function Submitfunction(account){
        let id = cutData(account)
        let userData = await requestData(id);
        setText("")
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
                            <LINK  to={`./answer?account=${text}`} />
                        </div>
                    </fieldset>
            </div>   
        </>
    )

    function LINK({to}){
        const resolvedPath = useResolvedPath(to)
        let input = resolvedPath.search.replace("?account=", "")
        if(input.length > 0){
            Submitfunction(input)
        }
        return(
            <Link to={to} className='search-link'>
                <div id="submit" className='rounded-pill rounded-4 button d-flex justify-content-center align-items-center'><i class="fa-solid fa-magnifying-glass"></i></div>
            </Link>
        )
    }
}

export default Form;
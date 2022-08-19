import { useState } from 'react';
import {Link, useResolvedPath} from "react-router-dom"

function Form(props){
    const initialState = "";
    const [text, setText] = useState(initialState);
    const [goal, setGoal] = useState(initialState)

    if(window.location.search !== ""){
        let search = window.location.search.replace("?account=", "")
        Submitfunction(search)
    }

    async function Submitfunction(account){
        let requestElement = cutData(account)
        let counter = 1;
        let userData = [];
        if(requestElement.includes("$") && props.oldstate !== requestElement){
            requestElement = requestElement.split("$")
            for(let i = 0; i<requestElement.length; i++){
                userData[i] = requestData(requestElement[i])
                userData[i].then(res => {
                    userData[i] = res
                })
                .then(() => {
                    if(counter != requestElement.length){
                        counter ++
                    } else{
                        userData[userData.length] = requestElement.join("$")
                        setText("")
                        props.setMainState(userData)
                        return
                    }
                })
            }
        } else if(props.oldstate !== requestElement){
            userData = await requestData(requestElement);
            setText("")
            props.setMainState(userData)
        }
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
                    link = link.replace("/", "") 
            }
        })
        return link
    }

    function proccessText(input){
        if(input.includes("#")){
            let split = input.split("#")
            split = split.filter(element => {
                return element.includes("STEAM")
            })
            let regex = /STEAM.{5}\d*/
            split = split.map(element => {
                element = element.match(regex)[0]
                return element
            })
            split = split.join("$")
            setGoal(split)
        } else{
            setGoal(input)
        }
    }

    return(
        <>
            <div className="d-flex align-items-center">
                <fieldset className='d-flex align-items-center'>
                    <div className='col-sm form-group mb-3'>
                        <label htmlFor="url-input"></label> 
                            <input placeholder="Steam ID 64/Steam Profile URL/Steam ID URL" type="text" id="url-input" name="account" onChange={(e) => {
                            proccessText(e.target.value)
                            setText((e.target.value))
                            }} value={text} className="rounded-pill rounded-4"></input>
                        </div>
                        <div className='col-auto text-end form-group mb-3' id="button-div">
                            <LINK  to={`./answer?account=${goal}`} />
                        </div>
                    </fieldset>
            </div>   
        </>
    )

    function LINK({to}){
        const resolvedPath = useResolvedPath(to)
        return(
            <Link to={to} className='search-link'>
                <div id="submit" onClick={() => {
                    Submit()
                }} className='rounded-pill rounded-4 button d-flex justify-content-center align-items-center'><i class="fa-solid fa-magnifying-glass"></i></div>
            </Link>
        )

        function Submit(){
        let input = resolvedPath.search.replace("?account=", "")
        if(input.length > 0){
            Submitfunction(input)
        }
        }
    }
}

export default Form;
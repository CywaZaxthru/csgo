import './styles.css';
import { useState } from 'react';

function Form(props){
    const initialState = "";
    const [text, setText] = useState(initialState);

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
        /*Next line to remove "/" at the end of link*/
        link = link.replace("/", "") 
        return link
    }

    async function Submitfunction(e){
        e.preventDefault();
        let id = cutData(text)
        let userData = await requestData(id);
        setText("");
        if(userData[0][0]["errors"]){
            let errors = userData[0][0]["errors"].map(element => element["message"])
            props.setMainState(["ERROR", errors])
        } else{
            props.setMainState(userData)
        }
    }

    return(
        <form className="container-fluid d-flex justify-content-center" onSubmit={(e) => Submitfunction(e)}>
                <fieldset>
                    <label htmlFor="url/input"></label> 
                    <input placeholder="Steam ID 64/Steam Profile URL/Steam ID URL" type="text" id="url-input"  className='border border-dark border-2 rounded-3' name="account" onChange={(e) => {
                        setText(e.target.value)
                    }} value={text}></input>
                    <button type="submit" className='btn btn-dark btn-sm rounded-3 border-2' id="submit">Suche</button>
                </fieldset>
        </form>
    )
}

export default Form;
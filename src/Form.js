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
        link = link.replace("/", "") 
        return link
    }

    async function Submitfunction(e){
        e.preventDefault();
        let id = cutData(text)
        let userData = await requestData(id);
        setText("");
        if(userData.Error){
            let errors = userData.Error.map(element => element.meaning)
            props.setMainState(["ERROR", errors])
        } else{
            props.setMainState(userData)
        }
    }

    return(
        <form onSubmit={(e) => Submitfunction(e)} className="d-flex align-items-center">
                <fieldset className='d-flex align-items-center'>
                    <div className='col-sm form-group mb-3'>
                        <label htmlFor="url-input"></label> 
                        <input placeholder="Steam ID 64/Steam Profile URL/Steam ID URL" type="text" id="url-input" name="account" onChange={(e) => {
                        setText(e.target.value)
                        }} value={text}></input>
                    </div>
                    <div className='col-auto text-end form-group mb-3' id="button-div">
                        <button type="submit" id="submit" >Suche</button>
                    </div>
                </fieldset>
        </form>
    )
}

export default Form;
import './styles.css';
import Form from './Form';
import Databox from './Databox';
import Error from './Error';
import { useState } from 'react';

function Main(){
    const initialState =[];
    const [mainState, setMainState] = useState(initialState);

    if(mainState[0] === "ERROR"){
      return(
        <main className="container-fluid position-relative d-flex flex-column justify-content-evenly">
          <Form setMainState={setMainState} className="align-self-start"/>
          <Error errors={mainState[1]}/>
        </main>
      )
    }else if(Object.keys(mainState).length > 0){
        return(
            <main className="container-fluid position-relative d-flex flex-column justify-content-evenly">
                <Form setMainState={setMainState} className=""/>
                    <div id="data" className="d-flex justify-content-around" i="inner-data-div">
                        <Databox data={mainState} />
                    </div>
            </main>
        )
    }else{
        return(
            <main className="container-fluid position-relative d-flex flex-column">
                <Form setMainState={setMainState} className="align-self-start"/>
            </main>
        )
    }
}

export default Main;
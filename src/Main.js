import './styles.css'
import Form from './Form';
import Databox from './Databox';
import { useState } from 'react';

function Main(){
    const initialState =[];
    const [mainState, setMainState] = useState(initialState);

    if(Object.keys(mainState).length > 0){
        return(
            <>
                <main className='d-xl-flex justify-content-xl-center align-items-center'>
                    <div>
                        <h1 className='text-center'>Counterstrike Player Finder</h1>
                        <div className='container'>
                            <div className='row'>
                                <div className='d-flex justify-content-center'>
                                    <Form setMainState={setMainState}/> 
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-center' id="data-div">
                            <div className='row'>
                                <div className='d-flex justify-content-evenly'>
                                    <Databox data={mainState}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }else{
        return(
            <main className='d-xl-flex justify-content-xl-center align-items-xl-center'>
                <div>
                    <h1 className='text-center shadow'>Counterstrike Player Finder</h1>
                    <div className='container'>
                        <div className='row'>
                            <div className='d-flex justify-content-center'>
                                <Form setMainState={setMainState}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main;
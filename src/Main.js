import './styles.css'
import Form from './Form';
import Databox from './Databox';
import { useState } from 'react';
import Footer from './Footer'

function Main(){   
    const initialState = {}
    const [mainState, setMainState] = useState(initialState);
    const position = {
        position: "static"
    }
    if(Array.isArray(mainState)){
        return(
            <>
            <div>
                <h1 className='text-center main-h1'>Counterstrike Player Finder</h1>
                <div className='container'>
                    <div className='row'>
                        <div className='d-flex justify-content-center'>
                            <Form setMainState={setMainState} oldstate={mainState[mainState.length-1]}/> 
                        </div>
                    </div>
                </div>
                <div>
                    {mainState.map((element, index) => {
                                                if(index !== mainState.length-1){
                                                    return(
                                                        <div className='row'>
                                                            <div className='d-flex justify-content-evenly'>
                                                                <Databox data={element}  height={300}/>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                    )
                    }
                </div>
                <div className='absolute-div' style={position}>
                    <div className='row d-flex justify-content-around Footer-div'>
                        <Footer/>
                    </div>
                </div>
            </div>
            </>
        )
    }else if(Object.keys(mainState).length > 1){
        return(
            <>
                <main className='d-xl-flex justify-content-xl-center align-items-center'>
                    <div>
                        <h1 className='text-center main-h1'>Counterstrike Player Finder</h1>
                        <div className='container'>
                            <div className='row'>
                                <div className='d-flex justify-content-center'>
                                    <Form setMainState={setMainState} oldstate={mainState.query}/> 
                                </div>
                            </div>
                            <div className='absolute-div'>
                                <div className='row d-flex justify-content-around Footer-div'>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-center' id="data-div">
                            <div className='row'>
                                <div className='d-flex justify-content-evenly'>
                                    <Databox data={mainState} height={400} faceit={true} matchmaking={true} esportal={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }else{
        console.log("test")
        return(
            <>
                <main className='d-xl-flex justify-content-xl-center align-items-xl-center'>
                    <div>
                        <h1 className='text-center main-h1'>Counterstrike Player Finder</h1>
                        <div className='container'>
                            <div className='row'>
                                <div className='d-flex justify-content-center'>
                                    <Form setMainState={setMainState}/> 
                                </div>
                            </div>
                            <div className='absolute-div'>
                                <div className='row d-flex justify-content-around Footer-div'>
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default Main;
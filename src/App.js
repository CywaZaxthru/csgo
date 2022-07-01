import Main from './Main';
import { Route, Routes} from "react-router-dom"

function App(){
            return(
                <div id="box">
                    <Routes>
                        <Route path="*" element={<Main />}/>
                    </Routes>
                </div>
            )
}

export default App;

import Main from './Main';

function App(){
        if(window.location.pathname === "/answer"){

            let search = window.location.search.replace("?account=", "")
            return(
                <div id ="box">
                    <Main query={search}/>
                </div>
            )
        } else{
            return(
                <div id="box">
                    <Main />
                </div>
            )
        }
}

export default App;

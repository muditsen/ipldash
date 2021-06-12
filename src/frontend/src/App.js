import './App.css';
import {TeamPage} from "./page/TeamPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {MatchPage} from "./page/MatchPage";


function App() {
    return (
        <Router>
            <Switch>
                <Route path={"/team/:teamName/matches/:year"}>
                    <MatchPage/>
                </Route>

                <Route path={"/team/:teamName"}>
                    <TeamPage/>
                </Route>

            </Switch>
        </Router>

    );
}

export default App;

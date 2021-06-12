import './App.css';
import {TeamPage} from "./page/TeamPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {MatchPage} from "./page/MatchPage";


function App() {
    return (
        <Router>
            <Switch>
                <Route path={"/teams/:teamName/matches/:year"}>
                    <MatchPage/>
                </Route>

                <Route path={"/teams/:teamName"}>
                    <TeamPage/>
                </Route>

            </Switch>
        </Router>

    );
}

export default App;

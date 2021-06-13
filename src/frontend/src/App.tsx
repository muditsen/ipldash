import './App.scss';
import {TeamPage} from "./page/TeamPage";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {MatchPage} from "./page/MatchPage";
import {HomePage} from "./page/HomePage";


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

                <Route path={"/"}>
                    <HomePage/>
                </Route>

            </Switch>
        </Router>

    );
}

export default App;

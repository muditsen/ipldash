import React from 'react'
import {Link} from "react-router-dom";

interface MatchDetailCardProps {
    matchData: MatchData
    teamName: string
}

interface MatchData {
    team1: string,
    team2: string,
    city: string,
    date: string,
    matchWinner: string,
    resultMargin: string
    resultBy: string
    venue: string
}


export const MatchDetailCard = (props: MatchDetailCardProps) => {

    let vsTeam = props.teamName === props.matchData.team1 ? props.matchData.team2 : props.matchData.team1

    return <div className="MatchDetailCard">
        <h3>Latest Match</h3>

        <h2>Vs: <Link to={"/teams/"+vsTeam}>{vsTeam}</Link></h2>
        <h3>On: {props.matchData.date}</h3>
        <h4>Happened at: {props.matchData.venue} {props.matchData.city}</h4>
        <p>{props.matchData.matchWinner} won by {props.matchData.resultMargin} {props.matchData.resultBy}.
        </p>


    </div>
}

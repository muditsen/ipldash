import React from 'react'
import {Link} from "react-router-dom";
import "./matchDetailCard.scss"

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
    playerOfMatch: string
    umpire1: string,
    umpire2: string
}


export const MatchDetailCard = (props: MatchDetailCardProps) => {

    let isWinner = props.teamName === props.matchData.matchWinner

    let vsTeam = props.teamName === props.matchData.team1 ? props.matchData.team2 : props.matchData.team1

    return <div className={isWinner ? "MatchDetailCard won-style" : "MatchDetailCard lost-style"}>
        <div>
            <h3 className={"latest-match"}>Latest Match</h3>
            <span className={"vs"}>Vs: </span> <h2><Link to={"/team/" + vsTeam}>{vsTeam}</Link></h2>
            <span>On: </span><h2 className={"match-date"}>{props.matchData.date}</h2>
            <span>Happened at: </span><h3 className={"match-venue"}>{props.matchData.venue} {props.matchData.city}</h3>
            <span>{isWinner ? "won" : "lost"} by: </span><h3
            className={"match-result"}>{props.matchData.resultMargin} {props.matchData.resultBy}.
        </h3></div>
        <div className={"innings"}>
            <p className={"p-innings"}>First Innings:</p>
            <h3 className={"h1-innings"}>{props.matchData.team1}</h3>
            <p className={"p-innings"}>Second Innings:</p>
            <h3 className={"h1-innings"}>{props.matchData.team2}</h3>
            <p className={"p-innings"}>Man of the Match:</p>
            <h3 className={"h1-innings"}>{props.matchData.playerOfMatch}</h3>
            <p className={"p-innings"}>Umpires:</p>
            <h3 className={"h1-innings"}>{props.matchData.umpire1} <br/> <span
                id={"spn-and"}>and</span> {props.matchData.umpire2}</h3>

        </div>

    </div>
}

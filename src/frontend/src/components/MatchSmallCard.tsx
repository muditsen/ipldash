import React from 'react'
import {Link} from "react-router-dom";

import './matchSmallCard.scss'

interface MatchSmallCardProps {
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

export const MatchSmallCard = (props: MatchSmallCardProps) => {

    let vsTeam = props.teamName === props.matchData.team1 ? props.matchData.team2 : props.matchData.team1

    let isWinner = props.teamName === props.matchData.matchWinner

    return <div className={isWinner ? "MatchSmallCard won-style" : "MatchSmallCard lost-style"}>
        {<p><b>Vs: <Link to={"/teams/"+vsTeam}>{vsTeam}</Link></b></p>}
        <p>{props.matchData.matchWinner} won by {props.matchData.resultMargin} {props.matchData.resultBy}.
        </p>
    </div>
}

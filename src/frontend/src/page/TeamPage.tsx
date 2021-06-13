import React, {useEffect, useRef, useState} from 'react'
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";
import './teamPage.scss'
import {useParams} from "react-router-dom";
import {PieChart} from 'react-minimal-pie-chart';

interface TeamPageProps {

}

interface Params {
    teamName: string
}

export const TeamPage = (props: TeamPageProps) => {

    const [loading, setLoading] = useState(true)

    const params = useParams() as Params

    const responseRef = useRef<null | any>()

    useEffect(() => {

        setLoading(true)

        fetch("/team/" + params?.teamName ?? "").then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res)
            responseRef.current = res
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }, [params?.teamName])

    const matchesView = () => {
        const arr: any[] = []
        if (responseRef.current) {
            for (let i = 1; i < responseRef.current.matches.length; i++) {
                arr.push(<MatchSmallCard matchData={responseRef.current.matches[i]} teamName={params.teamName}
                                         key={i + ""}/>)
            }
        }
        return arr
    }
    if (!responseRef.current || !responseRef.current.teamName) {
        return <div>Error Bro!! Please Enter Correct Team Name</div>
    }

    const data = [
        {title: 'Wins', value: responseRef.current.totalWins, color: '#38ada9'},
        {title: 'Losses', value: responseRef.current.totalMatches - responseRef.current.totalWins, color: '#e55039'}
    ]

    return <div className="TeamPage">
        <div className={"team-name"}>
            <h1 className={"team-name-h1"}>{loading ? "Loading..." : (responseRef.current.teamName || "")}</h1>
        </div>
        <div className={"wins-loss"}>
            <p style={{
                textAlign: "center",
                fontWeight:500,
            }}>Wins/Losses</p>
            <PieChart data={data} className={"pie-chart"}/>
        </div>
        <div className={"detail-card"}>
            <MatchDetailCard matchData={responseRef.current.matches[0]} teamName={params.teamName}/>
        </div>
        <div className={"old-matches"}><h3> Old Matches</h3></div>
        {matchesView()}
        <div className={"div-next"}>
            More Matches &gt;
        </div>
    </div>
}

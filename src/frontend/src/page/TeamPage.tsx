import React, {useEffect, useRef, useState} from 'react'
import {MatchDetailCard} from "../components/MatchDetailCard";
import {MatchSmallCard} from "../components/MatchSmallCard";

import {useParams} from "react-router-dom";

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
    }, [params])

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

    return <div className="App">
        <h1>{loading ? "Loading..." : (responseRef.current.teamName || "")}</h1>

        <MatchDetailCard matchData={responseRef.current.matches[0]} teamName={params.teamName}/>
        <p className={"oldMatches"}> Old Matches</p>
        {matchesView()}
    </div>
}

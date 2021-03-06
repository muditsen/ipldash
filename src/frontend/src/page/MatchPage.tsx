import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {ApiState} from "../common-types/types";
import {MatchDetailCard} from "../components/MatchDetailCard";

import './matchPage.scss'
import {YearSelector} from "../components/YearSelector";

interface MatchPageProps {

}

interface Params {
    teamName?: string
    year?: number
}

export const MatchPage = (props: MatchPageProps) => {

    const [apiState, setApiState] = useState<ApiState>({
        loading: true,

    })

    const params = useParams() as Params

    useEffect(() => {

        setApiState({loading: true})

        fetch("/team/" + (params?.teamName ?? "") + "/matches?year=" + params.year).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res)
            setApiState({loading: false, response: res})
        }).catch((err) => {
            setApiState({loading: false, error: err})
        })
    }, [params])

    const matchesView = () => {
        const arr: any[] = []
        if (apiState.response) {
            for (let i = 1; i < apiState.response.data.length; i++) {
                arr.push(<div className={"space"}/>)
                arr.push(<MatchDetailCard matchData={apiState.response.data[i]} teamName={params.teamName ?? ""}
                                          key={i + ""}/>)
            }
        }
        return arr
    }

    if (apiState.loading) {
        return (<div className="MatchPage">
            <h1>Loading...</h1>
        </div>)
    } else if (apiState.response) {

        return (<div className="MatchPage">
            <div className={"year-selector"}>
                <YearSelector teamName={params.teamName} paramYear={params.year}/>
            </div>
            <div>
                <h1>{params.teamName} Matches of year {params.year}</h1>
                {matchesView()}
            </div>
        </div>)
    } else {
        return (<div className="MatchPage">
            <h1>Match Page</h1>
            <pre>{JSON.stringify(apiState.error)}</pre>
        </div>)
    }


}

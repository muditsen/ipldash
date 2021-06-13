import React from "react";
import {Link} from "react-router-dom";

import './yearSelector.scss'

interface YearSelectorProps {
    teamName?: string,
    paramYear?: number
}

export const YearSelector = (props: YearSelectorProps) => {

    let years = []
    let startYear: number = parseInt(process.env.REACT_APP_DATA_START_YEAR ?? "0")
    let endYear: number = parseInt(process.env.REACT_APP_DATA_END_YEAR ?? "0")


    //console.log(startYear, endYear, process.env.REACT_APP_DATA_START_YEAR, process.env.REACT_APP_DATA_END_YEAR)
    for (let i: number = endYear; i >= (startYear); i--) {
        if (parseInt(props.paramYear + "") === i) {
            years.push(<li className={"year-name selected"} key={i}>
                <Link to={"/team/" + props.teamName + "/matches/" + i}>{i}</Link>
            </li>)
        } else {
            years.push(<li className={"year-name"} key={i}>
                <Link to={"/team/" + props.teamName + "/matches/" + i}>{i}</Link>
            </li>)
        }

    }

    return <div className={"year-container"}>
        <h3>Select Year</h3>
        <ul>
            {years}
        </ul>
    </div>


}

import React from 'react'
import "./teamComponent.scss"
import {Link} from "react-router-dom";

interface TeamComponentProps {
    info: TeamInfo
}

interface TeamInfo {
    id: number
    teamName: string,
    totalMatches: number,
    totalWins: number
}

export const TeamComponent = (props: TeamComponentProps) => {
    return <div className={"team-component"}>
        <Link to={"/team/" + props.info.teamName}>
            <img src={"./img/team-logo/" + props.info.id + ".png"} style={{
                height: "120px"
            }}/>
            <p>{props.info.teamName}</p></Link>
    </div>
}
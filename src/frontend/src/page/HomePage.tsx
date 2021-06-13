import React, {useEffect, useState} from 'react'
import {ApiState} from "../common-types/types";
import './homePage.scss'
import {TeamComponent} from "../components/TeamComponent";
import {Footer} from "../components/Footer";


interface HomePageProps {

}

export const HomePage = (props: HomePageProps) => {

    const [apiState, setApiState] = useState<ApiState>({
        loading: true,
    })

    useEffect(() => {

        setApiState({loading: true})

        fetch("/teams/").then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res)
            setApiState({loading: false, response: res})
        }).catch((err) => {
            setApiState({loading: false, error: err})
        })
    }, [])

    const teamsView = () => {
        const arr: any[] = []
        if (apiState.response) {
            for (let i = 0; i < apiState.response.data.length; i++) {
                arr.push(<TeamComponent key={i + ""} info={apiState.response.data[i]}/>)
            }
        }
        return arr
    }

    if (apiState.loading) {
        return (<div className="HomePage">
            <h1>IPL DashBoard</h1>
            <h2>Loading...</h2>
        </div>)
    } else if (apiState.response) {
        return (<div className="HomePage">
            <div style={{
                flexDirection: "row",
                display: "flex",
            }}>
                <img src={process.env.PUBLIC_URL + '/ipl-logo.png'} alt="logo" style={{
                    height: "7.2rem",
                    marginBottom: "10px"
                }}/>
                <h1 className={"appName"} style={{
                    fontSize: "70px",
                    marginTop: "50px",
                    marginLeft: "8px",
                    color: "#ffffff",
                    fontWeight: 600,
                }}> DashBoard <span className={"byMudit"}>By Mudit</span></h1>

            </div>
            <p style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                fontSize: "14px",
                color: "white",
            }}>The Indian Premier League (IPL) is a professional Twenty20 cricket league, contested by eight teams based
                out of eight different Indian cities. The league was founded by the Board of Control for Cricket in
                India (BCCI) in 2007. It is usually held between March and May of every year and has an exclusive window
                in the ICC Future Tours Programme.</p>
            <div className={"team-grid"}>
                {teamsView()}
            </div>

            <Footer/>


        </div>)
    } else {
        return (<div className="HomePage">
            <h1>IPL DashBoard</h1>
            <pre>{JSON.stringify(apiState.error)}</pre>
        </div>)
    }
}




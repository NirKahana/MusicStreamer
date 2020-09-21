import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useParams, Link, useLocation } from "react-router-dom"; 


function SongsList( { }) {

    const {id} = useParams()
    const { pathname } = useLocation();
    const location = useLocation();
    const qParams = queryString.parse(location.search);
    const qParamArray = Object.entries(qParams);
    const qParamKey = qParamArray[0][0]
    const qParamValue = qParamArray[0][1]


    const [songsData, setSongsData] = useState([])
    const [target, setTarget] = useState({})
    
    useEffect( () => {
        ( async () => {
            const SongsArray = (await axios.get(`http://localhost:3001/${qParamKey}s/${qParamValue}/songs`)).data ////////// 
            setSongsData(SongsArray)
            const targetData = (await axios.get(`http://localhost:3001/${qParamKey}s/${qParamValue}`)).data ////////// 
            setTarget(targetData)
        })()
    }
    ,[pathname])

    let headline = <div>More from <Link to={`/${qParamKey}/${qParamValue}`} className="link">{target.name}</Link>:</div>

    return (
        <>
            <div className={"song_page_class"}>
                <div className="list_container">
                    <div className="list_title">{headline}</div>
                    <ul>
                    {songsData.map((song, index) =>
                            <Link to={`/song/${song.id}?${qParamKey}=${target.id}`} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                                <li style={id === song.id.toString() ? {backgroundColor: 'rgb(22,22,22)'} : {}}><div>{song.title}</div><div>{song.length.slice(3,8)}</div></li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}




export default SongsList;
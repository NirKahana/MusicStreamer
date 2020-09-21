import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 


function SongsList( { dataList, arrivedFromData, qParamKey, qParamValue, specialClass}) {

    const {id} = useParams()
    const { pathname } = useLocation();


    const [songsData, setSongsData] = useState([])
    const [target, setTarget] = useState(false)
    
    useEffect( () => {
        ( async () => {
            const SongsArray = (await axios.get(`http://localhost:3001/${qParamKey}s/${qParamValue}/songs`)).data ////////// 
            setSongsData(SongsArray)
            const targetData = (await axios.get(`http://localhost:3001/${qParamKey}s/${qParamValue}`)).data ////////// 
            setTarget(targetData)
        })()
    }
    ,[pathname])

    let headline = `More from ${target.name}:`;

    return (
        <>
            <div className={specialClass ? "song_page_class" : "artist_details"}>
                <div className="list_container">
                    <div className="list_title"><div>{headline}</div></div>
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
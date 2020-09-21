import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 


function SongsList( { dataList, arrivedFromData, song_title, qParamKey, qParamValue, specialClass}) {

    let headline = `More from ${arrivedFromData.name}:`;

    const {id} = useParams()
    console.log(id);
    
    useEffect( () => {
        (async () => {
            
        })()
    }
    ,[])
    return (
        <>
            <div className={specialClass ? "song_page_class" : "artist_details"}>
                <div className="list_container">
                    <div className="list_title"><div>{headline}</div></div>
                    <ul>
                    {dataList.map((song, index) =>
                            <Link to={`/song/${song.id}?${qParamKey}=${arrivedFromData.id}`} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                                <li style={id == song.id ? {backgroundColor: 'rgb(22,22,22)'} : {}}><div>{song.title}</div><div>{song.length.slice(3,8)}</div></li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}




export default SongsList;
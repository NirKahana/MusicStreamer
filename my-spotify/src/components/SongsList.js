import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 


function SongsList( { dataList, arrivedFromData, song_title, qParamKey, specialClass}) {

    

    let headline = `More from ${arrivedFromData.name}:`;
    
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
                    {dataList.filter((song) => song.title !== song_title).map((song, index) =>
                            <Link to={`/song/${song.id}?${qParamKey}=${arrivedFromData.id}`} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                                <li><div>{song.title}</div><div>{song.length.slice(3,8)}</div></li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}




export default SongsList;
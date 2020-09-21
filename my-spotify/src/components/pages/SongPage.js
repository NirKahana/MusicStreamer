import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 
import SongsList from '../SongsList'

function SongPage( ) {


    const {id} = useParams();
    
    const location = useLocation();
    const { pathname } = useLocation();
    const qParams = queryString.parse(location.search);
    const qParamArray = Object.entries(qParams);
    const qParamKey = qParamArray[0][0]
    const qParamValue = qParamArray[0][1]

        
    const [song, setSong] = useState({})

    useEffect( () => {
        (async () => {
            const songData= (await axios.get(`http://localhost:3001/songs/${id}`)).data //////////////////
            setSong(songData)
            window.scrollTo(0, 0); 
 
        })()
    }
    ,[pathname])

    const myFunc = () => {
        if (song) {
            console.log("hi");
        }
    //    window.
    }    
    return (
        <>
            <div className={"content"}>
                    <h1 className={"song_page_title"}>
                        {song.title}
                    </h1>   
                <div className="song_page_container">

                        <iframe src={song.youtube_link ? song.youtube_link.replace("watch?v=", "embed/") : ""}
                                allowtransparency="true" 
                                className="youtube_player"
                                onEnded={myFunc()}
                        >

                        </iframe>

                        <SongsList 
                            specialClass={true}
                            song_title={song.title}
                            qParamKey={qParamKey}
                            qParamValue={qParamValue}
                        />

                </div>
            </div>
        </>
    )
}
export default SongPage;
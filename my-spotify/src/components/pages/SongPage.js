import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 
import SongsList from '../SongsList'

function SongPage( ) {

    const {id} = useParams();
    const { pathname } = useLocation();

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
            console.log("hi");
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

                        <SongsList/>

                </div>
            </div>
        </>
    )
}
export default SongPage;
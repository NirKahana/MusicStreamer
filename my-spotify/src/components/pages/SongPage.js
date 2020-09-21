import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 
import SongsList from '../SongsList'
import YouTube from 'react-youtube';

function SongPage( ) {

    const {id} = useParams();
    const { pathname } = useLocation();

    const [song, setSong] = useState({})
    const [booleanSwitch, setBooleanSwitch] = useState(false)
    
    useEffect( () => {
        (async () => {
            const songData= (await axios.get(`/songs/${id}`)).data //////////////////
            setSong(songData)
            window.scrollTo(0, 0); 
 
        })()
    }
    ,[pathname])

    const myFunc = () => { 
        // !booleanSwitch && setBooleanSwitch(true) 
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
                                onLoad={myFunc}
                                className="youtube_player"
                        >
                        </iframe>
                                

                        <SongsList
                            booleanSwitch={booleanSwitch}
                        />

                </div>
            </div>
        </>
    )
}
export default SongPage;
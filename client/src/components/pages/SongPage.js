import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 
import SongsList from '../lists/SongsList'
import YouTube from 'react-youtube';


function SongPage( ) {

    const {id} = useParams();
    const { pathname } = useLocation();

    const [song, setSong] = useState({});
    const [songHasEnded, setSongHasEnded] = useState(false)

    useEffect(() => {
        (async () => {
            const songData= (await axios.get(`/songs/${id}`)).data //////////////////
            setSong(songData)
            window.scrollTo(0, 0); 
            onStart()
        })()
    }
    ,[pathname])

    useEffect(() => {
        (async () => {
            const songData= (await axios.get(`/songs/${id}`)).data //////////////////
            setSong(songData)
            window.scrollTo(0, 0); 
            onStart()
        })()
    }
    ,[])

    const sendQuery = async () => {
        const currentPlayCount = await axios.get(`/interactions/${id}`);
        if (currentPlayCount.data === 0) {
            await axios({
                method: 'post',
                url: `/interactions/${id}`,
                data: {
                  "play_count": 1
                }
              });
        } else {
            await axios.put(`/interactions/${id}`, {play_count: currentPlayCount.data[0].play_count+1 })
        }        
    }
    const onEnd = () => { 
        !songHasEnded && setSongHasEnded(true)
    }
    const onStart = () => { 
        sendQuery()
    }
    let videoId = song.youtube_link ? song.youtube_link.replace("https://www.youtube.com/watch?v=", "") : ""
    
    return (
        <>
            <div className={"content"}>
                    <h1 className={"song_page_title"}>
                        {song.title}
                    </h1>    

                <div className="song_page_container">
                    <div className="youtube_player">
                        <YouTube
                                videoId={videoId}
                                allowtransparency="true" 
                                onEnd={onEnd}
                                // onPlay={onStart}
                                className="youtube_iframe"
                                width="100%"
                                height="100%"
                                opts={{playerVars: {autoplay: 1}}}
                        >
                        </YouTube>
                    </div>
                                

                        <SongsList
                            songHasEnded={songHasEnded}
                            lyrics={song.lyrics}
                        />

                </div>
            </div>
        </>
    )
}
export default SongPage;
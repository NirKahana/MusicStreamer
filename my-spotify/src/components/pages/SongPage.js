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
    const [songsData, setSongsData] = useState([])
    const [target, setTarget] = useState([])

    useEffect( () => {
        (async () => {
            const songData= (await axios.get(`http://localhost:3001/songs/${id}`)).data //////////////////
            setSong(songData)
            const SongsArray = (await axios.get(`http://localhost:3001/${qParamKey}s/${qParamValue}/songs`)).data ////////// 
            setSongsData(SongsArray)
            const targetData = (await axios.get(`http://localhost:3001/${qParamKey}s/${qParamValue}`)).data ////////// 
            setTarget(targetData)
            window.scrollTo(0, 0); 
 
        })()
    }
    ,[pathname])

    
    return (
        <>

            <div className={"content"}>

                    <h1 className={"song_page_title"}>
                        {song.title}
                    </h1>   
                <div className="song_page_container">

                        <iframe src={"https://www.youtube.com/embed/sdhep5OaAC0"} allowtransparency="true" className="youtube_player">

                        </iframe>

                        <SongsList 
                            specialClass={true}
                            song_title={song.title}
                            dataList={songsData} 
                            artist_name={song.artist_name}
                            arrivedFromData={target}
                            qParamKey={qParamKey}
                        />

                </div>
            </div>




        </>
    )
}
export default SongPage;
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 
import SongsList from '../SongsList'

function SongPage( ) {


    const {id} = useParams();
    
    const location = useLocation();
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
        })()
    }
    ,[])

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
      let x = `${pathname}${location.search}`;
    //   console.log(x);
    //   window.location.assign(x)   

    }, [pathname]); 

    
    return (
        <>
            <div className={"content"}>
                <div className="container">

                    <div className="artist_details left_artist_details">
                        <div className="artist_details_row"><h1 className="inner-row">{song.title}</h1></div>
                        <div className="artist_details_row"><h3 className="inner-row">Song by {song.artist_name}</h3></div>
                    </div>

                    <div className="central_flex_item">
                        <div className="artist_header">
                            <div className="gradient">

                            </div>
                        </div>                        
                    </div>
                    
                    <SongsList 
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
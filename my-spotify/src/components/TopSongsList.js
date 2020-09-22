import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useParams, Link, useLocation } from "react-router-dom"; 


function TopSongsList( { booleanSwitch }) {

    const {id} = useParams()
    const { pathname } = useLocation();
    const location = useLocation();



    let noSearchParams = (location.search === "");

    
    const [topSongsData, setTopSongsData] = useState([])
    
    useEffect( () => {
        ( async () => {
            let topSongsArray = (await axios.get("/top_songs")).data;
            console.log(topSongsArray);
            setTopSongsData(topSongsArray)
        })()
    }
    ,[pathname])

    if(booleanSwitch) {
        for (let i = 0; i < topSongsData.length-1; i++) {
            if (topSongsData[i].id.toString() === id) {
                window.location.assign(`/song/${topSongsData[i+1].id}`)
            }
        }
    }

    let headline = <div>More from top songs:</div>
    
    return (
        <>
            <div className={"song_page_class"}>
                <div className="list_container">
                    <div className="list_title">{headline}</div>
                    <ul>
                    {topSongsData.map((song, index) =>
                            <Link to={`/song/${song.id}`} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                                <li style={id === song.id.toString() ? {backgroundColor: 'rgb(22,22,22)'} : {}}><div>{song.song_title}</div><div>{song.length.slice(3,8)}</div></li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}




export default TopSongsList;
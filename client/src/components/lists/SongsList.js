import React from 'react';
import RegularSongsList from './RegularSongsList'
import TopSongsList from './TopSongsList'
import { useLocation } from "react-router-dom"; 


function SongsList( { songHasEnded, lyrics }) {


    if (useLocation().search === "") {
        return(
            <TopSongsList songHasEnded={songHasEnded} lyrics={lyrics}/>
        )
    } else {
        return (
            <RegularSongsList songHasEnded={songHasEnded} lyrics={lyrics}/>
        )
    }
}
export default SongsList;
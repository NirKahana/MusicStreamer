import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import SongCard from '../cards/SongCard';

function SongsCarousel( ) {

    
    const breakPointsForCards = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1},
        { width: 450, itemsToShow: 2, itemsToScroll: 2},
        { width: 700, itemsToShow: 3, itemsToScroll: 3},
        { width: 900, itemsToShow: 4, itemsToScroll: 4},
        { width: 1000, itemsToShow: 5, itemsToScroll: 5},
    ]

    const [songs, setSongs] = useState([]);

      useEffect(() => {
          (async () => {
          try{
        let songsArray = await axios.get("http://localhost:3001/top_songs");
        setSongs(songsArray.data);
          } catch(err) {console.error(err)};
        })() 
    } ,[])

    return (
        <>
            <div className={"carousel"}>
            <h2 className={"carousel_title"}>Your Top 20 Songs</h2> {/* SONGS */}
            <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                {songs.map((value, index) => 
                    <SongCard key={index} id={value.id} title={value.song_title} artist={value.artist_name}/>
                )}
            </Carousel>
            </div>
        </>
    )
}

export default SongsCarousel;



import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import SongCard from '../cards/SongCard';
import { useAuth } from "../../contexts/AuthContext";

function RecentlyPlayed( ) {
    const { currentUser } = useAuth();
    
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
        const songsArray = (await axios.get(`/recently_played/${currentUser.email}`)).data;
        setSongs(songsArray);
          } catch(err) {console.error(err)};
        })() 
    } ,[]);
    if(songs[0] === undefined) return null
    return (
        <>
            <div className={"carousel"}>
            {songs[0] && <h2 className={"carousel_title"}>Recently Played</h2>}
            <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                {songs.map((value, index) => 
                    <SongCard key={index} id={value.id} cover_img={value.cover_img} title={value.title} artist={value.name}/>
                )}
            </Carousel>
            </div>
        </>
    )
}

export default RecentlyPlayed;
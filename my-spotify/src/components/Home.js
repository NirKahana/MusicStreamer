import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import Song from './Song';

function Home() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 450, itemsToShow: 2 },
        { width: 700, itemsToShow: 4 },
        { width: 1000, itemsToShow: 5 },
        { width: 1200, itemsToShow: 5 },
    ]
    const [songs, setSongs] = useState([])
      const fetchData = async () => {
        const { data } = await axios.get("http://localhost:3001/top_songs");
        setSongs(data);
      } 
      useEffect(fetchData,[])
    return (
        <>
            <div style={{width:"95%", margin:"auto"}}>
            <h2 className={"carousel_title"}>Your Top 20 Songs</h2>

            <Carousel breakPoints={breakPoints}>
                {songs.map((song, index) => 
                    <Song key={index} title={song.song_title} artist={song.artist_name}/>
                )}
            </Carousel>
            </div>
            <div style={{width:"95%", margin:"auto"}}>
            <h2 className={"carousel_title"}>Your Top 20 Artists</h2>
            <Carousel breakPoints={breakPoints}>
                {songs.map((song, index) => 
                    <Song key={index} title={song.song_title} artist={song.artist_name}/>
                )}
            </Carousel>
            </div>
        </>
    )
}
export default Home;
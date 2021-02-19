import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import PlaylistCard from '../cards/PlaylistCard';

function PlaylistsCarousel( ) {
  
    const breakPointsForCards = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1},
        { width: 450, itemsToShow: 2, itemsToScroll: 2},
        { width: 700, itemsToShow: 3, itemsToScroll: 3},
        { width: 900, itemsToShow: 4, itemsToScroll: 4},
        { width: 1000, itemsToShow: 5, itemsToScroll: 5},
    ]

    const [playlists, setPlaylists] = useState([]);

      useEffect(() => {
          (async () => {
          try{
            let playlistsArray = await axios.get("/top_playlists");
            setPlaylists(playlistsArray.data)
          } catch(err) {console.error(err)};
        })() 
    } ,[])

    return (
        <>
            <div className={"carousel"}>
            {playlists[0] && <h2 className={"carousel_title"}>Your Top 20 Playlists</h2>}
            <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                {playlists.map((playlist, index) => 
                    <PlaylistCard key={index} id={playlist.id} playlist_name={playlist.name} num_of_songs={playlist.num_of_songs}/>
                )}
            </Carousel>
            </div>
        </>
    )
}

export default PlaylistsCarousel;
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import ArtistCard from '../cards/ArtistCard';

function ArtistsCarousel( ) {
  
    const breakPointsForArtists = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1},
        { width: 450, itemsToShow: 2, itemsToScroll: 2},
        { width: 700, itemsToShow: 3, itemsToScroll: 3},
        { width: 1000, itemsToShow: 4, itemsToScroll: 4},
        { width: 1200, itemsToShow: 5, itemsToScroll: 5},
    ]

    const [artists, setArtists] = useState([]);

      useEffect(() => {
          (async () => {
          try{
            let artistsArray = await axios.get("/top_artists");
            setArtists(artistsArray.data);
          } catch(err) {console.error(err)};
        })() 
    } ,[])

    return (
        <>
            <div className={"carousel"}>
            {artists[0] && <h2 className={"carousel_title"}>Your Top 20 Artists</h2>}
            <Carousel breakPoints={breakPointsForArtists} transitionMs={1200} easing={"ease"}>
                {artists.map((artist, index) => 
                    <ArtistCard key={index} cover_img={artist.cover_img} id={artist.artist_id} name={artist.artist_name} plays={artist.total_plays}/>
                )}
            </Carousel>
            </div>
        </>
    )
}

export default ArtistsCarousel;
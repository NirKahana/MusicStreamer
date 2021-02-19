import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useParams } from "react-router-dom";
import ArtistAlbumCard from '../cards/ArtistAlbumCard'; 

function AlbumsCarousel({  }) {

    const {id} = useParams();
  
    const breakPointsForCards = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1},
        { width: 450, itemsToShow: 2, itemsToScroll: 1},
        { width: 700, itemsToShow: 3, itemsToScroll: 1},
        { width: 900, itemsToShow: 4, itemsToScroll: 1},
        { width: 1000, itemsToShow: 5, itemsToScroll: 1},
    ]

    const [artistAlbums, setArtistAlbums] = useState([]);

      useEffect(() => {
          (async () => {
          try{
            let artistAlbumsArray = await axios.get(`/artists/${id}/albums`);
            setArtistAlbums(artistAlbumsArray.data);
          } catch(err) {console.error(err)};
        })() 
    } ,[id])

    return (
        <>
        <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"} className="artist_albums_carousel">
                    {artistAlbums.map((album, index) =>     
                        <ArtistAlbumCard key={index} name={album.name} id={album.id} created_at={album.created_at} cover_img={album.cover_img} num_of_songs= {album.num_of_songs}/>
                    )}
        </Carousel>

        </>
    )
}

export default AlbumsCarousel;


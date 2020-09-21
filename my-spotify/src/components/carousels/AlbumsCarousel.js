import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import AlbumCard from '../cards/AlbumCard';

function AlbumsCarousel( ) {
  
    const breakPointsForCards = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1},
        { width: 450, itemsToShow: 2, itemsToScroll: 2},
        { width: 700, itemsToShow: 3, itemsToScroll: 3},
        { width: 900, itemsToShow: 4, itemsToScroll: 4},
        { width: 1000, itemsToShow: 5, itemsToScroll: 5},
    ]

    const [albums, setAlbums] = useState([]);

      useEffect(() => {
          (async () => {
          try{
            let albumsArray = await axios.get("/top_albums");
            setAlbums(albumsArray.data);
          } catch(err) {console.error(err)};
        })() 
    } ,[])

    return (
        <>
                <div className={"carousel"}>
                <h2 className={"carousel_title"}>Your Top 20 Albums</h2> {/* ALBUMS */}
                <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                    {albums.map((album, index) => 
                        <AlbumCard key={index} name={album.album_name} id={album.id} cover_img={album.cover_img} artist_name={album.artist_name}/>
                    )}
                </Carousel>
                </div>
        </>
    )
}

export default AlbumsCarousel;
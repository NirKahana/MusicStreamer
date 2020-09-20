import React, { useState, useEffect} from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import SongsCarousel from './carousels/SongsCarousel';
import AlbumsCarousel from './carousels/AlbumsCarousel';
import ArtistsCarousel from './carousels/ArtistsCarousel';
import PlaylistsCarousel from './carousels/PlaylistsCarousel';

function Home( ) {
  

    return (
        <>
        <div className={"content"}>
            <SongsCarousel />

            <ArtistsCarousel />
            
            <AlbumsCarousel />

            <PlaylistsCarousel />
        </div>

        </>
    )
}

export default Home;

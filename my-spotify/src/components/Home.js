import React, { useState, useEffect, Component} from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import SongsCarousel from './carousels/SongsCarousel';
import AlbumsCarousel from './carousels/AlbumsCarousel';
import ArtistsCarousel from './carousels/ArtistsCarousel';
import PlaylistsCarousel from './carousels/PlaylistsCarousel';

function Home( ) {
    //.replace("watch?v=", "embed/")

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

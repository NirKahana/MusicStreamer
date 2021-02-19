import React from 'react';
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

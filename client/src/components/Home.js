import React from 'react';
import ArtistsCarousel from './carousels/ArtistsCarousel';
import SongsCarousel from './carousels/SongsCarousel';
import { useAuth } from "../contexts/AuthContext";


function Home( ) {
    const { currentUser } = useAuth();
    return (
        <>
            <div className={"content"}>
                <SongsCarousel title={'Recently Played'} requestURl={`/recently_played/${currentUser.email}`}/>

                <ArtistsCarousel />

                <SongsCarousel title={'Most Popular'} requestURl={'/most_popular'}/>
            </div>
        </>
    )
}

export default Home;

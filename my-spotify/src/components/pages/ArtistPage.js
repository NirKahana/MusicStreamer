import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import AlbumCard from "../cards/AlbumCard"
import { useParams, useHistory, useLocation, NavLink, Link } from "react-router-dom";

function AritstPage( { breakPointsForCards }) {

    const [albums, setAlbums] = useState([])
      useEffect( () => 
            (async () => {
            const albumsArray = (await axios.get("http://localhost:3001/top_albums")).data;
            setAlbums(albumsArray);
            })() 
        ,[])

    const params = useParams();
    return (
        <>
        <div className={"main_page_img"}>
        <div><h2>Artist Name {params.id}</h2>
        Text
        </div>

        </div>

        <h3>Songs</h3>
        <ul>
            <li>
                Song #1
            </li>
            <li>
                Song #2
            </li>
        </ul>

        <div className={"carousel"}>
            <h2 className={"carousel_title"}>Albums</h2>
            <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                {albums.map((album, index) => 
                    <AlbumCard fromArtistPage={true }key={index} name={album.album_name} artist_name={album.artist_name}/>
                )}
            </Carousel>
        </div>


        </>
    )
}
export default AritstPage;
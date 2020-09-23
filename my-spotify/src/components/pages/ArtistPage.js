import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistAlbumsCarousel from '../carousels/ArtistAlbumsCarousel'
import { useParams, Link, useLocation } from "react-router-dom"; 

function AritstPage( ) {

    const [artist, setArtist] = useState({})
    const [artistSongs, setArtistSongs] = useState([])
    const {id} = useParams();


    useEffect( () => {
        (async () => {
            const { data } = await axios.get(`/artists/${id}`)
            setArtist(data)
            const artistSongsData = (await axios.get(`/artists/${id}/songs`)).data
            setArtistSongs(artistSongsData)
        })()
    }
    ,[])

    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    let leftHeadLine = (artist.name && artistSongs[0]) ? <h1 className="inner-row">{artist.name}</h1> : ""
    let rightHeadLine = (artist.name && artistSongs[0]) ? <div><span>Songs by </span><span>{artist.name}:</span></div> : ""
    let songsReleased = (artist.num_of_songs && artistSongs[0]) ? <div className="inner-row">Songs Released: {artist.num_of_songs}</div> : ""
    let centralDiv = (artist.cover_img && artistSongs[0]) ? <div className="artist_header" style={{backgroundImage: `url(${artist.cover_img})`}}><div className="gradient"></div></div> : ""
    let albumsCarousel = (artist.cover_img && artistSongs[0]) ? <div><ArtistAlbumsCarousel/></div> : ""
    return (
        <>
            <div className={"content"}>
                <div className="container">

                    <div className="artist_details">
                        <div className="artist_details_row">{leftHeadLine}</div> 
                        <div className="artist_details_row">{songsReleased}</div>
                    </div>

                    <div className="central_flex_item">
                        {centralDiv}                       
                    </div>

                    <div className="artist_details">
                        <div className="list_container">
                            <div className="list_title">{rightHeadLine}</div>
                            <ul>
                            {artistSongs.map((song, index) =>
                                    <Link to={`/song/${song.id}?artist=${artist.id}`} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                                        <li><div>{song.title}</div><div>{song.length.slice(3,8)}</div></li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {albumsCarousel}
        </>
    )
}
export default AritstPage;
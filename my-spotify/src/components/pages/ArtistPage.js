import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useParams, Link } from "react-router-dom"; 

function AritstPage( ) {

    const [artist, setArtist] = useState({})
    const [artistSongs, setArtistSongs] = useState([])
    const {id} = useParams();

    useEffect( () => {
        (async () => {
            const { data } = await axios.get(`http://localhost:3001/artists/${id}`)
            setArtist(data)
            const artistSongsData = (await axios.get(`http://localhost:3001/artists/${id}/songs`)).data
            setArtistSongs(artistSongsData)
        })()
    }
    ,[])

    
    return (
        <>
            <div className={"content"}>
                <div className="container">

                    <div class="artist_details">
                        <div className="artist_details_row"><h1 className="inner-row">{artist.name}</h1></div> 
                        <div className="artist_details_row"><div className="inner-row">Songs Released: {artist.num_of_songs}</div></div>
                    </div>

                    <div className="central_flex_item">
                        <div className="artist_header">
                            <div className="gradient">

                            </div>
                        </div>                        
                    </div>

                    <div className="artist_details">
                        <div className="list_container">
                            <div className="list_title"><div>{artist.name}'s Best:</div></div>
                            <ul>
                            {artistSongs.map((song) =>
                                    <Link style={{ textDecoration: 'none', color: "white"}}> 
                                    <li><div>{song.title}</div><div>{song.length.slice(3,8)}</div></li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            <div className="second_content">

            

            </div>
        </>
    )
}
export default AritstPage;
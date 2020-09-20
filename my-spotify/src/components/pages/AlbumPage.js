import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 

function AlbumPage( ) {

    const [album, setAlbum] = useState({})
    const [albumSongs, setAlbumSongs] = useState([])
    const {id} = useParams();

    useEffect( () => {
        (async () => {
            const albumData= (await axios.get(`http://localhost:3001/albums/${id}`)).data
            setAlbum(albumData)
            const albumSongsData = (await axios.get(`http://localhost:3001/albums/${id}/songs`)).data
            setAlbumSongs(albumSongsData)
        })()
    }
    ,[])

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    
    return (
        <>
            <div className={"content"}>
                <div className="container">

                    <div className="artist_details left_artist_details">
                        <div className="artist_details_row"><h1 className="inner-row">{album.name}</h1></div>
                        <div className="artist_details_row"><h3 className="inner-row">Album by {album.artist_name}</h3></div>
                        <div className="artist_details_row"><div className="inner-row">{album.num_of_songs} Songs</div></div>
                    </div>

                    <div className="central_flex_item">
                        <div className="artist_header">
                            <div className="gradient">

                            </div>
                        </div>                        
                    </div>

                    <div className="artist_details">
                        <div className="list_container">
                            <div className="list_title"><div>Songs:</div></div>
                            <ul>
                            {albumSongs.map((song, index) =>
                                    <Link to={`/song/${song.id}?album=${album.id}`} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                                    <li><div>{song.title}</div><div>{song.length.slice(3,8)}</div></li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}
export default AlbumPage;
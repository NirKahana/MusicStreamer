import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 

import SongLength from "../lists/SongLength";


const defaultBg = "https://www.freeiconspng.com/uploads/spotify-icon-2.png";

function AlbumPage( ) {

    const [album, setAlbum] = useState();
    const [albumSongs, setAlbumSongs] = useState();
    const {id} = useParams();

    useEffect( () => {
        (async () => {
            const albumData= (await axios.get(`/albums/${id}`)).data
            setAlbum(albumData)
            const albumSongsData = (await axios.get(`/albums/${id}/songs`)).data
            setAlbumSongs(albumSongsData)
        })()
    }
    ,[id])

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    
    return (album && albumSongs) ? (
        <>
            <div className={"content"}>
                <div className="container">

                    <div className="artist_details left_artist_details">
                        <div className="artist_details_row"><h1 className="inner-row">{album.name}</h1></div>
                        <div className="artist_details_row"><h3 className="inner-row">Album by <Link to={`/artist/${album.artist_id}`} className="link">{album.artist_name}</Link></h3></div>
                        <div className="artist_details_row"><div className="inner-row">{album.num_of_songs} Songs</div></div>
                    </div>

                    <div className="central_flex_item">
                        <div className="artist_header"  style={{'backgroundImage': `url(${album.cover_img || defaultBg})`}}>
                            <div className="gradient">

                            </div>
                        </div>                        
                    </div>

                    <div className="artist_details artist_list">
                        <div className="list_container">
                            <div className="list_title"><div>Songs:</div></div>
                            <ul>
                            {albumSongs.map((song, index) =>
                                    <Link to={`/song/${song.id}?album=${album.id}`} key={index} style={{ textDecoration: 'none', color: "white"}}> 
                                    <li><div>{song.title}</div><SongLength string={song.length} /></li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>




        </>
    ) : (
        <>
          <div className="vh100 flex_center ">
                <ReactLoading type={"spokes"} color={"grey"} height={67} width={75} />
          </div>
        </>
      );
}
export default AlbumPage;
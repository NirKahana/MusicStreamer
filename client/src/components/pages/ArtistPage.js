import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
import axios from 'axios';
import ArtistAlbumsCarousel from '../carousels/ArtistAlbumsCarousel'
import { useParams, Link, useLocation } from "react-router-dom"; 

const defaultBg = "https://www.freeiconspng.com/uploads/spotify-icon-2.png";

function AritstPage( ) {

    const [artist, setArtist] = useState()
    const [artistSongs, setArtistSongs] = useState()
    const {id} = useParams();


    useEffect( () => {
        (async () => {
            const { data } = await axios.get(`/artists/${id}`)
            setArtist(data)
            const artistSongsData = (await axios.get(`/artists/${id}/songs`)).data
            setArtistSongs(artistSongsData)
        })()
    }
    ,[id])

    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    return artist && artistSongs ? (
        <>
            <div className={"content"}>
                <div className="container">

                    <div className="artist_details">
                        <div className="artist_details_row"><h1 className="inner-row">{artist.name}</h1></div> 
                        <div className="artist_details_row">
                            <div className="inner-row">
                                Songs Released: {artist.num_of_songs}
                            </div>
                        </div>
                    </div>

                    <div className="central_flex_item">
                        <div className="artist_header" style={{backgroundImage: `url(${artist.cover_img || defaultBg})`}}>
                            <div className="gradient"></div>
                        </div>                     
                    </div>

                    <div className="artist_details artist_list">
                        <div className="list_container">
                            <div className="list_title">
                                <div>
                                    <span>Songs by </span> <span>{artist.name}:</span>
                                </div>
                            </div>
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
            <ArtistAlbumsCarousel/>
        </>
    ) : (
        <>
          <div className="vh100 flex_center ">
                <ReactLoading type={"spokes"} color={"grey"} height={67} width={75} />
          </div>
        </>
      );
}
export default AritstPage;
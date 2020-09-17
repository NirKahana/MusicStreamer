import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import SongCard from './cards/SongCard';
import ArtistCard from './cards/ArtistCard';
import AlbumCard from './cards/AlbumCard';

function Home() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 450, itemsToShow: 2 },
        { width: 700, itemsToShow: 4 },
        { width: 1000, itemsToShow: 5 },
        { width: 1200, itemsToShow: 5 },
    ]
    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])

      const fetchData = async () => {
        const songsArray = (await axios.get("http://localhost:3001/top_songs")).data;
        setSongs(songsArray);
        const artistsArray = (await axios.get("http://localhost:3001/top_artists")).data;
        setArtists(artistsArray);
        const albumsArray = (await axios.get("http://localhost:3001/top_albums")).data;
        setAlbums(albumsArray);
      } 
      useEffect(fetchData,[])
    return (
        <>

            <div style={{width:"95%", margin:"auto"}}>
            <h2 className={"carousel_title"}>Your Top 20 Songs</h2>
            <Carousel breakPoints={breakPoints}>
                {songs.map((song, index) => 
                    <SongCard key={index} title={song.song_title} artist={song.artist_name}/>
                )}
            </Carousel>
            </div>

            <div style={{width:"95%", margin:"auto"}}>
            <h2 className={"carousel_title"}>Your Top 20 Artists</h2>
            <Carousel breakPoints={breakPoints}>
                {artists.map((artist, index) => 
                    <ArtistCard key={index} name={artist.artist_name} plays={artist.total_plays}/>
                )}
            </Carousel>
            </div>

            <div style={{width:"95%", margin:"auto"}}>
            <h2 className={"carousel_title"}>Your Top 20 Albums</h2>
            <Carousel breakPoints={breakPoints}>
                {albums.map((album, index) => 
                    <AlbumCard key={index} name={album.album_name} artist_name={album.artist_name}/>
                )}
            </Carousel>
            </div>

        </>
    )
}
export default Home;
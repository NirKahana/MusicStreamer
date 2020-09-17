import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import SongCard from './cards/SongCard';
import ArtistCard from './cards/ArtistCard';
import AlbumCard from './cards/AlbumCard';
import PlaylistCard from './cards/PlaylistCard';

function Home( ) {
    debugger;
    const breakPointsForCards = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1},
        { width: 450, itemsToShow: 2, itemsToScroll: 2},
        { width: 700, itemsToShow: 3, itemsToScroll: 3},
        { width: 900, itemsToShow: 4, itemsToScroll: 4},
        { width: 1000, itemsToShow: 5, itemsToScroll: 5},
    ]
    const breakPointsForArtists = [
        { width: 1, itemsToShow: 1, itemsToScroll: 1},
        { width: 450, itemsToShow: 2, itemsToScroll: 2},
        { width: 700, itemsToShow: 3, itemsToScroll: 3},
        { width: 1000, itemsToShow: 4, itemsToScroll: 4},
        { width: 1200, itemsToShow: 5, itemsToScroll: 5},
    ]

    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])


      useEffect( () => (async () => {
          try{
        const songsArray = (await axios.get("http://localhost:3001/top_songs")).data;
        setSongs(songsArray);
        const artistsArray = (await axios.get("http://localhost:3001/top_artists")).data;
        setArtists(artistsArray);
        const albumsArray = (await axios.get("http://localhost:3001/top_albums")).data;
        setAlbums(albumsArray);
        const playlistsArray = (await axios.get("http://localhost:3001/top_playlists")).data;
        setPlaylists(playlistsArray)
          }
          catch(err) {console.error(err)};
        })() ,[])

  
    return (
        <>

            <div className={"carousel"}>
            <h2 className={"carousel_title"}>Your Top 20 Songs</h2> {/* SONGS */}
            <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                {songs.map((song, index) => 
                    <SongCard key={index} title={song.song_title} artist={song.artist_name}/>
                )}
            </Carousel>
            </div>

            <div className={"carousel"}>
            <h2 className={"carousel_title"}>Your Top 20 Artists</h2> {/* ARTISTS */}
            <Carousel breakPoints={breakPointsForArtists} transitionMs={1200} easing={"ease"}>
                {artists.map((artist, index) => 
                    <ArtistCard key={index} name={artist.artist_name} plays={artist.total_plays}/>
                )}
            </Carousel>
            </div>
            <div className={"carousel"}>
            <h2 className={"carousel_title"}>Your Top 20 Albums</h2> {/* ALBUMS */}
            <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                {albums.map((album, index) => 
                    <AlbumCard key={index} name={album.album_name} artist_name={album.artist_name}/>
                )}
            </Carousel>
            </div>

            <div className={"carousel"}>
            <h2 className={"carousel_title"}>Your Top 20 Playlists</h2> {/* PLAYLISTS */}
            <Carousel breakPoints={breakPointsForCards} transitionMs={1200} easing={"ease"}>
                {playlists.map((playlist, index) => 
                    <PlaylistCard key={index} playlist_name={playlist.name} num_of_songs={playlist.num_of_songs}/>
                )}
            </Carousel>
            </div>

        </>
    )
}
export default Home;
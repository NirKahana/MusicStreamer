import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@material-ui/core";
import ReactLoading from "react-loading";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

import {useAuth} from "../../contexts/AuthContext";
import ArtistAlbumsCarousel from "../carousels/ArtistAlbumsCarousel";
import SongItem from "../lists/SongItem";
import MobileSongItem from "../lists/MobileSongItem";

const defaultBg = "https://www.freeiconspng.com/uploads/spotify-icon-2.png";

function AritstPage() {

  const [artist, setArtist] = useState();
  const [artistSongs, setArtistSongs] = useState();
  const [tappedItemIndex, setTappedItemIndex] = useState(-1);
  const matches = useMediaQuery("(min-width:650px)");

  const { id } = useParams();
  const {currentUser} = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/artists/${id}`);
      setArtist(data);
      const artistSongsData = (await axios.get(`/artists/songs`, {
        params: {
          artistId: id,
          userEmail: currentUser.email
        }
      })).data;
      setArtistSongs(artistSongsData);
    })();
  }, [id]);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const refreshSongs = async () => {
    const artistSongsData = (await axios.get(`/artists/songs`, {
      params: {
        artistId: id,
        userEmail: currentUser.email
      }
    })).data;
    setArtistSongs(artistSongsData);
  };

  return artist && artistSongs ? (
    <>
      <div className={"content"}>
        <div className="container">
          <div className="artist_details">
            <div className="artist_details_row">
              <h1 className="inner-row">{artist.name}</h1>
            </div>
            <div className="artist_details_row">
              <div className="inner-row">
                Songs Released: {artist.num_of_songs}
              </div>
            </div>
          </div>

          <div className="central_flex_item">
            <div
              className="artist_header"
              style={{
                backgroundImage: `url(${artist.cover_img || defaultBg})`,
              }}
            >
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
                {artistSongs.map((song, index) => matches 
                ? <SongItem song={song} key={index} link={`/song/${song.id}?artist=${id}`} index={index} tappedItemIndex={tappedItemIndex} setTappedItemIndex={setTappedItemIndex} refreshSongs={refreshSongs}/>
                : <MobileSongItem song={song} index={index} link={`/song/${song.id}?artist=${id}`} tappedItemIndex={tappedItemIndex} setTappedItemIndex={setTappedItemIndex} refreshSongs={refreshSongs}/>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ArtistAlbumsCarousel />
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
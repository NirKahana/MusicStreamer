import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";

function PlaylistPage() {
  const [playlist, setPlaylist] = useState();
  const [playlistSongs, setPlaylistSongs] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const playlistData = (await axios.get(`/playlists/${id}`)).data;
      setPlaylist(playlistData);
      const playlistSongsData = (await axios.get(`/playlists/${id}/songs`))
        .data; //////////
      setPlaylistSongs(playlistSongsData);
    })();
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return playlist && playlistSongs ? (
    <>
      <div className={"content"}>
        <div className="container">
          <div className="artist_details left_artist_details">
            <div className="artist_details_row">
              <h1 className="inner-row">{playlist.name}</h1>
            </div>
            <div className="artist_details_row">
              <div className="inner-row">{playlist.num_of_songs} Songs</div>
            </div>
          </div>

          <div className="central_flex_item">
            <div
              className="artist_header"
              style={{
                "background-image": `url(${"https://www.freeiconspng.com/uploads/spotify-icon-2.png"})`,
              }}
            >
              <div className="gradient"></div>
            </div>
          </div>

          <div className="artist_details artist_list">
            <div className="list_container">
              <div className="list_title">
                <div>Songs:</div>
              </div>
              <ul>
                {playlistSongs.map((song, index) => (
                  <Link
                    to={`/song/${song.id}?playlist=${playlist.id}`}
                    key={index}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <li>
                      <div>{song.title}</div>
                      <div>{song.length.slice(3, 8)}</div>
                    </li>
                  </Link>
                ))}
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
export default PlaylistPage;

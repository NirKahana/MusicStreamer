import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { useParams } from "react-router-dom";
import SongsList from "../lists/SongsList";
import YouTube from "react-youtube";

import { useAuth } from "../../contexts/AuthContext";

function SongPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  // const { pathname } = useLocation();

  const [song, setSong] = useState();
  const [songHasEnded, setSongHasEnded] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const songData = (await axios.get(`/songs/${id}`)).data; //////////////////
  //     setSong(songData);
  //     window.scrollTo(0, 0);
  //     onStart();
  //   })();
  // }, [pathname, id]);

  useEffect(() => {
    (async () => {
      const songData = (await axios.get(`/songs/${id}`)).data; //////////////////
      setSong(songData);
      window.scrollTo(0, 0);
      onStart();
    })();
  }, [id]);

  const sendQuery = async () => {
    const currentPlayCount = await axios.get(`/interactions`, {
      params: {
        userEmail: currentUser.email,
        songId: id,
      },
    });
    if (currentPlayCount.data === 0) {
      await axios({
        method: "post",
        url: `/interactions`,
        data: {
          userEmail: currentUser.email,
          songId: id,
          play_count: 1,
        },
      });
    } else {
      await axios.put(`/interactions`, {
        userEmail: currentUser.email,
        songId: id,
        play_count: currentPlayCount.data[0].play_count + 1,
      });
    }
  };
  const onEnd = () => {
    !songHasEnded && setSongHasEnded(true);
  };
  const onStart = () => {
    sendQuery();
  };

  return song ? (
    <>
      <div className={"content"}>
        <h1 className={"song_page_title"}>{song.title}</h1>

        <div className="song_page_container">
          <div className="youtube_player">
            <YouTube
              videoId={song.youtube_link.replace(
                "https://www.youtube.com/watch?v=",
                ""
              )}
              allowtransparency="true"
              onEnd={onEnd}
              // onPlay={onStart}
              className="youtube_iframe"
              width="100%"
              height="100%"
              opts={{ playerVars: { autoplay: 1 } }}
            ></YouTube>
          </div>
          <SongsList songHasEnded={songHasEnded} lyrics={song.lyrics} />
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
export default SongPage;

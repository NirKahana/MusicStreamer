import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useParams, Link, useLocation } from "react-router-dom";
import { useMediaQuery } from '@material-ui/core';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { useAuth } from "../../contexts/AuthContext"
import SongLength from "./SongLength";
import SongItem from "./SongItem";
import MobileSongItem from "./MobileSongItem";


function SongsList({ songHasEnded, lyrics }) {
  const [value, setValue] = React.useState(0);
  const [songsData, setSongsData] = useState([]);
  // const requestURL = '';
  const [tappedItemIndex, setTappedItemIndex] = useState(-1);

  const matches = useMediaQuery('(min-width:650px)');
  const {currentUser} = useAuth();
  const { id } = useParams();
  const location = useLocation();



  const qParams = queryString.parse(location.search);
  const qParamArray = Object.entries(qParams);
  const qParamKey = qParamArray[0] ? qParamArray[0][0] : null;
  const qParamValue = qParamArray[0] ? qParamArray[0][1] : null;
  
  let requestURL = `/${qParamKey}s/${qParamValue}/songs`;
  let linkURL = `/?${qParamKey}=${qParamValue}`;
  let targetParam = null;

  switch (qParamKey) {
    case 'most_popular': 
    requestURL = '/most_popular';
    linkURL = '?most_popular==true';
    break;
    case 'recently_played':
      requestURL = `/recently_played`
      // requestURL = `/recently_played/${currentUser.email}`
      linkURL = '?recently_played=true';
      break;
    case 'library':
      requestURL = `/library_songs`
      // requestURL = `/recently_played/${currentUser.email}`
      linkURL = '?library_songs=true';
      break;
    default:
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
  	return {
  		id: `simple-tab-${index}`,
  		'aria-controls': `simple-tabpanel-${index}`,
  	};
  }
  useEffect(() => {
    (async () => {
    //   switch (qParamKey) {
    //     case 'most_popular': 
    //     requestURL = '/most_popular';
    //     linkURL = '?most_popular==true';
    //     break;
    //     case 'recently_played':
    //       requestURL = `/recently_played`
    //       // requestURL = `/recently_played/${currentUser.email}`
    //       linkURL = '?recently_played=true';
    //       break;
    //     default:
    // }
    // console.log("requesURL: ", requestURL);
      const songsArray = (await axios.get(`/${qParamKey}s/songs`, {
        params: {
          userEmail: currentUser.email,

        }
      })).data;
      setSongsData(songsArray);
    })();
  }, [requestURL]);

  if (songHasEnded) {
    for (let i = 0; i < songsData.length - 1; i++) {
      if (songsData[i].id.toString() === id) {
        window.location.assign(
          `/song/${songsData[i + 1].id}${linkURL}`
        );
      }
    }
  }

  const refreshSongs = async () => {
    // console.log("requesURL: ", requestURL);
    const songsArray = (await axios.get(requestURL, {
      params: {
        userEmail: currentUser.email
      }
    })).data;
    setSongsData(songsArray);
  };

  return (
    <>
      <div className={"song_page_class"}>
        <div className="list_container">
          <div className="list_title">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant={"fullWidth"}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
            >
              <Tab label="up next" {...a11yProps(0)} />
              <Tab label="Lyrics" {...a11yProps(1)} />
            </Tabs>
          </div>
          {value === 0 ?
            <ul>
            {songsData.map((song, index) => matches 
            ? <SongItem song={song} path={id} link={`/song/${song.id}${linkURL}`} index={index} tappedItemIndex={tappedItemIndex} setTappedItemIndex={setTappedItemIndex} refreshSongs={refreshSongs}/>
            : <MobileSongItem song={song} path={id} index={index} link={`/song/${song.id}${linkURL}`} tappedItemIndex={tappedItemIndex} setTappedItemIndex={setTappedItemIndex} refreshSongs={refreshSongs}/>
            )} 
            </ul> :
            <div className='lyrics'>
                {lyrics}
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default SongsList;

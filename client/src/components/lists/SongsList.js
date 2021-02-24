import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useParams, Link, useLocation } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useAuth } from "../../contexts/AuthContext"
import SongLength from "./SongLength";


function RegularSongsList({ songHasEnded, lyrics }) {
  const {currentUser} = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const qParams = queryString.parse(location.search);
  const qParamArray = Object.entries(qParams);
  const qParamKey = qParamArray[0] ? qParamArray[0][0] : null;
  const qParamValue = qParamArray[0] ? qParamArray[0][1] : null;
  let requestURL = `/${qParamKey}s/${qParamValue}/songs`;
  let linkURl = `/?${qParamKey}=${qParamValue}`;
  switch (qParamKey) {
    case null: 
    requestURL = '/top_songs';
    linkURl = '';
    break;
    case 'recently_played':
      requestURL = `/recently_played/${currentUser.email}`
      linkURl = '?recently_played';
      break;
    default:
}

  const [songsData, setSongsData] = useState([]);
  const [value, setValue] = React.useState(0);

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
      const songsArray = (
        await axios.get(requestURL)
      ).data;
      setSongsData(songsArray);
    })();
  }, [requestURL]);

  if (songHasEnded) {
    for (let i = 0; i < songsData.length - 1; i++) {
      if (songsData[i].id.toString() === id) {
        window.location.assign(
          `/song/${songsData[i + 1].id}${linkURl}`
        );
      }
    }
  }

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
              {songsData.map((song, index) => (
                  <Link
                    to={`/song/${song.id}${linkURl}`}
                    key={index}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <li
                      style={
                        id === song.id.toString()
                          ? { backgroundColor: "rgb(22,22,22)" }
                          : {}
                      }
                    >
                      <div>{song.title}</div>
                      <SongLength string={song.length} />
                    </li>
                  </Link>
                ))}
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

export default RegularSongsList;

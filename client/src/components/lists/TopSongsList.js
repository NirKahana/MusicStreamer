import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


function TopSongsList({ songHasEnded, lyrics }) {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [topSongsData, setTopSongsData] = useState([]);
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
      let topSongsArray = (await axios.get("/top_songs")).data;
      setTopSongsData(topSongsArray);
    })();
  }, [pathname]);

  if (songHasEnded) {
    for (let i = 0; i < topSongsData.length - 1; i++) {
      if (topSongsData[i].id.toString() === id) {
        window.location.assign(`/song/${topSongsData[i + 1].id}`);
      }
    }
  }
  // let headline = topSongsData[0] ? <div>More from top songs:</div> : "";
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
									backgroundColor: "white"
								}
							}}
            >
              <Tab label="Up next" {...a11yProps(0)} />
              <Tab label="Lyrics" {...a11yProps(1)} />
            </Tabs>
          </div>
					{ value === 0 ?
          <ul>
            {topSongsData.map((song, index) => (
              <Link
                to={`/song/${song.id}`}
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
                  <div>{song.song_title}</div>
                  <div>{song.length.slice(3, 8)}</div>
                </li>
              </Link>
            ))}
          </ul> :
					<div className="lyrics">
						{lyrics}
					</div>
					}
        </div>
      </div>
    </>
  );
}

export default TopSongsList;

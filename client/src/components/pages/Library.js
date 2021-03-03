import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/core/styles";
import { Container, useMediaQuery, Tabs, Tab } from "@material-ui/core";

import { useAuth } from "../../contexts/AuthContext";
import SongItem from "../lists/SongItem";
import MobileSongItem from "../lists/MobileSongItem";

const useStyles = makeStyles({
  flex: {
    display: "flex",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh'
  },
  filler: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    overflowY: 'auto',
    marginBottom: '2em',
    // paddingBottom: '2em',
    // boxShadow: '3px 3px 8px 10px #888888'
  },
  sidePadding: {
    padding: '0 3em'
  },
  alignCenter: {
    alignItems: 'center'
  },
  tabs: {
    color: 'white',
    width: '100%',
    // flexGrow: '1',
    margin: 'auto'
    // padding: '0 3em'
    // backgroundColor: 'rgb(20, 20, 20)'
  },
  tab: {
    // width: '7em'
  },
  title: {
    flexGrow: '1',
    padding: '0.75em 0.5em'
  },
  list: {
    // width: '100%',
    color: 'white',
    marginTop: '1em',
    overflowY: 'auto',
    overflowY: 'auto'
  },
  mobileList: {
    color: 'white',
    marginTop: '1em',
    overflowY: 'auto',
  },
  listItem: {
    padding: '1.2em 0.2em',
  }
});

export default function Library() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const matches = useMediaQuery("(min-width:650px)");


  const [value, setValue] = useState(0);
  const [librarySongs, setLibrarySongs] = useState();
  const [tappedItemIndex, setTappedItemIndex] = useState(-1);


  useEffect(() => {
    const fetchLibrarySongs = async () => {
      const librarySongs = (await axios.get('/library_songs', {
        params: {
          userEmail: currentUser.email
        }
      })).data;
      setLibrarySongs(librarySongs);
      console.log('library songs: ', librarySongs);
    }
    fetchLibrarySongs();
  }, [])

  function a11yProps(index) {
  	return {
  		id: `simple-tab-${index}`,
  		'aria-controls': `simple-tabpanel-${index}`,
  	};
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const refreshSongs = async () => {
    const librarySongs = (await axios.get('/library_songs', {
      params: {
        userEmail: currentUser.email
      }
    })).data;
    setLibrarySongs(librarySongs);
  };

  const renderList = () => {
    switch (value) {
      case 0:
        return librarySongs.map((song, index) => matches 
        ? <SongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
        />
        : <MobileSongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
          />
      )
        break;
      case 1:
        return librarySongs.map((song, index) => matches 
        ? <SongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
        />
        : <MobileSongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
          />
      )
        break;
      case 2:
        return librarySongs.map((song, index) => matches 
        ? <SongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
        />
        : <MobileSongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
          />
      )
        break;
      case 3:
        return librarySongs.map((song, index) => matches 
        ? <SongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
        />
        : <MobileSongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
          />
      )
        break;
    
      default:
        return librarySongs.map((song, index) => matches 
        ? <SongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
        />
        : <MobileSongItem song={song}
                  link={`/song/${song.id}?library=true`} 
                  index={index}
                  tappedItemIndex={tappedItemIndex} 
                  setTappedItemIndex={setTappedItemIndex} 
                  refreshSongs={refreshSongs}
          />
      )
        break;
    }
  }
  return librarySongs ? (
    <div className={matches ? ` ${classes.container} ${classes.sidePadding}` : `${classes.container}`}>
      <div className={`content ${classes.filler}`}>
        
      <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              // variant={"standard"}
              variant={"fullWidth"}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
              classes={{root: classes.tabs}}
            >
              <Tab label="Songs" {...a11yProps(0)} classes={{root: classes.tab}}/>
              <Tab label="Artists" {...a11yProps(1)} classes={{root: classes.tab}}/>
              <Tab label="Albums" {...a11yProps(2)} classes={{root: classes.tab}}/>
              <Tab label="Playlists" {...a11yProps(3)} classes={{root: classes.tab}}/>
            </Tabs>
            <Container
              disableGutters
              maxWidth={'false'}
              className={matches ? classes.list : classes.mobileList}
            > 
              {renderList()}
            </Container>
      </div>
    </div>
  ) : (
    <>
      <div className="vh100 flex_center ">
        <ReactLoading type={"spokes"} color={"grey"} height={67} width={75} />
      </div>
    </>
  );
}

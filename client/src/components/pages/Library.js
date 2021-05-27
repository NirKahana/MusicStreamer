import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/core/styles";
import { Container, useMediaQuery, Tabs, Tab } from "@material-ui/core";

import { useAuth } from "../../contexts/AuthContext";
import SongItem from "../lists/SongItem";
import MobileSongItem from "../lists/MobileSongItem";
import { useLocation } from "react-router";
import { NavLink, Link } from "react-router-dom";

const useStyles = makeStyles({
  flex: {
    display: "flex",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxHeight: "100vh",
  },
  filler: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    overflowY: "auto",
    marginBottom: "2em",
    // paddingBottom: '2em',
    // boxShadow: '3px 3px 8px 10px #888888'
  },
  sidePadding: {
    padding: "0 3em",
  },
  alignCenter: {
    alignItems: "center",
  },
  tabs: {
    color: "white",
    width: "100%",
    // flexGrow: '1',
    // margin: 'auto'
    // padding: '0 3em'
    // backgroundColor: 'rgb(20, 20, 20)'
  },
  tab: {
    // width: '7em'
  },
  title: {
    flexGrow: "1",
    padding: "0.75em 0.5em",
  },
  list: {
    // width: '100%',
    color: "white",
    marginTop: "1em",
    overflowY: "auto",
    overflowY: "auto",
  },
  mobileList: {
    color: "white",
    marginTop: "1em",
    overflowY: "auto",
  },
  listItem: {
    padding: "1.2em 0.2em",
  },
});

export default function Library() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const matches = useMediaQuery("(min-width:650px)");

  const [librarySongs, setLibrarySongs] = useState();
  const [tappedItemIndex, setTappedItemIndex] = useState(-1);

  const path = useLocation().pathname.slice(9);
  const re = new RegExp(/\w+/i);
  const param = re[Symbol.match](path)[0];

  useEffect(() => {
    const fetchLibrarySongs = async () => {
      const librarySongs = (
        await axios.get(`/library/${param}`, {
          params: {
            userEmail: currentUser.email,
          },
        })
      ).data;
      // console.log(librarySongs);
      setLibrarySongs(librarySongs); 
    };
    fetchLibrarySongs();
  }, [param]);

  const refreshSongs = async () => {
    const librarySongs = (
      await axios.get(`/library/${param}`, {
        params: {
          userEmail: currentUser.email,
        },
      })
    ).data;
    setLibrarySongs(librarySongs);
  };
  const renderList = () => {
    return librarySongs.map((song, index) => {
      if(matches) {
        if(param === "songs") {
          return (
            <SongItem
              song={song}
              link={`/song/${song.id}?library=true`}
              index={index}
              key={index}
              tappedItemIndex={tappedItemIndex}
              setTappedItemIndex={setTappedItemIndex}
              refreshSongs={refreshSongs}
            />
        )} else {
          return (
            <SongItem
              song={song}
              link={`/song/${song.id}?library=true`}
              index={index}
              key={index}
              tappedItemIndex={tappedItemIndex}
              setTappedItemIndex={setTappedItemIndex}
              refreshSongs={refreshSongs}
              ArtistItem
            />
        )}
      } else {
        if(param === "songs") {
          return (
            <MobileSongItem
              song={song}
              link={`/song/${song.id}?library=true`}
              index={index}
              key={index} 
              tappedItemIndex={tappedItemIndex}
              setTappedItemIndex={setTappedItemIndex}
              refreshSongs={refreshSongs}
            />
          )} else {
          return (
            <MobileSongItem
              song={song}
              link={`/song/${song.id}?library=true`}
              index={index}
              key={index} 
              tappedItemIndex={tappedItemIndex}
              setTappedItemIndex={setTappedItemIndex}
              refreshSongs={refreshSongs}
              ArtistItem
            />
          )
        }
      }



      // if (matches && param === "songs") return (
      //   <SongItem
      //     song={song}
      //     link={`/song/${song.id}?library=true`}
      //     index={index}
      //     key={index}
      //     tappedItemIndex={tappedItemIndex}
      //     setTappedItemIndex={setTappedItemIndex}
      //     refreshSongs={refreshSongs}
      //   />
      // );
      // if (matches && param !== "songs") return (
      //   <div>Artist Item</div>
      // );
      // if(!matches && param === "songs") return (
      //   <MobileSongItem
      //       song={song}
      //       link={`/song/${song.id}?library=true`}
      //       index={index}
      //       key={index} 
      //       tappedItemIndex={tappedItemIndex}
      //       setTappedItemIndex={setTappedItemIndex}
      //       refreshSongs={refreshSongs}
      //     />
      // );
      // if (!matches && param !== "songs") return (
      //   <div>Mobile Artist Item</div>
      // )
    //
    })
  }
  return librarySongs ? (
    <div
      className={
        matches
          ? ` ${classes.container} ${classes.sidePadding}`
          : `${classes.container}`
      }
    >
      <div className={`content ${classes.filler}`}>
        <div className={`${classes.header}`}>
          <>
            <NavLink
              className={"tab"}
              exact
              to="/library/songs"
              activeStyle={{ color: "white", textDecoration: "none" }}
            >
              Songs
            </NavLink>
            <NavLink
              className={"tab"}
              exact
              to="/library/artists"
              activeStyle={{ color: "white", textDecoration: "none" }}
            >
              Artists
            </NavLink>
            <NavLink
              className={"tab"}
              exact
              to="/library/albums"
              activeStyle={{ color: "white", textDecoration: "none" }}
            >
              Albums
            </NavLink>
            <NavLink
              className={"tab"}
              exact
              to="/library/playlists"
              activeStyle={{ color: "white", textDecoration: "none" }}
            >
              Playlists
            </NavLink>
          </>
        </div>
        <Container
          disableGutters
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

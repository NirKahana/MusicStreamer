import React from "react";
import SongLength from "./SongLength";

export default function SongItem({ path, song }) {
  console.log("song: ", song);
  return (
    <li
      style={
        path === song.id.toString() ? { backgroundColor: "rgb(22,22,22)" } : {}
      }
    >
      <div>{song.title}</div>
      <SongLength string={song.length} />
    </li>
  );
}

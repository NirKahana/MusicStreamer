import React from 'react';
import { Link } from "react-router-dom";

function PlaylistCard({ playlist_name, id, num_of_songs}) {
    return (
        <>
            <Link to={`/playlist/${id}`}>
                <div className={"card"}>
                    <img className={"img"} style={{}} src={"https://www.freeiconspng.com/uploads/spotify-icon-2.png"} alt="playlist"></img>
                    <div className={"major_title"}>{playlist_name}</div>
                    <div className={"major_title"}><span className={"minor_title"}>Playlist &#8226; {num_of_songs} Songs</span></div>
                </div>
            </Link>
        </>
    )
}
export default PlaylistCard;
import React from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

function PlaylistCard({ playlist_name, user_name, num_of_songs}) {
    return (
        <>
            <div className={"card"}>
            <img className={"img"} src={"https://i.pinimg.com/474x/9a/dd/f9/9addf958b50fa78629939febb246e0df.jpg"}></img>
            <div className={"major_title"}>{playlist_name}</div>
            <div className={"major_title"}><span className={"minor_title"}>Playlist &#8226; {num_of_songs} Songs</span></div>
            </div>
        </>
    )
}
export default PlaylistCard;
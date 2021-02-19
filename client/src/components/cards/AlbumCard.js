import React from 'react';
import { Link } from "react-router-dom";

function AlbumCard({ name, artist_name, id, cover_img}) {
    return (
        <>
            <Link to={`/album/${id}`}>
                <div className={"card"}>
                    <img className={"img"} src={cover_img || "https://www.freeiconspng.com/uploads/spotify-icon-2.png"} alt="album"></img>
                    <div className={"major_title"}>{name}</div>
                    <div className={"major_title"}><span className={"minor_title"}>Album &#8226; {artist_name}</span></div>
                </div>
            </Link>
        </>
    )
}
export default AlbumCard;
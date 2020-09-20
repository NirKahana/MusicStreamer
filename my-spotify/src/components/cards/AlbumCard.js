import React from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

function AlbumCard({ name, artist_name, id, cover_img}) {
    // console.log("artist id ",id);
    return (
        <>
            <Link to={`/album/${id}`}>
                <div className={"card"}>
                    <img className={"img"} src={cover_img}></img>
                    <div className={"major_title"}>{name}</div>
                    <div className={"major_title"}><span className={"minor_title"}>Album &#8226; {artist_name}</span></div>
                </div>
            </Link>
        </>
    )
}
export default AlbumCard;
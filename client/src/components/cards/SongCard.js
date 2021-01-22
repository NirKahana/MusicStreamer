import React from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

function SongCard({ title, artist, id, cover_img }) {
    const params = useParams()
    return (
        <>
            <div className={"card"}>
                <Link to={`/song/${id}`} className={"link"}>
                        <img className={"img"} src={cover_img || "https://www.freeiconspng.com/uploads/spotify-icon-2.png"}></img>
                        <div className={"major_title"}>{title}</div>
                        <div className={"major_title"}><span className={"minor_title"}>{artist}</span></div>
                </Link>
            </div>
        </>
    )
}
export default SongCard;
import React from 'react';
import { Link } from "react-router-dom";

function ArtistCard({ name, plays, id, cover_img }) {
    return (
        <>
            <div className={"artist_card"}>
                <Link to={`/artist/${id}`} className={"link"}>
                        <img className={"round_img"} src={cover_img || ""} alt="artist"></img>
                        <div className={"artists_major_title"}>{name}</div>
                        {/* <div className={"artists_major_title"}><span className={"minor_title"}>Total Views: {plays}</span></div> */}
                </Link>
            </div>
        </>
    )
}
export default ArtistCard;
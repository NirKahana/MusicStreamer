import React from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

function ArtistCard({ name, plays }) {
    const params = useParams()
    return (
        <>
            <div className={"artist_card"}>
            <img className={"round_img"} src={"https://i.pinimg.com/474x/9a/dd/f9/9addf958b50fa78629939febb246e0df.jpg"}></img>
            <div className={"artists_major_title"}>{name}</div>
            <div className={"artists_major_title"}><span className={"minor_title"}>Total Views: {plays}</span></div>
            </div>
        </>
    )
}
export default ArtistCard;
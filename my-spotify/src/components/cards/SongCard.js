import React from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

function SongCard({ title, artist, id }) {
    const params = useParams()
    return (
        <>
            <div className={"card"}>
                <Link to={`/song/${id}`} className={"link"}>
                        <img className={"img"} src={"https://i.pinimg.com/474x/9a/dd/f9/9addf958b50fa78629939febb246e0df.jpg"}></img>
                        <div className={"major_title"}>{title}</div>
                        <div className={"major_title"}><span className={"minor_title"}>{artist}</span></div>
                </Link>
            </div>
        </>
    )
}
export default SongCard;
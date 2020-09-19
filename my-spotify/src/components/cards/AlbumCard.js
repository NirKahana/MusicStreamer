import React from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

function AlbumCard({ name, artist_name }) {
    
        const params = useParams();
        console.log(params);
        return (
            <>

                <div className={"card"}>
                <img className={"img"} src={"https://i.pinimg.com/474x/9a/dd/f9/9addf958b50fa78629939febb246e0df.jpg"}></img>
                <div className={"major_title"}>{name}</div>
                <div className={"major_title"}><span className={"minor_title"}>Album &#8226; {params.id ? 2018 : artist_name}</span></div>
                </div>

            </>
        )
        
}
export default AlbumCard;
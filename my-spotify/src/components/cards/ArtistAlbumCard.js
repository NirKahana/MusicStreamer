import React from 'react';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";

function ArtistAlbumCard({ name, created_at, num_of_songs, id}) {
    
        const params = useParams();
        return (
            <>
                <Link to={`/album/${id}`}>
                    <div className={"artist_album_card"}>   
                    <div className="album_name">
                        {name}
                    </div>
                    <div className="album_details">
                        Album &#8226; 2020
                    </div>
                    </div>
                </Link>
            </>
        )
        
}
export default ArtistAlbumCard;
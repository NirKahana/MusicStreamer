import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from "react-router-dom"; 

function NotFound( ) {

    
    return (
        <>
            <div className="not_found">Page Not Found</div>
        </>
    )
}
export default NotFound;
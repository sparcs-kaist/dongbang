import React from "react";
import {useParams} from "react-router-dom";


const Member: React.FC = () => {
    const {username} = useParams();
    
    
    return (
        <div>{username}</div>
    )
}

export default Member;

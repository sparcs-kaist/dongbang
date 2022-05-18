import React from "react";
import styles from "./Member.module.css";

import Drawer from "/imports/ui/components/Drawer";

import {useParams} from "react-router-dom";


const Member: React.FC = () => {
    const {username} = useParams();
    
    
    return (
        <Drawer>
            {username}
        </Drawer>
    )
}

export default Member;

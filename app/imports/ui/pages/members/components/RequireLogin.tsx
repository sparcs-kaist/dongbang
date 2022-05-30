import React from "react";
import styles from "./RequireLogin.module.css";

import {CardClickable, CardText} from "/imports/ui/components/Card";
import {useNavigate} from "react-router-dom";



const RequireLogin: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <CardClickable
            className={styles.item}
            onClick={() => navigate("/login")}
        >
            <CardText.main>로그인</CardText.main>
            <CardText.sub>로그인이 필요합니다</CardText.sub>
        </CardClickable>
    )
}


export default RequireLogin;

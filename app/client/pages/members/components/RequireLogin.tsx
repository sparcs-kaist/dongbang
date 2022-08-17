import React from "react";
import styles from "./RequireLogin.module.css";

import { CardAction, CardBody, CardText } from "../../../components";
import { useNavigate } from "react-router-dom";

export const RequireLogin: React.FC = () => {
    const navigate = useNavigate();

    return (
        <CardBody>
            <CardAction
                className={styles.item}
                onClick={() => navigate("/login")}
            />
            <CardText.main>로그인</CardText.main>
            <CardText.sub>로그인이 필요합니다</CardText.sub>
        </CardBody>
    );
};

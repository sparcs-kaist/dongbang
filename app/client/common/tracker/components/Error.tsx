import React from "react";
import { CardText } from "/client/components";

export const Error: React.FC = () => {
    return (
        <>
            <CardText.main>에러 발생</CardText.main>
            <CardText.sub>
                이 메시지가 보이면 SPARCS AP presence check server가 정상적으로
                동작하지 않고 있다는 의미입니다. 관리자에게 연락해 주세요.
            </CardText.sub>
        </>
    );
};

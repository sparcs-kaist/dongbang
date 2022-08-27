import React from "react";
import { Button, CardText, Spacer } from "/client/components";

interface RegisterProps {
    register: () => Promise<void>;
}

export const Register: React.FC<RegisterProps> = ({ register }) => {
    return (
        <>
            <CardText.main>내 기기 등록하기</CardText.main>
            <CardText.sub>
                SPARCS Wi-Fi 연결 상태에 따라 내 상태가 자동으로 변경됩니다.
            </CardText.sub>
            <Spacer y={10} />
            <Button onClick={register}>기기 등록하기</Button>
        </>
    );
};

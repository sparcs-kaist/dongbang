import React from "react";
import { Button, CardText, Spacer } from "/client/components";
import { methods } from "../../../../imports/api";
import { Meteor } from "meteor/meteor";

export const Register: React.FC = () => {
    const register = async () => {
        const token = await methods.devices.getToken();
        try {
            const win = window.open(
                Meteor.settings.public.trackerEndpoint + token,
                "_blank",
            );

            if (!win || win.closed || typeof win.closed === "undefined")
                throw new Error("Popup blocked");

            win.focus();
        } catch {
            alert("팝업이 차단되어 있습니다. 설정에서 팝업을 허용해주세요.");
        }
    };

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

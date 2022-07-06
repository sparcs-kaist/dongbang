import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Drawer} from "/imports/ui/components/Drawer";
import {Text} from "/imports/ui/components/Text";
import {Input} from "/imports/ui/components/Input";
import {Button} from "/imports/ui/components/Button";
import {Select, SelectItem} from "/imports/ui/components/Select";

import {startSession} from "/imports/api/methods/sessions";
import useInput from "../../common/hooks/useInput";

import {Location, LOCATION_NAME} from "/imports/collections/sessions";
import {LocationIcon} from "/imports/assets/Icons";
import Collapse from "/imports/ui/components/animate/Collapse";
import {Spacer} from "/imports/ui/components/Spacer";

const CreateSession: React.FC = () => {
    const navigate = useNavigate();
    
    const {input: name} = useInput("");
    const [location, setLocation] = useState<Location | undefined>(undefined);
    const [locationName, setLocationName] = useState<string>("");
    
    useEffect(() => {
        if (location) setLocationName(LOCATION_NAME[location]);
    }, [location]);
    
    const validate = useCallback(() => (
        name.value.trim().length > 0
    ), [name.value, close]);
    
    const create = () => {
        startSession.call({name: name.value.trim(), location}, (err, res) => {
            if (err) alert(err)
            else {
                console.log(res);
            }
        });
        navigate("..", {replace: true});
    }
    
    return (
        <Drawer>
            <Text.main>세션 열기</Text.main>
            <div>
                <Text.sub>세션 이름</Text.sub>
                <Input
                    type="text"
                    placeholder="세션 이름"
                    name="name"
                    maxLength={50}
                    {...name}
                />
            </div>
            <div>
                <Text.sub>장소</Text.sub>
                <Select value={location} onChange={v => setLocation(v as Location)}>
                    <SelectItem value={Location.A_SITE}>A SITE</SelectItem>
                    <SelectItem value={Location.B_SITE}>B SITE</SelectItem>
                    <SelectItem>없음</SelectItem>
                </Select>
                <Collapse show={!!location}>
                    <Text.sub style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}>
                    <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        color: "var(--theme-red)"
                    }}><LocationIcon/>{locationName}</span>를 예약합니다
                    </Text.sub>
                </Collapse>
            </div>
            <Spacer y={12}/>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                <Button onClick={create} disabled={!validate()} style={{zIndex: 10}}>열기</Button>
            </div>
        </Drawer>
    )
}

export default CreateSession;

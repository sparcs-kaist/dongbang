import React, {useCallback, useEffect, useState} from "react";
import styles from "./CreateSession.module.css";
import classNames from "classnames";

import Drawer from "/imports/ui/components/Drawer";
import {Text} from "/imports/ui/components/Text";
import {Input} from "/imports/ui/components/Input";
import {Button} from "/imports/ui/components/Button";
import {Select, SelectItem} from "/imports/ui/components/Select";

import {startSession} from "/imports/api/methods/sessions";
import useInput from "../../common/hooks/useInput";

import {Location, LOCATION_NAME} from "/imports/db/sessions";
import {LocationIcon} from "/imports/assets/Icons";

const CreateSession: React.FC = () => {
    const [close, setClose] = useState<boolean>(false);
    const {input: name} = useInput("");
    const [location, setLocation] = useState<Location | undefined>(undefined);
    
    const [locationName, setLocationName] = useState<string>("");
    
    useEffect(() => {
        if (location) setLocationName(LOCATION_NAME[location]);
    }, [location]);
    
    const validate = useCallback(() => name.value.length > 0, [name.value]);
    
    
    const create = () => {
        startSession.call({name: name.value, location}, (err, res) => {
            if (err) alert(err)
            else {
                console.log(res);
            }
        })
        
        setClose(true);
    }
    
    
    return (
        <Drawer close={close}>
            <Text.main>세션 열기</Text.main>
            
            <Text.sub>세션 이름</Text.sub>
            <Input
                type="text"
                placeholder="세션 이름"
                name="name"
                {...name}
            />
            
            <Text.sub>장소</Text.sub>
            <Select value={location} onChange={v => setLocation(v as Location)}>
                <SelectItem valueFor={Location.A_SITE}>A SITE</SelectItem>
                <SelectItem valueFor={Location.B_SITE}>B SITE</SelectItem>
                <SelectItem>없음</SelectItem>
            </Select>
            <Text.sub className={classNames(styles.desc, {[styles.show]: location})} style={{display: "flex", alignItems: "center", gap: 1}}>
                <span style={{display: "inline-flex", alignItems: "center", gap: 4}}><LocationIcon/>{locationName}</span>를 예약합니다
            </Text.sub>
            
            <div className={styles.buttonContainer}>
                <Button onClick={create} disabled={!validate()}>열기</Button>
            </div>
        </Drawer>
    )
}

export default CreateSession;

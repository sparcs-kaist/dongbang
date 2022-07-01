import React, {useEffect, useState} from "react";
import {Card, CardBody, CardText} from "/imports/ui/components/Card";
import {AnimatePresence} from "framer-motion";
import {Button} from "/imports/ui/components/Button";

const DeviceRegister: React.FC = () => {
    const {active} = useDeviceRegister();
    
    
    return (
        <AnimatePresence>
            {active && <Card
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: "auto"}}
                exit={{opacity: 0, height: 0}}
            >
                <CardBody>
                    <CardText.main>기기 등록</CardText.main>
                    <CardText.sub>
                        아래의 기기를 등록하시면, 다른 사용자들이 당신을 찾을 수 있습니다.</CardText.sub>
                    <Button>asdfasdf</Button>
                </CardBody>
            </Card>}
        </AnimatePresence>
    )
}

const useDeviceRegister = () => {
    const [active, setActive] = useState(false);
    
    useEffect(() => {
        checkRegistration().then(() => {
            setActive(true);
        });
    }, []);
    
    return {active};
}


const checkRegistration = async () => {
    await fetch("http://192.168.0.74:57463/dongbang");
}

const register = async () => {

}

export default DeviceRegister;

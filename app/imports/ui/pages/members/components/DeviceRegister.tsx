import React, {useEffect, useState} from "react";
import {Card, CardBody, CardText} from "/imports/ui/components/Card";
import {AnimatePresence} from "framer-motion";
import {Button} from "/imports/ui/components/Button";
import {Spacer} from "/imports/ui/components/Spacer";
import {registerDevice} from "/imports/api/methods/devices";


const DeviceRegister: React.FC = () => {
    const {active, register, error} = useDeviceRegister();
    
    return (
        <AnimatePresence>
            {active && <Card
                initial={{opacity: 0, height: 0, marginBottom: 0}}
                animate={{opacity: 1, height: "auto", marginBottom: 10}}
                exit={{opacity: 0, height: 0, marginBottom: 0}}
            >
                <CardBody>
                    {error ? <>
                        <CardText.main>에러 발생</CardText.main>
                        <CardText.sub>
                            이 메시지가 보이면 SPARCS AP presence check server가 정상적으로 동작하지 않고 있다는 의미입니다.
                            관리자에게 연락해 주세요.
                            <Spacer y={5}/>
                            detail: {error}
                        </CardText.sub>
                    </> : <>
                        <CardText.main> 내 기기 등록하기</CardText.main>
                        <CardText.sub>
                            SPARCS AP 연결 상태에 따라 내 상태가 변경됩니다
                        </CardText.sub>
                        <Spacer y={10}/>
                        <Button onClick={register}>기기 등록하기</Button>
                    </>}
                </CardBody>
            </Card>}
        </AnimatePresence>
    )
}

const useDeviceRegister = () => {
    const [macAddress, setMacAddress] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    
    useEffect(() => {
        fetchData()
            .then(({macAddress, error}) => {
                setMacAddress(macAddress);
                setError(error);
            })
            .catch(() => {});
    }, [setMacAddress, setError]);
    
    
    const register = () => {
        if (macAddress) {
            // Do something
            registerDevice.call({macAddress});
            
            setMacAddress(undefined);
        }
    }
    
    return {
        active: !!macAddress || error,
        register,
        error,
    };
}


interface Data {
    macAddress?: string;
    error?: string;
}

const fetchData = async (): Promise<Data> => {
    const res = await fetch("http://192.168.0.74:57463/dongbang");
    
    if (res.status !== 200) throw new Error(res.statusText);
    
    const data = await res.json();
    console.log(data);
    
    if (data?.hello !== "dongbang") throw new Error("Invalid response");
    
    if (typeof data?.error === "string") return {error: data.error};
    if (typeof data?.macAddress === "string") return {macAddress: data.macAddress};
    
    throw new Error("Invalid response");
}

export default DeviceRegister;

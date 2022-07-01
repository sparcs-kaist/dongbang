import {Meteor} from "meteor/meteor";

import React, {FormEvent, useState} from "react";
import classNames from "classnames";
import styles from "./Login.module.css";
import headerStyles from "../layouts/Header/styles.module.css";

import {useNavigate} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import useInput from "/imports/ui/common/hooks/useInput";

import {CloseIcon} from "/imports/assets/Icons";
import {Logo} from "/imports/assets";
import {Input} from "/imports/ui/components/Input";
import {Text} from "/imports/ui/components/Text";
import {Button} from "/imports/ui/components/Button";
import {Spacer} from "/imports/ui/components/Spacer";

const Login: React.FC = () => {
    const navigate = useNavigate();
    
    const {input: username} = useInput("");
    const {input: password, setValue: setPassword} = useInput("");
    const [error, setError] = useState(false);
    
    const user = useTracker(() => Meteor.user());
    
    const alertLoginFail = () => {
        setPassword("");
        setError(true);
    }
    
    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        Meteor.loginAsLDAP(
            username.value,
            password.value,
            (err) => {
                if (err) {
                    alertLoginFail();
                } else {
                    navigate("/");
                }
            });
        
    }
    
    const logout = () => Meteor.logout();
    
    return (
        <div className={styles.root}>
            <div className={styles.topBorder}/>
            <div
                className={classNames(headerStyles.action, styles.close)}
                onClick={() => navigate("/")}
            >
                <CloseIcon/>
            </div>
            
            <div className={styles.main}>
                <Logo className={styles.logo}/>
                
                {user
                    ? <Button onClick={logout}>로그아웃</Button>
                    : <form onSubmit={login}>
                        <div>
                            <Text.sub>아이디</Text.sub>
                            <Input
                                type="text"
                                placeholder="username"
                                name="username"
                                required
                                {...username}
                            />
                        </div>
                        <div>
                            <Text.sub>비밀번호</Text.sub>
                            <Input
                                type="password"
                                placeholder="password"
                                name="password"
                                required
                                {...password}
                            />
                        </div>
        
                        {error && <Text.sub style={{
                            color: "var(--theme-red)",
                            width: "100%",
                            padding: 0
                        }}>
                            아이디 또는 비밀번호가 올바르지 않습니다
                        </Text.sub>}
                        <Spacer y={0}/>
                        <Button type="submit">로그인</Button>
                    </form>
                }
            </div>
        </div>
    )
}

export default Login;

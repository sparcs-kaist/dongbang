import {Meteor} from "meteor/meteor";

import React, {FormEvent, useState} from "react";

import {Link} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const user = useTracker(() => Meteor.user());
    
    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        Meteor.loginWithPassword(username, password);
    }
    
    const logout = () => Meteor.logout();
    
    return (
        <div>
            login
            <Link to="/">&lt; Home</Link>
            
            {user
                ? <button onClick={logout}>로그아웃</button>
                : <form onSubmit={login}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        required
                        onChange={e => setUsername(e.target.value)}
                    />
                    
                    <label htmlFor="password">Username</label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    <button type="submit">로그인</button>
                </form>
            }
            <button onClick={() => Meteor.loginAsAdmin("admin-password")}>qwer</button>
        </div>
    )
}

export default Login;

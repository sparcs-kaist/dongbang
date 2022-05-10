import {Meteor} from "meteor/meteor";

import React, {FormEvent, useState} from "react";

import {Link} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    
    const user = useTracker(() => Meteor.user());
    
    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        Meteor.loginAsTestAccount(username);
    }
    
    const logout = () => Meteor.logout();
    
    return (
        <div>
            login
            <Link to="/">&lt; Home</Link>
            
            <h2>Login as Test Account</h2>
            
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
                    
                    <button type="submit">로그인</button>
                </form>
            }
        </div>
    )
}

export default Login;

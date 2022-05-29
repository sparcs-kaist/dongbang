import {Meteor} from "meteor/meteor";

import React, {FormEvent} from "react";

import {Link} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import useInput from "/imports/ui/common/hooks/useInput";

const Login: React.FC = () => {
    const {input: username} = useInput("");
    const {input: password} = useInput("");
    
    const user = useTracker(() => Meteor.user());
    
    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        
        Meteor.loginAsLDAP(
            username.value,
            password.value,
            (err) => {
            if (err) {
                alert(err)
            }
        });
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
                        {...username}
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        {...password}
                    />
                    
                    <button type="submit">로그인</button>
                </form>
            }
        </div>
    )
}

export default Login;

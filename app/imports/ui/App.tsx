import React from 'react';
import "./index.css";
import "./theme.css";

import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

import AppLayout from "/imports/ui/layouts/AppLayout";

import Members from "/imports/ui/pages/members";
import Sessions from "/imports/ui/pages/sessions";
import Login from "/imports/ui/pages/Login";

import {useUser} from "./common/hooks/useUser";
import {useQueryData} from "./common/hooks/useQueryData";
import {membersQuery} from "/imports/api/query/members";
import {sessionsQuery} from "/imports/api/query/sessions";

export const App = () => {
    const user = useUser();
    const members = useQueryData(membersQuery);
    const sessions = useQueryData(sessionsQuery);
    
    return (
        <Router>
            <Routes>
                <Route index element={<Navigate to="/members" replace={true}/>}/>
                <Route path="/" element={<AppLayout/>}>
                    <Route
                        path="members"
                        element={<Members.Page user={user} members={members}/>}
                    >
                        <Route path=":username" element={<Members.Inlet user={user} members={members}/>}/>
                    </Route>
                    <Route
                        path="sessions"
                        element={<Sessions.Page sessions={sessions} currentSessionId={user?.session?._id}/>}
                    >
                        <Route path="create" element={<Sessions.Inlet/>}/>
                    </Route>
                    <Route path="schedules">
                    
                    </Route>
                </Route>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    )
};

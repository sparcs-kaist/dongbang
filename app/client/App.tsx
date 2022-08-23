import * as React from "react";

import "./index.css";
import "./themes";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import { AppLayout } from "./layouts";

import Members from "./pages/members";
import Sessions from "./pages/sessions";
import Login from "./pages/Login";

import { useUser } from "./common/hooks/useUser";
import { useQueryData } from "./common/hooks/useQueryData";
import { membersQuery } from "/imports/api/query/members";
import { sessionsQuery } from "/imports/api/query/sessions";
import { useEffect, useState } from "react";
import { checkTrackerStatus } from "../imports/api/methods/devices";

export const App = () => {
    const user = useUser();
    const members = useQueryData(membersQuery);
    const sessions = useQueryData(sessionsQuery);

    const [status, setStatus] = useState(false);

    useEffect(() => {
        checkTrackerStatus().then(setStatus);
    });

    return (
        <Router>
            <Routes>
                <Route
                    index
                    element={<Navigate to="/members" replace={true} />}
                />
                <Route path="/" element={<AppLayout />}>
                    <Route
                        path="members"
                        element={<Members.Page user={user} members={members} />}
                    >
                        <Route
                            path=":username"
                            element={
                                <Members.Inlet user={user} members={members} />
                            }
                        />
                    </Route>
                    <Route
                        path="sessions"
                        element={
                            <Sessions.Page
                                sessions={sessions}
                                currentSessionId={user?.session?._id}
                            />
                        }
                    >
                        <Route path="create" element={<Sessions.Inlet />} />
                    </Route>
                    <Route path="schedules"></Route>
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
            {status ? "true" : "false"}
        </Router>
    );
};

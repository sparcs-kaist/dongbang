import React from "react";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./Layout";
import { useTracker } from "../hook";

import { Error } from "./Error";
import { Register } from "./Register";

import type { Query } from "/imports/utils/collections";
import type { User } from "/imports/collections/users";

interface TrackerProps {
    user: Query<User> | undefined;
}

export const Tracker: React.FC<TrackerProps> = ({ user }) => {
    const { registerable, error } = useTracker(user);

    return (
        <AnimatePresence>
            <Layout>
                {error ? <Error /> : registerable ? <Register /> : null}
            </Layout>
        </AnimatePresence>
    );
};

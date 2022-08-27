import React from "react";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./Layout";
import { useTracker } from "../hook";

import { Error } from "./Error";
import { Register } from "./Register";

export const Tracker: React.FC = () => {
    const { register, error } = useTracker();

    return (
        <AnimatePresence>
            <Layout>
                {error ? (
                    <Error />
                ) : register ? (
                    <Register register={register} />
                ) : null}
            </Layout>
        </AnimatePresence>
    );
};

import { useEffect, useState } from "react";

import { isMobile } from "react-device-detect";
import { methods } from "/imports/api";
import { TrackerError } from "/imports/tracker";

import type { Query } from "/imports/utils/collections";
import type { User } from "/imports/collections/users";

export const useTracker = (user: Query<User> | undefined) => {
    const [registerable, setRegisterable] = useState<boolean>(false);
    const [error, setError] = useState<TrackerError | null>(null);

    useEffect(() => {
        if (!user) return;

        methods.devices
            .isRegisterable()
            .then(({ registerable, error }) => {
                console.log(registerable);
                setRegisterable(isMobile && registerable);
                setError(error);
            })
            .catch(() => {
                setError(TrackerError.UNKNOWN);
            });
    }, [user, setRegisterable, setError]);

    return { registerable, error };
};

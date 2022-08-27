import { Meteor } from "meteor/meteor";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { methods } from "/imports/api";
import { TrackerError } from "/imports/tracker";

export const useTracker = () => {
    const navigate = useNavigate();

    const [register, setRegister] = useState<(() => Promise<void>) | null>(
        null,
    );
    const [error, setError] = useState<TrackerError | null>(null);

    const _register = async () => {
        const token = await methods.devices.getToken();
        navigate(Meteor.settings.public.trackerEndpoint + token);
    };

    useEffect(() => {
        methods.devices
            .isRegisterable()
            .then(({ registerable, error }) => {
                setRegister(isMobile && registerable ? _register : null);
                setError(error);
            })
            .catch(() => {
                setError(TrackerError.UNKNOWN);
            });
    }, [setRegister, setError]);

    return { register, error };
};

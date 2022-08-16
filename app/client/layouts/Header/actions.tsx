import React, { ReactNode } from "react";
import styled from "styled-components";
import { Link, useLocation, useResolvedPath } from "react-router-dom";

interface ActionProps {
    path: string;
    to: string;
    icon: ReactNode;
}

const StyledLink = styled(Link)`
    width: calc(var(--header-height) - 20px);
    height: calc(var(--header-height) - 20px);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.05s ease;

    &:active {
        background-color: rgba(var(--grey-000_w), 0.1);
    }
`;

export const Actions = styled.div`
    & * {
        display: flex;
    }

    & svg {
        width: 32px;
        height: 32px;
        fill: var(--theme-500);
    }
`;

export const Action: React.FC<ActionProps> = ({ path, to, icon }) => {
    const location = useLocation();
    const resolvedPath = useResolvedPath(path);

    const locationPathname = location.pathname.toLowerCase();
    const toPathname = resolvedPath?.pathname.toLowerCase();

    const isActive =
        locationPathname === toPathname ||
        (locationPathname.startsWith(toPathname) &&
            locationPathname.charAt(toPathname.length) === "/");

    return isActive ? <StyledLink to={to}>{icon}</StyledLink> : null;
};

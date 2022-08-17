import React, { ReactNode } from "react";
import styled from "styled-components";

const colors = {
    red: "--theme-red",
    yellow: "--theme-500",
    green: "--theme-green",
} as const;

export type Color = keyof typeof colors | null;

interface StatusProps {
    color: Color;
}

const Highlight = styled.span``;

const Indicator = styled(Highlight)`
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    background-color: currentColor;
    margin-right: 0.6em;
`;

const UnstyledStatus: React.FC<StatusProps> = ({
    color,
    children,
    ...props
}) => (
    <span {...props}>
        <Indicator />
        {children}
    </span>
);

export const Status = styled(UnstyledStatus)`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${Highlight} {
        ${({ color }) => color && `color: var(${colors[color]});`}
    }
`;

export const msg = (strings: TemplateStringsArray, ...highlights: string[]) => {
    const res: ReactNode[] = [strings[0]];

    highlights.forEach((text, i) => {
        res.push(
            <Highlight key={i}>{text}</Highlight>,
            strings[i + 1].replaceAll(" ", "\u00a0"),
        );
    });

    return res;
};

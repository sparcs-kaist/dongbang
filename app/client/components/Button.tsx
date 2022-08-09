import React from "react";
import styled from "styled-components";

export const Button = styled.button`
    background-color: var(--theme-500);
    height: 50px;
    border-radius: var(--border-radius);
    color: var(--grey-900);
    font-size: 17px;
    font-weight: 400;
    padding: 0 20px;
    width: 100%;
    border: none;
    margin: 0 auto;

    &:not(:disabled):active {
        background-color: var(--theme-500-shadow);
    }

    &:disabled {
        background-color: var(--grey-750);
        color: var(--grey-700);
    }
`;

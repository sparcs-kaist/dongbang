import React from "react";
import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--theme-500);
  height: 48px;
  border-radius: 24px;
  color: var(--grey-900);
  font-size: 17px;
  font-weight: 400;
  padding: 0 20px;
  min-width: 140px;
  border: none;
  margin: 0 auto;

  &:active {
    background-color: var(--theme-500-shadow);
  }

  &:disabled {
    background-color: var(--grey-750);
  }
`;


import React from "react";
import styled from "styled-components";

export const Input = styled.input`
  background-color: var(--grey-800);
  color: var(--grey-100);
  border: none;
  outline: none;
  border-radius: var(--border-radius);
  padding: 0 20px;
  width: 100%;
  height: 40px;
  font-size: 15px;

  &::placeholder {
    color: var(--grey-650);
  }
`;

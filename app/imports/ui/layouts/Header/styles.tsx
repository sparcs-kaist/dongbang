import React from "react";
import styled from "styled-components";

export const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(var(--theme-background_w), 0.8);
  z-index: 50;
`;

export const TopBorder = styled.div`
  height: 5px;
  background-color: var(--theme-400);
`;

export const Content = styled.div`
  height: calc(var(--header-height) - 5px);
  padding: 0 10px 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

import * as React from "react";
import styled from "styled-components";

export const Spacer = styled.div<{
    x?: number,
    y?: number,
}>`
  width: ${props => props.x || 0}px;
  height: ${props => props.y || 0}px;
`;

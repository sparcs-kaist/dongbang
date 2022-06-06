import React from "react";
import styled from "styled-components";


interface CardProps {
    primary?: boolean;
}

export const Card = styled.div<CardProps>`
  --color: ${props => props.primary
          ? "var(--grey-900)"
          : "var(--grey-100)"
  };
  --color-sub: ${props => props.primary
          ? "rgba(var(--grey-900_w), 0.8)"
          : "rgba(var(--grey-100_w), 0.6)"
  };
  --color-location: ${props => props.primary
          ? "var(--color-sub)"
          : "var(--theme-red)"
  };
  --color-button: ${props => props.primary
          ? "var(--grey-900)"
          : "var(--grey-650)"
  };
  color: var(--color);
  background-color: var(--${props => props.primary ? "theme-500" : "grey-780"});
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const CardClickable = styled.div`
  transition: background-color .05s ease;
  cursor: pointer;

  &:active {
    background-color: rgba(var(--grey-000_w), 0.1);
  }
`;

interface CardButtonProps {
    transparent?: boolean;
}

export const CardButton = styled.button<CardButtonProps>`
  cursor: pointer;
  color: var(--color-button);
  font-size: 13px;
  height: 26px;
  padding: 0 20px;
  margin-left: 5px;
  border-radius: 13px;
  border: none;
  background-color: ${props => props.transparent
          ? "transparent"
          : "rgba(var(--grey-900_w), 0.4)"
  };
`;

interface CardTextProps {
    location?: boolean;
}

export const CardText = {
    main: styled.h2`
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    `,
    sub: styled.p<CardTextProps>`
      color: ${props => props.location
              ? "var(--color-location)"
              : "var(--color-sub)"
      };
      font-size: 13px;
      font-weight: 400;
      padding-top: 5px;
    `,
}

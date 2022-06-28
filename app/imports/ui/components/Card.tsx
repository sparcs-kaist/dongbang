import React from "react";
import styled from "styled-components";
import Fade from "/imports/ui/components/animate/Fade";


interface CardProps {
    primary?: boolean;
}

export const Card = styled(Fade)<CardProps>`
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
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: 10px;
`;

export const CardBody = styled(Fade)`
  position: relative;
  padding: var(--card-vertical-padding) var(--card-horizontal-padding);

  &:before {
    content: "";
    height: 1px;
    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    transition: background-color 0.2s ease;
    background-color: transparent;
  }

  &:not(:first-child):before {
    background-color: var(--grey-750);
  }
`

export const CardAction = styled.div<{
    mobile?: boolean;
}>`
  transition: background-color .05s ease;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @media ${({mobile}) => mobile ? "(any-hover: none)" : "all"}{
    &, & > * {
      cursor: pointer;
    }

    &:active {
      background-color: rgba(var(--grey-000_w), 0.1);
    }
  }
`;


export const CardButton = styled.button<{
    transparent?: boolean;
}>`
  z-index: 10;
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


export const CardText = {
    main: styled(Fade)`
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    `,
    sub: styled(Fade)<{
        location?: boolean;
    }>`
      color: ${props => props.location
              ? "var(--color-location)"
              : "var(--color-sub)"
      };
      font-size: 13px;
      font-weight: 400;
      padding-top: 5px;
    `,
}

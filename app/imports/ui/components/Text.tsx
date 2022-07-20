import * as React from "react";
import styled from "styled-components";

import {User} from "../../collections/users";

export const Text = {
    main: styled.h1`
      color: var(--grey-000);
      font-size: 22px;
      font-weight: 600;
      padding-bottom: 5px;
    `,
    sub: styled.p`
      color: var(--grey-650);
      font-size: 13px;
      font-weight: 400;
      padding: 5px 0;
    `,
}

const Username = styled.span`
  margin-left: 0.3em;
  opacity: 0.5;
`;

export const renderProfileText = (member: User) =>
    <>
        <span>{member.name}</span>
        <Username>{member.username}</Username>
    </>

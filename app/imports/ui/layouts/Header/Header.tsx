import React from "react";

import { Logo, MemberIcon, CreateIcon } from "../../../assets";

import { Container, Content, TopBorder } from "./styles";
import { Action, Actions } from "./actions";

export const Header: React.FC = () => (
    <Container>
        <TopBorder />
        <Content>
            <Logo />
            <Actions>
                <Action path="members" to="login" icon={<MemberIcon />} />
                <Action
                    path="sessions"
                    to="sessions/create"
                    icon={<CreateIcon />}
                />
                <Action path="schedules" to="" icon={<CreateIcon />} />
            </Actions>
        </Content>
    </Container>
);

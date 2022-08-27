import React from "react";
import { Card, CardBody } from "../../../components";

export const Layout: React.FC = ({ children }) =>
    children ? (
        <Card
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 10 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        >
            <CardBody>{children}</CardBody>
        </Card>
    ) : null;

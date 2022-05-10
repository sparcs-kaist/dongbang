import dotenv from "dotenv";
import Client from "/imports/lib/sparcsssov2-node";

dotenv.config();

const clientId = process.env.SPARCS_SSO_CLIENT_ID;
const secretKey = process.env.SPARCS_SSO_SECRET_KEY;

if (!(clientId && secretKey)) {
    throw new Error("Enviroment variable not set");
}

export const sparcsSSOClient = new Client(clientId, secretKey);

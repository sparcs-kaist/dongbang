import { config } from "dotenv";
import findConfig from "find-config";

config({ path: findConfig(".env") || undefined });

const { MEMVERS_ROOT, MEMVERS_CREDENTIALS_UN, MEMVERS_CREDENTIALS_PW } =
    process.env;

if (!(MEMVERS_ROOT && MEMVERS_CREDENTIALS_UN && MEMVERS_CREDENTIALS_PW)) {
    throw new Error("Missing env variables");
}

export default {
    MEMVERS_ROOT,
    MEMVERS_CREDENTIALS_UN,
    MEMVERS_CREDENTIALS_PW,
};

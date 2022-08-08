import { Meteor } from "meteor/meteor";
import axios from "axios";

import config from "/server/core/config";
import { asyncToSync } from "/imports/custom/asyncToSync";

interface UserData {
    battlenet_id: string | null;
    behance_url: string | null;
    birth: string | null;
    blog: string | null;
    created_on: string | null;
    dorm: string | null;
    email: string | null;
    ent_year: string | null;
    facebook_id: string | null;
    github_id: string | null;
    home_add: string | null;
    id: string;
    is_designer: 0 | 1;
    is_developer: 0 | 1;
    is_private: 0 | 1;
    is_undergraduate: 0 | 1;
    lab: string | null;
    linkedin_url: string | null;
    name: string;
    org: string | null;
    phone: string | null;
    twitter_id: string | null;
    updated_on: string | null;
    website: string | null;
}

interface NuguAPIData {
    objs: UserData[];
    success: boolean;
}

axios.defaults.withCredentials = true;

class MemversClient {
    private readonly root: string;
    private readonly credentials: { un: string; pw: string };
    private cookie?: string;

    constructor(root: string, un: string, pw: string) {
        this.root = root;
        this.credentials = { un, pw };
    }

    private async refreshSession() {
        const response = await axios.post(
            this.root + "login",
            this.credentials,
        );

        if (!response.data?.success) {
            throw new Meteor.Error("Failed to authenticate in Memvers API");
        }

        this.cookie = response.headers["set-cookie"]?.[0];
    }

    async get(url: string) {
        if (!this.cookie) throw new Error("Not authenticated");
        return await axios.get(this.root + url, {
            headers: { Cookie: this.cookie },
        });
    }

    private async fetchUserData(
        username: string,
        retry: boolean,
    ): Promise<UserData> {
        try {
            const apiData = await this.get("nugu/" + username);
            const userData = apiData.data as NuguAPIData;
            if (!userData?.success) {
                throw new Error("Failed to fetch");
            }
            return userData.objs?.[0];
        } catch (e) {
            if (!retry) {
                throw new Meteor.Error("Failed to fetch data from Memvers API");
            }
            await this.refreshSession();
            return await this.fetchUserData(username, false);
        }
    }

    async getUserDataAsync(username: string) {
        return this.fetchUserData(username, true);
    }
}

export const memversClient = new MemversClient(
    config.MEMVERS_ROOT,
    config.MEMVERS_CREDENTIALS_UN,
    config.MEMVERS_CREDENTIALS_PW,
);

export const getMemberData = asyncToSync(async (username: string) => {
    if (Meteor.isClient) throw new Meteor.Error("Not allowed");
    return await memversClient.getUserDataAsync(username);
});

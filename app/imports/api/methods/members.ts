import { method } from "../../modules/methods";

import { collections } from "../../collections";
import { IsOptional } from "class-validator";


class UpdateStatusInput {
    @IsOptional()
    isActive?: boolean;
    
    @IsOptional()
    statusMsg?: string;
}

export const updateStatus = method("members.updateStatus", {
    input: UpdateStatusInput,
    resolve(input, userId) {
        collections.users.update(userId, {
            $set: { ...input },
        });
        
        if (!input.isActive) {
            collections.users
                .getLink(userId, "session")
                .unset();
        }
    },
});


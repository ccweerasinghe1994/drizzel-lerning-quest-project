import { pgEnum } from "drizzle-orm/pg-core"

export const questStatus = pgEnum("quest_status", ["draft", "active", "completed", "archived"])


export const membershipRole = pgEnum("membership_role", [
    "member",
    "moderator",
]);
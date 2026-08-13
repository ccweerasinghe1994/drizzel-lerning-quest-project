import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, check } from "drizzle-orm/pg-core"

export const questStatus = pgEnum("quest_status", ["draft", "active", "completed", "archived"])


export const membershipRole = pgEnum("membership_role", [
    "member",
    "moderator",
]);

export const users = pgTable(
    "users",
    {
        id: integer("id")
            .primaryKey()
            .generatedAlwaysAsIdentity(),

        email: text("email")
            .notNull()
            .unique(),

        displayName: text("display_name")
            .notNull(),

        xp: integer("xp")
            .notNull()
            .default(0),

        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (t) => [
        check("users_xp_nonnegative", sql`${t.xp} >= 0`),
    ],
);
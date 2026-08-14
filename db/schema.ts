import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, check, index } from "drizzle-orm/pg-core"

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


export const quests = pgTable(
    "quests",
    {
        id: integer("id")
            .primaryKey()
            .generatedAlwaysAsIdentity(),

        ownerId: integer("owner_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        title: text("title")
            .notNull(),

        description: text("description")
            .notNull()
            .default(""),

        status: questStatus("status")
            .notNull()
            .default("draft"),

        difficulty: integer("difficulty")
            .notNull()
            .default(1),

        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),

        updatedAt: timestamp("updated_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (t) => [
        index("quests_owner_id_idx").on(t.ownerId),
        index("quests_status_idx").on(t.status),
        check(
            "quests_difficulty_range",
            sql`${t.difficulty} between 1 and 5`,
        ),
    ],
);
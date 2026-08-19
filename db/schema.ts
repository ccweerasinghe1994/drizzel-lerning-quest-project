import { sql } from "drizzle-orm";

import { check, index, integer, pgEnum, pgTable, primaryKey, text, timestamp, unique } from "drizzle-orm/pg-core";

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

export const tasks = pgTable(
    "tasks",
    {
        id: integer("id")
            .primaryKey()
            .generatedAlwaysAsIdentity(),

        questId: integer("quest_id")
            .notNull()
            .references(() => quests.id, { onDelete: "cascade" }),

        title: text("title")
            .notNull(),

        position: integer("position")
            .notNull(),

        xpReward: integer("xp_reward")
            .notNull()
            .default(10),

        dueAt: timestamp("due_at", { withTimezone: true }),

        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (t) => [
        index("tasks_quest_id_idx").on(t.questId),

        unique("tasks_quest_position_unique")
            .on(t.questId, t.position),

        check(
            "tasks_position_positive",
            sql`${t.position} > 0`,
        ),

        check(
            "tasks_xp_positive",
            sql`${t.xpReward} > 0`,
        ),
    ],
);


export const memberships = pgTable('memberships', {
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    questId: integer('quest_id').notNull().references(() => quests.id, { onDelete: 'cascade' }),
    role: membershipRole("role").notNull().default("member"),
    joinedAt: timestamp('joined_at', { withTimezone: true }).notNull().defaultNow()
}, (t) => [
    primaryKey({ columns: [t.userId, t.questId] }),
    index("memberships_quest_id_idx").on(t.questId)
])

export const taskCompletions = pgTable('task_completions',{
    userId:integer('user_id').notNull().references(()=>users.id,{onDelete:'cascade'}),
    taskId:integer('task_id').notNull().references(()=>tasks.id,{onDelete:'cascade'}),
    xpAwarded: integer('xp_awarded').notNull(),
    completedAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),
},(t)=>[
    primaryKey({columns:[t.userId,t.taskId]}),
    index("task_completions_task_id_idx").on(t.taskId),
    check('task_completions_xp_nonnegative',sql`${t.xpAwarded} >= 0`)
])
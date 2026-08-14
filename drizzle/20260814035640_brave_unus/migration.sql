CREATE TABLE "tasks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tasks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"quest_id" integer NOT NULL,
	"title" text NOT NULL,
	"position" integer NOT NULL,
	"xp_reward" integer DEFAULT 10 NOT NULL,
	"due_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tasks_quest_position_unique" UNIQUE("quest_id","position"),
	CONSTRAINT "tasks_position_positive" CHECK ("position" > 0),
	CONSTRAINT "tasks_xp_positive" CHECK ("xp_reward" > 0)
);
--> statement-breakpoint
CREATE INDEX "tasks_quest_id_idx" ON "tasks" ("quest_id");--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_quest_id_quests_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE CASCADE;
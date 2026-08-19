CREATE TABLE "activity_log" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activity_log_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"quest_id" integer,
	"kind" text NOT NULL,
	"metadata" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quest_tags" (
	"quest_id" integer,
	"tag_id" integer,
	CONSTRAINT "quest_tags_pkey" PRIMARY KEY("quest_id","tag_id")
);
--> statement-breakpoint
CREATE INDEX "activity_log_user_id_idx" ON "activity_log" ("user_id");--> statement-breakpoint
CREATE INDEX "activity_log_quest_id_idx" ON "activity_log" ("quest_id");--> statement-breakpoint
CREATE INDEX "quest_tags_tag_id_idx" ON "quest_tags" ("tag_id");--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_quest_id_quests_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "quest_tags" ADD CONSTRAINT "quest_tags_quest_id_quests_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "quest_tags" ADD CONSTRAINT "quest_tags_tag_id_tags_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE;
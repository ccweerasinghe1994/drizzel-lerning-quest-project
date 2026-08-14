CREATE TABLE "quests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "quests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"owner_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"status" "quest_status" DEFAULT 'draft'::"quest_status" NOT NULL,
	"difficulty" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quests_difficulty_range" CHECK ("difficulty" between 1 and 5)
);
--> statement-breakpoint
CREATE INDEX "quests_owner_id_idx" ON "quests" ("owner_id");--> statement-breakpoint
CREATE INDEX "quests_status_idx" ON "quests" ("status");--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE;